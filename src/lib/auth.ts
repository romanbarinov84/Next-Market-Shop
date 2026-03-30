import {betterAuth} from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { phoneNumber } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
const db = client.db("Delivery-Shop");

export const auth = betterAuth({
       database: mongodbAdapter(db),
         emailAndPassword: { 
    enabled: true, 
    requireEmailVerification: true, 
  },
  emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
    expiresIn: 86400,
    autoSignInAfterVerification: false,
  },
  
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