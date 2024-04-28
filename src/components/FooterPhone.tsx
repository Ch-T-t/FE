import {
  BellOutlined,
  HomeOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Flex, Space } from 'antd';
import Link from 'next/link';
import React from 'react';

export default function FooterPhone() {
  return (
    <div className="w-full hidden max-lg:block bg-white  bottom-0 px-[10px] py-[5px]">
      <Flex justify="space-between" className="w-full relative">
        <Flex className="w-[40%]" justify="space-around">
          <Link className="text-[#9f9f9f]" href={'/'}>
            <Flex vertical justify="center" align="center">
              <HomeOutlined className="text-[24px]" />
              <p className="text-[10px]">Trang chủ</p>
            </Flex>
          </Link>
          <Link className="text-[#9f9f9f]" href={'/post-manager'}>
            <Flex vertical justify="center" align="center">
              <ProfileOutlined className="text-[24px]" />
              <p className="text-[10px]">Quản lí tin</p>
            </Flex>
          </Link>
        </Flex>
        <Link className="text-[#9f9f9f]" href={'/create-post'}>
          <Flex
            vertical
            justify="center"
            align="center"
            className="absolute text-black top-1/2 left-1/2 p-[12px] border-8 rounded-full border-white -translate-x-1/2 -translate-y-1/2 bg-[#ffba00]"
          >
            <HomeOutlined className="text-[24px]" />
            <p className="text-[10px]">Đăng tin</p>
          </Flex>
        </Link>
        <Flex className="w-[40%]" justify="space-around">
          <Link className="text-[#9f9f9f]" href={'/'}>
            <Flex vertical justify="center" align="center">
              <BellOutlined className="text-[24px]" />
              <p className="text-[10px]">Thông báo</p>
            </Flex>
          </Link>
          <Link className="text-[#9f9f9f]" href={'/profile'}>
            <Flex vertical justify="center" align="center">
              <UserOutlined className="text-[24px]" />
              <p className="text-[10px]">Tài khoản</p>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </div>
  );
}
