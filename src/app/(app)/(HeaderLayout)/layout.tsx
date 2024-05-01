'use client';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import Services from '@/components/Services';
import Header from '@/components/Header';
import { createContext, useEffect, useState } from 'react';
import { IProduct } from '@/types/Job';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { useAppDispatch } from '@/app/hooks';
import instanceAxios from '@/api/instanceAxios';
import { login } from '@/app/reducers/userReducer';
import { setCookie } from 'cookies-next';
import Footer from '@/components/Footer';
import FooterPhone from '@/components/FooterPhone';

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { signIn } = useSignIn();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fechAuthSocial = async () => {
      const token = await getToken();
      if (token) {
        await instanceAxios
          .post(`/api/token/google-oauth/`, {
            access_token: token,
          })
          .then((res) => {
            console.log(res);
            dispatch(login(res.data.user));
            setCookie('access', res.data.access);
            setCookie('refresh', res.data.refresh);
          })
          .catch((err) => {
            console.log('assassdsdas', getToken());
          });
      }
    };

    fechAuthSocial();
  }, [dispatch, getToken]);
  return (
    <div className="overflow-hidden w-full h-full">
      <Header />
      <div className="max-lg:mt-[88px]">{children}</div>
      <Footer />
      <FooterPhone />
    </div>
  );
}
