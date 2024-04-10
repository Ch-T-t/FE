'use client';
import instanceAxios from '@/api/instanceAxios';
import Services from '@/components/Services';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import { store } from '../store';
import { useAuth } from '@clerk/nextjs';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  moment.locale('vi');
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const fechAuthSocial = async () => {
      console.log('adssadasasddas:', await getToken());
      // if (status === 'authenticated') {
      //   await instanceAxios
      //     .post(`/api/token/google-oauth/`, {
      //       access_token: session.user.accessToken,
      //     })
      //     .then((res) => console.log(res))
      //     .catch((err) => {});
      //   console.log(session);
      // }
      // if (status === 'loading') {
      //   console.log('loaddddddddddddddddd');
      // }
      // if (status === 'unauthenticated') {
      //   console.log('That baiiiiiiiiiiiiiiiiiiiiiiiiiiii');
      // }
    };

    fechAuthSocial();
  }, [getToken]);

  return (
    <ConfigProvider
      theme={{
        components: {
          // Switch: {
          //   colorPrimary: '#5d5386',
          // },
          Input: {
            paddingBlock: 10,
          },
          Pagination: {
            itemActiveBg: '#f26622',
            // colorLinkActive: '#ffffff',
            // colorBgTextHover: '#ffffff',
          },
        },
        token: {
          colorPrimary: '#5d5386',
          // colorBgTextActive: '#ffffff',
        },
      }}
    >
      {/* <SessionProvider session={session || un}> */}
      <Provider store={store}>
        <SWRConfig
          value={{
            // refreshInterval: 3000,
            //   fetcher: (resource, init) =>
            //     fetch(resource, init).then((res) => res.json()),
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            revalidateOnMount: false,
          }}
        >
          <Services>{children}</Services>
        </SWRConfig>
      </Provider>
      {/* </SessionProvider> */}
    </ConfigProvider>
  );
}
