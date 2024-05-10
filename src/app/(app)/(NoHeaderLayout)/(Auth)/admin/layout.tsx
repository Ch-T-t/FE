'use client';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button, Result } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect, useLayoutEffect, useState } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingPage, setLoadingPage] = useState(true);
  const user = useAppSelector((state) => state.user);
  const token = getCookie('access');
  useEffect(() => {
    setLoadingPage(false);
  }, []);
  return (
    !loadingPage && (
      <>
        {user.logged ? (
          children
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
          />
        )}
      </>
    )
  );
}
