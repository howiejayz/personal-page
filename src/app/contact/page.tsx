'use client';

import { ContactForm } from '@/components/contact';

export default function Contact() {
  return (
    <>
      <h2 className="text-2xl mb-8 font-bold xl:flex-1">
        Got something to say or just want to share a funny cat meme? Drop me a
        message!
      </h2>
      <div className="divider divider-horizontal" />
      <div className="w-full h-full xl:flex-1">
        <ContactForm />
      </div>
    </>
  );
}
