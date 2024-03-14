import instanceAxios from '@/api/instanceAxios';
import { Button, Form, Input } from 'antd';
import React from 'react';

export default function RegisterForm() {
  const onFinish = async (e: IUserRegister) => {
    delete instanceAxios.defaults.headers.common.Authorization;
    await instanceAxios
      .post('api/token/', e)
      .then((res) => {
        // dispatch(login(res.data.data.user));
        // setCookie('access', res.data.data.access);
        // setCookie('refresh', res.data.data.refresh);
        // route.push('/admin');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item<IUserRegister>
          name={'username'}
          rules={[{ required: true }]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item<IUserRegister>
          name={'email'}
          rules={[
            { required: true, message: 'Email không được để trống!' },
            { type: 'email', message: 'Email chưa đúng định dạng!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item<IUserRegister>
          name={'password'}
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="******" />
        </Form.Item>
        <Form.Item<IUserRegister>
          name={'rePassword'}
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="******" />
        </Form.Item>

        <p className="py-[10px] text-blue-700 text-[12px]">Quên mật khẩu</p>
        <Form.Item>
          <Button
            className={'w-full !bg-[#ffb057] !text-white'}
            //   style={{ backgroundColor: '#ffb057' }}
            htmlType="submit"
          >
            ĐĂNG KÍ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
