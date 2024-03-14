'use client';
import { SessionProvider } from 'next-auth/react';
// Types
import type { Session } from 'next-auth';

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const ProviderWrapper = ({ children, session }: Props) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default ProviderWrapper;
