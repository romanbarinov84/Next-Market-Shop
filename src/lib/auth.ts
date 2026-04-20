import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';
import { admin, phoneNumber } from 'better-auth/plugins';
import PasswordResetEmail from '../app/(auth)/(updatePass)/_components/PasswordResetEmail';
import { CONFIG } from '@/config/config';
import EmailChangeVerification from '../app/(user-profile)/_components/EmailChangeVerification';
import DeleteVerify from '../app/(user-profile)/_components/DeleteVerify';
import { deleteUserAvatarFromGridFS } from '@/UTILS/deleteUserAvatar';

const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
const db = client.db('Delivery-Shop');
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: mongodbAdapter(db),
    session: {
        expiresIn: 60 * 60 * 24 * 30,
        updateAge: 60 * 60 * 24,
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        resetPasswordTokenExpiresIn: 86400,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Delivery Shop <onboarding@delivery-shop.ua>',
                to: user.email,
                subject: 'Подтвердите email',
                react: PasswordResetEmail({
                    username: user.name,
                    resetUrl: url,
                }),
                html: `<h1>Привет, ${user.name}</h1>
           <p>Сброс пароля Галя Балуваеа</p>
           <a href="${url}">${url}</a>`,
            });
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Галя Балувана <onboarding@resend.dev>',
                to: user.email,
                subject: 'Подтвердите email',
                html: `<h1>Привет, ${user.name}</h1>
           <p>Подтвердите свой email, перейдя по ссылке:</p>
           <a href="${url}">${url}</a>`,
            });
        },
        expiresIn: 86400,
        autoSignInAfterVerification: false,
    },
    plugins: [
        phoneNumber({
            sendOTP: async ({ phoneNumber, code }) => {
                console.log(`[DEBUG] Отправка OTP: ${code} for ${phoneNumber}`);
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
                    return `${phoneNumber}${CONFIG.TEMPORARY_EMAIL_DOMAIN}`;
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
        admin(),
    ],
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async ({
                user,
                url,
            }: {
                user: { email: string; name: string };
                newEmail: string;
                url: string;
            }) => {
                await resend.emails.send({
                    from: 'Galya Baluvana Shop <onboarding@resend.dev>',
                    to: user.email,
                    subject: 'Подтверждение смены email в Galya Baluvana',
                    react: DeleteVerify({
                        username: user.name,
                        verifyUrl: url,
                    }),
                });
            },
        },
        afterDelete:async (user: { id: string })=>{
            await deleteUserAvatarFromGridFS(user.id)
        }
    },
    additionalFields: {
        phoneNumber: { type: 'string', input: true, required: true },
        surname: { type: 'string', input: true, required: true },
        birthdayDate: { type: 'date', input: true, required: true },
        region: { type: 'string', input: true, required: true },
        location: { type: 'string', input: true, required: true },
        gender: { type: 'string', input: true, required: true },
        card: { type: 'string', input: true, required: false },
        hasCard: { type: 'boolean', input: true, required: false },
        role:{
            type:"string",
            input:false,
            required:false,
            default:"user",
        }
    },
});

// import { CONFIG } from "../../config/config";
// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { phoneNumber } from "better-auth/plugins";
// import { MongoClient } from "mongodb";
// import nodemailer from "nodemailer"

// const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
// const db = client.db("delivery-shop");

// // Локальный SMTP транспорт для разработки
// const localTransporter = nodemailer.createTransport({
//   host: "localhost",
//   port: 1025,
//   secure: false,
//   ignoreTLS: true,
// });

// // Функции для отправки email через nodemailer
// async function sendVerificationEmail({ user, url }: { user: { email: string; name: string }; url: string }) {
//   await localTransporter.sendMail({
//     from: "Galya Baluvana <dev@localhost.com>",
//     to: user.email,
//     subject: "Подтвердите email",
//     html: `
//       <!DOCTYPE html>
//       <html lang="ru">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Подтвердите email</title>
//       </head>
//       <body>
//         <h1>Подтвердите Ваш email</h1>
//         <p>Спасибо, ${user.name}, за регистрацию!</p>
//         <p>Для подтверждения email перейдите по ссылке: <a href="${url}">${url}</a></p>
//       </body>
//       </html>
//     `,
//     text: `Подтвердите Ваш email\n\nСпасибо, ${user.name}, за регистрацию!\n\nДля подтверждения перейдите по ссылке: ${url}`,
//   });

//   console.log("Email отправлен через MailDev. Preview: http://localhost:1080");
// }

// async function sendResetPasswordEmail({ user, url }: { user: { email: string; name: string }; url: string }) {
//   await localTransporter.sendMail({
//     from: "Galya Baluvana <dev@localhost.com>",
//     to: user.email,
//     subject: "Сброс пароля ",
//     html: `
//       <!DOCTYPE html>
//       <html lang="ru">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Сброс пароля</title>
//       </head>
//       <body>
//         <h1>Сброс пароля</h1>
//         <p>Здравствуйте, ${user.name}!</p>
//         <p>Для сброса пароля перейдите по ссылке: <a href="${url}">${url}</a></p>
//       </body>
//       </html>
//     `,
//     text: `Сброс пароля\n\nЗдравствуйте, ${user.name}!\n\nДля сброса пароля перейдите по ссылке: ${url}`,
//   });

//   console.log("Email сброса пароля отправлен через MailDev. Preview: http://localhost:1080");
// }

// async function sendChangeEmailVerification({ user, newEmail, url }: { user: { email: string; name: string }; newEmail: string; url: string }) {
//   await localTransporter.sendMail({
//     from: " <dev@localhost.com>",
//     to: user.email,
//     subject: "Подтверждение смены email ",
//     html: `
//       <!DOCTYPE html>
//       <html lang="ru">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Подтверждение смены email</title>
//       </head>
//       <body>
//         <h1>Подтверждение смены email</h1>
//         <p>Здравствуйте, ${user.name}!</p>
//         <p>Вы запросили смену email с ${user.email} на ${newEmail}.</p>
//         <p>Для подтверждения перейдите по ссылке: <a href="${url}">${url}</a></p>
//       </body>
//       </html>
//     `,
//     text: `Подтверждение смены email\n\nЗдравствуйте, ${user.name}!\n\nВы запросили смену email с ${user.email} на ${newEmail}.\n\nДля подтверждения перейдите по ссылке: ${url}`,
//   });

//   console.log("Email смены email отправлен через MailDev. Preview: http://localhost:1080");
// }

// export const auth = betterAuth({
//   database: mongodbAdapter(db),
//   session: {
//     expiresIn: 60 * 60 * 24 * 30,
//     updateAge: 60 * 60 * 24,
//   },
//   emailAndPassword: {
//     enabled: true,
//     requireEmailVerification: true,
//     resetPasswordTokenExpiresIn: 86400,
//     sendResetPassword: sendResetPasswordEmail,
//   },
//   emailVerification: {
//     sendVerificationEmail: sendVerificationEmail,
//     expiresIn: 86400,
//     autoSignInAfterVerification: false,
//   },
//   plugins: [
//     phoneNumber({
//       sendOTP: async ({ phoneNumber, code }) => {
//         console.log(`[DEBUG] Отправка OTP: ${code} для ${phoneNumber}`);
//       },
//       signUpOnVerification: {
//         getTempEmail: (phoneNumber) => {
//           return `${phoneNumber}${CONFIG.TEMPORARY_EMAIL_DOMAIN}`;
//         },
//         getTempName: (phoneNumber) => {
//           return phoneNumber;
//         },
//       },
//       allowedAttempts: 3,
//       otpLength: 4,
//       expiresIn: 300,
//       requireVerification: true,
//     }),
//   ],
//   user: {
//     changeEmail: {
//       enabled: true,
//       requireEmailVerification: false,
//       sendChangeEmailVerification: sendChangeEmailVerification,
//     },
//     additionalFields: {
//       phoneNumber: { type: "string", input: true, required: true },
//       surname: { type: "string", input: true, required: true },
//       birthdayDate: { type: "date", input: true, required: true },
//       region: { type: "string", input: true, required: true },
//       location: { type: "string", input: true, required: true },
//       gender: { type: "string", input: true, required: true },
//       card: { type: "string", input: true, required: false },
//       hasCard: { type: "boolean", input: true, required: false },
//     },
//   },
// });
