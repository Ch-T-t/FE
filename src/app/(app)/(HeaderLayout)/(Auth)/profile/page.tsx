'use client';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout } from '@/app/reducers/userReducer';
import {
  BellFilled,
  HeartFilled,
  LogoutOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { SignOutButton, useAuth } from '@clerk/nextjs';
import { Avatar, Flex, Rate, Space } from 'antd';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { sessionId } = useAuth();
  const handleLogout = () => {
    dispatch(logout());
    deleteCookie('access');
    deleteCookie('refresh');
    router.push('/auth');
    // setShowModal(true);
  };
  return (
    <Flex
      //   ref={ref}
      vertical
      className="w-full hidden max-lg:block text-[14px] top-full bg-white rounded-lg shadow-lg"
    >
      <Flex gap={15} align="center" className=" text-[14px] p-[10px]">
        <Avatar size={50} />
        <Flex vertical>
          <p className=" uppercase font-semibold">Tên chưa cung cấp</p>
          <Space>
            <p>0.0</p>
            <Rate className="!text-[12px]" />
            <p className="text-[12px]">Chưa có đánh giá</p>
          </Space>
          <Flex className="text-[12px]">
            <p className="py-[3px] pr-[10px] border-r">
              <b>0</b> Người theo dõi
            </p>
            <p className="py-[3px] pl-[10px]">
              <b>0</b> Đang theo dõi
            </p>
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical>
        <p className="bg-[#f4f4f4] px-[10px] py-[5px] text-[#9b9b9b] font-semibold">
          Quản lí đơn hàng
        </p>
        <Space
          //   onClick={() => redirectURL('/save-post')}
          className="font-medium p-[10px] hover:bg-[#e1e1e1] "
        >
          <HeartFilled className="!text-white p-[5px] bg-red-500 rounded-full" />
          Đơn mua
        </Space>
        <Space
          //   onClick={() => redirectURL('/save-post')}
          className="font-medium p-[10px] hover:bg-[#e1e1e1] "
        >
          <BellFilled className="!text-white p-[5px] bg-red-500 rounded-full" />
          Đơn bán
        </Space>
      </Flex>
      <Flex vertical>
        <p className="bg-[#f4f4f4] px-[10px] py-[5px] text-[#9b9b9b] font-semibold">
          Tiện ích
        </p>
        <Space
          //   onClick={() => redirectURL('/save-post')}
          className="font-medium p-[10px] hover:bg-[#e1e1e1] "
        >
          <HeartFilled className="!text-white p-[5px] bg-red-500 rounded-full" />
          Tin đã lưu
        </Space>
        <Space
          //   onClick={() => redirectURL('/save-post')}
          className="font-medium p-[10px] hover:bg-[#e1e1e1] "
        >
          <BellFilled className="!text-white p-[5px] bg-red-500 rounded-full" />
          Danh mục theo dõi
        </Space>
      </Flex>
      <Flex vertical>
        <p className="bg-[#f4f4f4] px-[10px] py-[5px] text-[#9b9b9b] font-semibold">
          Tiện ích
        </p>
        <Space
          //   onClick={() => redirectURL('/create-market')}
          className="font-medium p-[10px] hover:bg-[#e1e1e1]"
        >
          <PlusOutlined className="!text-white p-[5px] bg-[#ce9f3c] rounded-full" />
          Tạo cửa hàng/Chuyên trang
        </Space>
        <Space className="font-medium p-[10px] hover:bg-[#e1e1e1]">
          <ReconciliationOutlined className="!text-white p-[5px] bg-[#ce9f3c] rounded-full" />
          Lịch sử giao dịch
        </Space>
      </Flex>
      <Flex vertical>
        <p className="bg-[#f4f4f4] px-[10px] py-[5px] text-[#9b9b9b] font-semibold">
          Khác
        </p>
        <Space className="font-medium p-[10px] hover:bg-[#e1e1e1]">
          <SettingOutlined className="!text-white p-[5px] bg-[#9b9b9b] rounded-full" />
          Cài đặt tài khoản
        </Space>
        <Space className="font-medium p-[10px] hover:bg-[#e1e1e1]">
          <QuestionCircleOutlined className="!text-white p-[5px] bg-[#9b9b9b] rounded-full" />
          Trợ giúp
        </Space>

        {sessionId || user.logged ? (
          <SignOutButton signOutCallback={handleLogout}>
            <Space
              //   onClick={handleLogout}
              className="font-medium p-[10px] hover:bg-[#e1e1e1]"
            >
              <LogoutOutlined className="!text-white p-[5px] bg-[#9b9b9b] rounded-full" />
              Đăng xuất
            </Space>
          </SignOutButton>
        ) : (
          <Space
            className="font-medium p-[10px] hover:bg-[#e1e1e1]"
            onClick={() => {
              if (!sessionId && !user.logged) {
                router.push('/auth');
              }
            }}
          >
            <UserAddOutlined className="!text-white p-[5px] bg-[#9b9b9b] rounded-full" />
            Đăng nhập
          </Space>
        )}

        {/* {!sessionId || !user.logged ? 'Đăng xuất' : 'Đăng nhập'} */}
      </Flex>
    </Flex>
  );
}
