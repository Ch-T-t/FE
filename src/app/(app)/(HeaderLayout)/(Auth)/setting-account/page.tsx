'use client';
import { Flex } from 'antd';
import React from 'react';

export default function SettingAccountPage() {
  const tabList = [
    {
      key: 'INFOR',
      name: 'Thông tin cá nhân',
    },
    {
      key: 'INFOR',
      name: 'Liên kết mạng xã hội',
    },
    {
      key: 'INFOR',
      name: 'Cài đặt tài khoản',
    },
  ];
  return (
    <div className="w-3/5 m-auto ">
      <p className="text-[20px] p-[10px] font-semibold">Thông tin cá nhân</p>
      <Flex className="w-ful text-[14px] font-medium" gap={10}>
        <div className="bg-white p-[10px] rounded-lg cursor-pointer">
          {tabList.map((item, index) => (
            <p className="py-[10px]" key={index}>
              {item.name}
            </p>
          ))}
        </div>
        <div>
          <p>Hồ sơ cá nhân</p>
        </div>
      </Flex>
    </div>
  );
}
