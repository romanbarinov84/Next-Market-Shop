import {betterAuth} from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { Resend } from "resend";
import VerifyEmail from "../app/(auth)/(reg)/_components/VerifyEmail";
import { phoneNumber } from "better-auth/plugins";

const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
const db = client.db("Delivery-Shop");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
       database: mongodbAdapter(db),
         emailAndPassword: { 
    enabled: true, 
    requireEmailVerification: true, 
  },
  emailVerification: {
    sendVerificationEmail: async ( { user, url}) => {
      void resend.emails.send({
        from: 'Galya Baluvanna <onboarding@resend.dev>',
    to: user.email,
    subject: 'Подтвердите ваш email',
    react: VerifyEmail({ username:user.name,verifyUrl:url}),//компонент тела письма
      });
    },
    expiresIn: 86400,
    autoSignInAfterVerification: false,
  },
   plugins: [ 
        phoneNumber({  
            sendOTP:async ({ phoneNumber, code }) => { 
                try {
                  
                } catch (error) {
                  
                }
            } 
        }) 
    ] ,
  user:{additionalFields:{
     phoneNumber: { type: "string", input: true, required: true },
      surname: { type: "string", input: true, required: true },
      birthdayDate: { type: "date", input: true, required: true,  },
      region: { type: "string", input: true, required: true },
      location: { type: "string", input: true, required: true },
      gender: { type: "string", input: true, required: true },
      card: { type: "string", input: true, required: false },
      hasCard: { type: "boolean", input: true, required: false },
  }}
})