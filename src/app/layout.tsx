import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { getServerSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import ProviderWrapper from './ProviderWrapper';

const inter = Inter({ subsets: ['latin'] });
// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: 'SimpRaidenEi',
  description: 'Generated SimpRaidenEi',
  icons: {
    icon: 'https://i.pinimg.com/200x150/03/fe/31/03fe31dfb42991dae86f9a326b6eaaec.jpg',
    // shortcut: '/shortcut-icon.png',
    // apple: '/apple-icon.png',
    // other: {
    //   rel: 'apple-touch-icon-precomposed',
    //   url: '/apple-touch-icon-precomposed.png',
    // },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className={inter.className}>
      <body>
        <ProviderWrapper session={session}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                components: {
                  // Switch: {
                  //   colorPrimary: '#5d5386',
                  // },
                  Input: {
                    paddingBlock: 10,
                  },
                },
                token: {
                  colorPrimary: '#5d5386',
                },
              }}
            >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </ProviderWrapper>
      </body>
    </html>
  );
}
