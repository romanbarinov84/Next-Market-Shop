import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Button,
    Hr,
    Tailwind,
} from '@react-email/components';

interface VerifyEmailProps {
    username: string;
    verifyUrl: string;
}

const VerifyEmail = (props: VerifyEmailProps) => {
    const { username, verifyUrl } = props;
    return (
        <Html lang="uk" dir="ltr">
            <Tailwind>
                <Head />
                <Body className="bg-gray-100 font-sans py-4 px-2">
                    <Container className="bg-white rounded-md p-6 max-w-145 mx-auto">
                        <Section>
                            <Text className="text-xl font-bold text-gray-900 mb-4 mt-0">
                                Підтвердіть Ваш email
                            </Text>

                            <Text className="text-base text-gray-700 mb-4 mt-0 leading-5">
                                Дякуємо, {username}, за реєстрацію! Щоб
                                завершити процес та активувати Ваш акаунт, будь
                                ласка, підтвердіть Ваш email, натиснувши кнопку
                                нижче.
                            </Text>

                            <Section className="text-center mb-6">
                                <Button
                                    href={verifyUrl}
                                    className="bg-[#70C05B] hover: text-white px-6 py-2 rounded text-base font-medium no-underline"
                                >
                                    Підтвердити Email
                                </Button>
                            </Section>

                            <Text className="text-sm text-gray-600 mb-4 mt-0 leading-5">
                                Якщо кнопка не працює, скопіюйте та вставте це
                                посилання в адресний рядок браузера:
                                <br />
                                <span className="break-all">{verifyUrl}</span>
                            </Text>

                            <Text className="text-sm text-gray-600 mb-6 mt-0 leading-5">
                                Посилання для підтвердження буде активне
                                протягом 24 годин. Якщо Ви не реєстрували
                                акаунт, просто проігноруйте цей лист.
                            </Text>

                            <Hr className="border-gray-200 my-4" />

                            <Text className="text-xs text-gray-500 m-0 leading-4">
                                З повагою,
                                <br />
                                Команда &quot;Галя Балуванна&quot;
                            </Text>
                        </Section>

                        <Section className="mt-6 pt-4 border-t border-gray-200">
                            <Text className="text-xs text-gray-400 m-0 text-center leading-4">
                                Галя Балуванна
                                <br />
                                Київ
                                <br />
                                ІПН 0291234567890
                            </Text>

                            <Text className="text-xs text-gray-400 m-0 text-center mt-2 leading-4">
                                © {new Date().getFullYear()} Галя Балуванна. Всі
                                права захищені.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default VerifyEmail;
