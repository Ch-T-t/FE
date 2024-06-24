'use client';
import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/app/hooks';
import CardItemHorizontalManager from '@/components/common/CardItemHorizontalManager';
import { textDefault } from '@/services/dataDefault';
import { IPost, IProduct } from '@/types/Job';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Flex, Image, List, Pagination, Space } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function PostManagePage() {
  const currentUser = useAppSelector((state) => state.user.data);
  const [currentTab, setCurrentTab] = useState('active');
  const [productList, setProductList] = useState<IPost[]>([]);
  const tabList = [
    { key: 'active', label: 'Đang hiện thị', children: <p>ok</p> },
    { key: 'reject', label: 'Bị từ chối', children: <p>ok</p> },
    { key: 'expired', label: 'Hết hạn', children: <p>ok</p> },
    // { key: 'not_active', label: 'Đã ẩn', children: <p>ok</p> },
    // { key: 'different', label: 'Khác', children: <p>ok</p> },
  ];
  useEffect(() => {
    instanceAxios
      .get(`/api/products`, {
        params: {
          user_id: currentUser.id,
          // offset: 10,
          // limit: 5,
        },
      })
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="w-2/3 m-auto max-lg:w-full">
      <p className="py-[20px] font-bold max-lg:hidden">Quản lí tin đăng</p>
      <Flex
        align="center"
        gap={20}
        className="relative p-[10px] rounded-lg bg-white "
      >
        {currentUser?.id || 0 > 1 ? (
          <>
            <Avatar size={100} />
            <Flex vertical gap={10}>
              <p className="font-semibold text-[18px]">
                {currentUser.fullname || textDefault}
              </p>
              <Link href={`/user/${currentUser.id}`}>
                <p className="px-[20px] py-[5px] text-[14px] cursor-pointer rounded-lg text-[#4e8bef] border border-[#4e8bef]">
                  Xem trang cá nhân
                </p>
              </Link>
            </Flex>
            <Flex
              align="center"
              className="absolute right-0 top-1/2 -translate-y-1/2 py-[5px] pl-[5px] pr-[20px] rounded-s-full bg-[#ffba00]"
              gap={10}
            >
              <Avatar size={30} src={currentUser.avatar || ''} />
              <p className="text-[12px] font-medium">BlueCar Auto</p>
            </Flex>
          </>
        ) : (
          <Flex>
            <Flex align="center" gap={10}>
              <Avatar size={90} />
              <Flex vertical>
                <p className="font-semibold text-[18px]">Tên chưa cung cấp</p>
                <Space className="text-blue-500 mt-[10px]">
                  <Image
                    width={28}
                    alt=""
                    preview={false}
                    src="../swap_page.png"
                  />
                  <p className="text-[14px] ">Chuyển sang trang cửa hàng</p>
                </Space>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex
        gap={10}
        className="bg-white rounded-lg my-[10px] overflow-x-auto no-scrollbar cursor-pointer text-nowrap max-lg:text-[14px]"
      >
        {tabList.map((item, index) => (
          <p
            onClick={() => setCurrentTab(item.key)}
            className={`flex-1 relative text-center max-md:text-[14px] px-[12px] transition-all py-[10px] uppercase text-[#9b9b9b] font-semibold ${
              currentTab === item.key &&
              "before:content-[''] before:absolute border-b-2 border-[#ffba00] before:bg-[#ffba00] before:w-full before:h-[2px] before:rounded-full before:top-full before:left-0"
            }`}
            key={index}
          >
            {item.label}
          </p>
        ))}
      </Flex>
      <Flex className="w-full" vertical gap={5} align="center">
        {productList.length > 0 ? (
          <List
            className="w-full"
            pagination={{
              position: 'bottom',
              align: 'center',
              pageSize: 5,
              total: productList.length,
            }}
            dataSource={productList}
            renderItem={(item, index) => (
              <List.Item>
                <CardItemHorizontalManager data={item} key={index} />
              </List.Item>
            )}
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              preview={false}
              alt=""
              src="https://static.chotot.com/storage/ads-dashboard/svg/empty-frame.svg"
            />
            Không thấy dữ liệu
          </div>
        )}
        {/* {productList.map((item, index) => (
          <CardItemHorizontalManager key={index} />
        ))}
        <Pagination className="!my-[20px]" defaultCurrent={1} total={50} /> */}
      </Flex>
    </div>
  );
}
