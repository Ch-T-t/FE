import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/app/hooks';
import { login } from '@/app/reducers/userReducer';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Services({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [loadingPage, setLoadingPage] = useState(true);
  const cookie = getCookie('access');
  useEffect(() => {
    const fetchUserInfomation = async () => {
      await instanceAxios
        .get('api/user-information/')
        .then((res) => {
          dispatch(login(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (cookie) fetchUserInfomation();
    setLoadingPage(false);
  }, [dispatch, route, cookie]);

  return !loadingPage && children;
}
