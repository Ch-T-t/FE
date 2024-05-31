'use client';
import instanceAxios from '@/api/instanceAxios';
import CardItemHorizontalSavePost from '@/components/common/CardItemHorizontalSavePost';
import { IPost } from '@/types/Job';
import { CaretRightOutlined } from '@ant-design/icons';
import { Flex, Space } from 'antd';
import React, { useEffect, useState } from 'react';

export default function SavePostPage() {
  const [productList, setProductList] = useState<IPost[]>([]);
  useEffect(() => {
    instanceAxios
      .get(`/api/storage_product`, {
        params: {
          limit: 10,
          offset: 1,
        },
      })
      .then((res) => {
        setProductList(res.data.results);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);
  return (
    <div className="w-3/5 max-lg:w-full max-lg:px-[10px] m-auto">
      <p className="font-bold py-[20px] text-[20px]">Tin đăng đã lưu</p>
      <Flex vertical gap={10}>
        {productList.map((item, index) => (
          <CardItemHorizontalSavePost key={index} />
        ))}
      </Flex>
      <button className="bg-white w-full my-[20px] py-[10px] text-[#38699f] rounded-lg font-semibold">
        <Space>
          <p>Xem thêm</p>
          <CaretRightOutlined />
        </Space>
      </button>
    </div>
  );
}
