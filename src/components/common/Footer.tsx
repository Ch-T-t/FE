import { BehanceSquareFilled, FacebookFilled } from '@ant-design/icons';
import { Flex, Image, Space } from 'antd';
import Link from 'next/link';
import React, { useRef } from 'react';

export default function Footer() {
  return (
    <div className="max-lg:hidden w-full px-[200px] mt-[20px] bg-white py-[20px]">
      <Flex gap={20} justify="space-around">
        <Flex vertical gap={10}>
          <p className="uppercase font-semibold">Hỗ trợ khách hàng</p>
          <Link className="text-[#777777] text-[14px]" href={`/`}>
            Trung tâm chợ tốt
          </Link>
          <Link className="text-[#777777] text-[14px]" href={`/`}>
            An toàn mua bán
          </Link>
          <Link className="text-[#777777] text-[14px]" href={`/`}>
            Quy chế quyền riêng tư
          </Link>
          <Link className="text-[#777777] text-[14px]" href={`/`}>
            Quy định cần biết
          </Link>
          <Link className="text-[#777777] text-[14px]" href={`/`}>
            Liên hệ hỗ trợ
          </Link>
        </Flex>
        <Flex vertical gap={10}>
          <p className="uppercase font-semibold">Về chợ tốt</p>
          <Link className="text-[#777777] text-[14px]" href={`/`}>
            Giới thiệu
          </Link>
          <Link className="text-[#777777] text-[14px]" href={`/`}>
            Truyền thông
          </Link>
          <Link className="text-[#777777] text-[14px]" href={`/`}>
            Tuyển dụng
          </Link>
          <Link className="text-[#777777] text-[14px]" href={`/`}>
            Blog
          </Link>
        </Flex>
        <Flex vertical gap={10}>
          <p className="uppercase font-semibold">Liên kết</p>
          <Space>
            <FacebookFilled />
            <BehanceSquareFilled />
          </Space>
          <p className="uppercase font-semibold">Chứng nhận</p>
          <Image width={100} alt="" src="../chungnhan.png" />
        </Flex>
      </Flex>
    </div>
  );
}
