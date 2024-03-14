'use client';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import Services from '@/components/Services';
import Header from '@/components/Header';
import { createContext, useState } from 'react';
import { IProduct } from '@/types/Job';

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
