import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';
import VerifyEmail from '../app/(auth)/(reg)/_components/VerifyEmail';
import { phoneNumber } from 'better-auth/plugins';

const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
const db = client.db('Delivery-Shop');
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Галя Балувана <onboarding@resend.dev>',
                to: user.email,
                subject: 'Подтвердите email',
                react: VerifyEmail({ username: user.name, verifyUrl: url }),
            });
        },
        expiresIn: 86400,
        autoSignInAfterVerification: false,
    },
    plugins: [
        phoneNumber({
            sendOTP: async ({ phoneNumber, code }) => {
                console.log(`[DEBUG] Отправка OTP: ${code} for ${phoneNumber}`)
            },
            // sendOTP: async ({ phoneNumber, code }) => {
            //     try {
            //         const response = await fetch(
            //             'https://im.smsclub.mobi/sms/send',
            //             {
            //                 method: 'POST',
            //                 headers: {
            //                     Authorization: `Bearer ${process.env.SMS_API_ID}`,
            //                     'Content-Type': 'application/json',
            //                 },
            //                 body: JSON.stringify({
            //                     phone: [phoneNumber], // массив номеров
            //                     message: `Ваш код подтверждения: ${code}`,
            //                     src_addr: 'TAXI', // альфа-имя
            //                 }),
            //             },
            //         );

            //         const result = await response.json();
            //         console.log( "THIS IS THAT IS " , result);
                    

            //         // Проверяем, что хотя бы один SMS был отправлен
            //         if (
            //             !result.success_request ||
            //             Object.keys(result.success_request.info || {})
            //                 .length === 0
            //         ) {
            //             throw new Error(
            //                 'Ошибка отправки смс: пустой ответ сервиса',
            //             );
            //         }

            //         console.log(
            //             'SMS успешно отправлено:',
            //             result.success_request.info,
            //         );

            //         // Можно дополнительно логировать неуспешные отправки
            //         if (result.success_request.add_info) {
            //             console.warn(
            //                 'Не все SMS отправлены:',
            //                 result.success_request.add_info,
            //             );
            //         }
            //     } catch (error) {
            //         console.error('Ошибка отправки смс:', error);
            //         throw error; // важно кидать ошибку, чтобы better-auth понял, что OTP не отправился
            //     }
            // },
            signUpOnVerification: {
                getTempEmail: (phoneNumber) => {
                    return `${phoneNumber}@delivery-shop.ua`;
                },

                getTempName: (phoneNumber) => {
                    return phoneNumber;
                },
            },
            allowedAttempts: 3,
            otpLength: 4,
            expiresIn: 300,
            requireVerification: true,
        }),
    ],
    user: {
        additionalFields: {
            phoneNumber: { type: 'string', input: true, required: true },
            surname: { type: 'string', input: true, required: true },
            birthdayDate: { type: 'date', input: true, required: true },
            region: { type: 'string', input: true, required: true },
            location: { type: 'string', input: true, required: true },
            gender: { type: 'string', input: true, required: true },
            card: { type: 'string', input: true, required: false },
            hasCard: { type: 'boolean', input: true, required: false },
        },
    },
});
