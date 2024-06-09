import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/app/hooks';
import { login, logout } from '@/app/reducers/userReducer';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Services({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [loadingPage, setLoadingPage] = useState(true);
  const access = getCookie('access');
  const refresh = getCookie('refresh');
  useEffect(() => {
    const fetchUserInfomation = async () => {
      await instanceAxios
        .get('/api/user/get_me')
        .then((res) => {
          dispatch(login(res.data));
        })
        .catch((err) => {
          dispatch(logout());
          deleteCookie('access');
          console.log(err);
        });
    };
    const fetchRefresToken = async () => {
      setInterval(() => {
        instanceAxios
          .post('/api/auth/refresh/', {
            refresh: refresh,
          })
          .then((res) => {
            setCookie('access', res.data.access);
          })
          .catch((err) => {
            dispatch(logout());
            deleteCookie('access');
            console.log(err);
          });
      }, 5000);
    };

    if (access) fetchUserInfomation();
    if (refresh) fetchRefresToken();
    setLoadingPage(false);
  }, [route]);

  return !loadingPage && children;
}
