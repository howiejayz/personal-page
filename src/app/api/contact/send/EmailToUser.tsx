import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export default function EmailToUser({
  userName,
  userMessage,
}: {
  userName?: string;
  userMessage: string;
}) {
  const paragraphs = userMessage.split(/\r?\n|\r|\n/g);
  return (
    <Html>
      <Head />
      <Preview>Your message is safely received.</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-4 mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src="https://www.howiejayz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdio-avatar.03f2091c.png&w=128&q=75"
                width="60"
                height="60"
                alt="dio"
                className="my-0 mx-auto rounded-full"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>Howie Jayz</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {userName || 'there'},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You have just sent me a message on my website. Here is what you
              wrote:
            </Text>
            <Container className="border border-solid border-[#eaeaea] rounded my-2 mx-auto px-[20px] max-w-[465px]">
              {paragraphs.map((paragraph) => (
                <Text
                  key={paragraph}
                  className="text-[#666666] text-[12px] leading-[24px]"
                >
                  {paragraph}
                </Text>
              ))}
            </Container>
            <Text className="text-black text-[14px] leading-[24px]">
              I will get back to you as soon as possible. Meanwhile, feel free
              to send me another email by directly replying to this one or using
              the button below.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href="mailto:howiejayzh@gmail.com"
              >
                Send me an email
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was auto-generated by Howie Jayz&apos;s&nbsp;
              <Link href="howiejayz.com" className="text-blue-600 no-underline">
                personal website
              </Link>
              . If you did not send this message, please ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
