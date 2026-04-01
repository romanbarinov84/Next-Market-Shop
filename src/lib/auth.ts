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
            void resend.emails.send({
                from: 'Galya Baluvanna <onboarding@resend.dev>',
                to: user.email,
                subject: 'Подтвердите ваш email',
                react: VerifyEmail({ username: user.name, verifyUrl: url }),
            });
        },
        expiresIn: 86400,
        autoSignInAfterVerification: false,
    },
    plugins: [
        phoneNumber({
            sendOTP: async ({ phoneNumber, code }) => {
                console.log(`[DEBUG] OTP для ${phoneNumber}: ${code}`);
            },
            // sendOTP: async ({ phoneNumber, code }) => {
            //   try {
            //     const res = await fetch('https://im.smsclub.mobi/sms/send', {
            //       method: 'POST',
            //       headers: {
            //         'Authorization': `Bearer ${process.env.SMS_API_ID}`,
            //         'Content-Type': 'application/json',
            //       },
            //       body: JSON.stringify({
            //         phone: [phoneNumber],
            //         message: `Ваш код подтверждения в Галя Балуванна: ${code}`,
            //         src_addr: 'Zamovlennia' // убедись, что альфа-имя корректное и есть в списке доступных
            //       }),
            //     });

            //     const data = await res.json();

            //     // Проверяем, что SMS реально отправлено хотя бы на один номер
            //     if (!data.success_request || Object.keys(data.success_request.info || {}).length === 0) {
            //       throw new Error("Ошибка отправки смс: пустой ответ сервиса");
            //     }

            //     console.log('SMS sent successfully to', phoneNumber, data.success_request.info);
            //   } catch (error) {
            //     console.error('Failed to send SMS:', error);
            //     throw error; // обязательно кидаем ошибку, чтобы better-auth понял что отправка не удалась
            //   }
            // },
            signUpOnVerification: {
                getTempEmail: (phoneNumber) =>
                    `${phoneNumber}@delivery-shop.ua`,
                getTempName: (phoneNumber) => phoneNumber,
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
