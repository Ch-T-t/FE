'use client';
import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/app/hooks';
import { login } from '@/app/reducers/userReducer';
import LoginForm from '@/components/common/LoginForm';
import RegisterForm from '@/components/common/RegisterForm';
import { FacebookFilled, GoogleSquareFilled } from '@ant-design/icons';
import { Button, Form, Image, Input, message, notification } from 'antd';
import { setCookie } from 'cookies-next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AuthPage() {
  const [currentForm, setCurrentForm] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const socialNetWorkLis = [
    {
      label: 'Facebook',
      icon: <FacebookFilled className="text-[20px]" />,
    },
    {
      label: 'Google',
      icon: <GoogleSquareFilled className="text-[20px]" />,
    },
  ];
  const onFinish = async (e: IUserLogin) => {
    delete instanceAxios.defaults.headers.common.Authorization;
    await instanceAxios
      .post('/api/token/', e)
      .then((res) => {
        dispatch(login(res.data.data.user));
        setCookie('access', res.data.data.access);
        setCookie('refresh', res.data.data.refresh);
        notification.success({
          message: 'Xin chào!!!',
          description: 'Cảm ơn bạn đã quan tâm đến chúng tôi.',
        });
        route.push('/');
      })
      .catch((err) => {
        notification.error({
          message: 'Không thể đăng nhập!!!',
          description: 'Vui lòng xem lại thông tin của bạn.',
        });
        console.log(err);
      });
  };

  return (
    <div className="w-full h-[900px] bg-cover bg-no-repeat bg-[url('https://static.chotot.com/storage/marketplace/login-background.webp')]">
      <div className="w-1/3 m-auto p-[50px] rounded-lg shadow-xl mt-[100px] ">
        <div className="flex items-center justify-center">
          <Image
            className="m-auto"
            preview={false}
            src="https://static.chotot.com/storage/marketplace/logo.png"
            alt="Chotot Logo"
          />
        </div>
        <p className="py-[20px] text-center text-[30px] font-semibold">
          {currentForm === 'LOGIN' ? 'Đăng nhập' : 'Đăng kí'}
        </p>
        {currentForm === 'LOGIN' ? (
          <Form onFinish={onFinish}>
            <Form.Item<IUserLogin>
              name={'username'}
              rules={[{ required: true }]}
            >
              <Input aria-label="adsas" placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item<IUserLogin>
              name={'password'}
              rules={[{ required: true }]}
            >
              <Input.Password aria-label="adsas" placeholder="******" />
            </Form.Item>
            <p className="py-[10px] text-blue-700 text-[12px]">Quên mật khẩu</p>
            <Form.Item>
              <Button
                className={'w-full !bg-[#ffb057] !text-white'}
                //   style={{ backgroundColor: '#ffb057' }}
                htmlType="submit"
              >
                ĐĂNG NHẬP
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <RegisterForm />
        )}
        <p className="w-full  relative text-center font-light before:w-1/4 before:h-[1px] before:bg-[#8c8c8c] before:absolute before:right-0 before:top-1/2 after:w-1/4 after:h-[1px] after:bg-[#8c8c8c] after:absolute after:left-0 after:top-1/2">
          Hoặc đăng nhập bằng
        </p>
        <div className="flex gap-x-3 py-[20px]">
          {socialNetWorkLis.map((item, index) => (
            <div
              onClick={() => signIn('google')}
              key={index}
              className="flex px-[15px] py-[10px] items-center gap-x-3 border rounded"
            >
              {item.icon}
              <p className="text-[14px] font-semibold">{item.label}</p>
            </div>
          ))}
          <p onClick={() => signOut()}>Out</p>
        </div>
        <p className="text-[14px] text-center cursor-pointer">
          {`${
            currentForm === 'LOGIN' ? 'Chưa có tài khoản' : 'Đã có tài khoản'
          }? `}
          <b
            onClick={() =>
              setCurrentForm(currentForm === 'LOGIN' ? 'REGISTER' : 'LOGIN')
            }
            className="text-[#306bd9]"
          >{`${
            currentForm === 'LOGIN' ? 'Đăng kí tài khoản mới' : 'Đăng nhập'
          }`}</b>
        </p>
      </div>
    </div>
  );
}
