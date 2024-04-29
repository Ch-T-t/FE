import {
  BellOutlined,
  CloseCircleFilled,
  HomeOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Flex, Space } from 'antd';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import NotificationItem from './common/NotificationItem';

export default function FooterPhone() {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <div className="w-full fixed z-50 hidden max-lg:block bg-white bottom-0 px-[10px] py-[5px]">
      {openNotification && (
        <div
          ref={notificationRef}
          className="overflow-y-auto bg-white rounded-lg"
        >
          <Flex className="px-[10px] pt-[10px] justify-between">
            <b>Thông báo</b>
            <CloseCircleFilled onClick={() => setOpenNotification(false)} />
          </Flex>
          <Flex gap={10} className="p-[10px]">
            <p className="bg-[#ffe9c2] px-[20px] py-[3px] text-[#ffa031] rounded-full text-[14px]">
              Tất cả
            </p>
            <p className="bg-[#ffe9c2] px-[20px] py-[3px] text-[#ffa031] rounded-full text-[14px]">
              Chưa xem
            </p>
          </Flex>
          <Flex
            vertical
            className="border-t border-[#ffa031] max-lg:h-[457px] overflow-y-auto"
          >
            {[...Array(5)].map((_, index) => (
              <NotificationItem key={index} />
            ))}
          </Flex>
        </div>
      )}
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
          {/* <Link className="text-[#9f9f9f]" href={'/'}> */}
          <Flex
            onClick={() => setOpenNotification(!openNotification)}
            vertical
            justify="center"
            align="center"
          >
            <BellOutlined className="text-[24px]" />
            <p className="text-[10px]">Thông báo</p>
          </Flex>
          {/* </Link> */}
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
