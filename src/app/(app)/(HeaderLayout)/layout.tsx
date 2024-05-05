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
import { getCookie, setCookie } from 'cookies-next';
import Footer from '@/components/common/Footer';
import FooterPhone from '@/components/FooterPhone';

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signIn } = useSignIn();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const fechAuthSocial = async () => {
  //     const token = getCookie('access');
  //     if (token) {
  //       await instanceAxios
  //         .get(`/api/user/get_me`)
  //         .then((res) => {
  //           console.log(res);
  //           dispatch(login(res.data));
  //           setCookie('access', res.data.access);
  //           setCookie('refresh', res.data.refresh);
  //         })
  //         .catch((err) => {
  //           console.log('assassdsdas', token);
  //         });
  //     }
  //   };

  //   fechAuthSocial();
  // }, [dispatch]);
  return (
    <div className="overflow-hidden w-full h-full">
      <Header />
      <div className="max-lg:mt-[88px] max-lg:mb-[45px]">{children}</div>
      <Footer />
      <FooterPhone />
    </div>
  );
}
