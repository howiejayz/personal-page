export default function EmailToMe({
  userEmail,
  userMessage,
}: {
  userEmail: string;
  userMessage: string;
}) {
  const paragraphs = userMessage.split(/\r?\n|\r|\n/g);
  return (
    <div>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>From {userEmail}</p>
    </div>
  );
}
