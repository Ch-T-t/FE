'use client';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { IJobPostCreate } from '@/types/Job';
import { Button, Result } from 'antd';
import { getCookie } from 'cookies-next';
import React, { createContext, useEffect, useState } from 'react';
import { CurrentFormContext } from '../../CurentFormContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentForm, setCurrentForm] = useState('');
  const [currentLabel, setCurrentLabel] = useState('');
  const [currentCategoryId, setCurrentCategoryId] = useState<string | number>(
    ''
  );
  const [currentLabelAdress, setCurrentLabelAdress] = useState('');

  // const logged = useAppSelector((state) => state.user.logged);
  const token = getCookie('access');
  useEffect(() => {
    setLoadingPage(false);
  }, []);
  return (
    !loadingPage && (
      <>
        {token ? (
          <CurrentFormContext.Provider
            value={{
              currentForm,
              setCurrentForm,
              currentLabel,
              setCurrentLabel,
              currentCategoryId,
              setCurrentCategoryId,
              currentLabelAdress,
              setCurrentLabelAdress,
            }}
          >
            {children}
          </CurrentFormContext.Provider>
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
