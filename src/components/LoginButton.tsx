import Image from 'next/image';

import { authCached, signIn, signOut } from '@/auth';

import { CommandLineIcon } from './ui/Icons';

export async function LoginButton() {
  const session = await authCached();
  const loggedIn = session?.user !== undefined;

  return (
    <form
      action={async () => {
        'use server';
        if (loggedIn) await signOut();

        await signIn();
      }}
      className="flex"
    >
      <button type="submit">
        {loggedIn ? (
          <Image
            src={session.user?.image!}
            width={50}
            height={50}
            alt="avatar"
            className="rounded-full"
          />
        ) : (
          <CommandLineIcon />
        )}
      </button>
    </form>
  );
}
