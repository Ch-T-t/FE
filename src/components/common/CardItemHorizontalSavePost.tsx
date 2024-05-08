import {
  EditOutlined,
  EyeOutlined,
  HeartFilled,
  MoreOutlined,
  ShareAltOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Flex, Image, Space } from 'antd';
import React from 'react';

export default function CardItemHorizontalSavePost() {
  return (
    <div className="w-full ">
      <Badge.Ribbon
        // className="invisible"
        color="red"
        placement="start"
        text={<i className="font-semibold">Xe ghép</i>}
      >
        <Flex
          align="center"
          gap={20}
          className="w-full relative bg-white rounded-lg p-[10px] max-lg:pb-[30px]"
        >
          <div className="relative rounded-lg w-1/3 overflow-hidden">
            <Image
              width={`100%`}
              height={130}
              preview={false}
              className=""
              alt=""
              src=""
            />
            <p className="absolute w-full left-0 bottom-0 py-[5px] text-[10px] text-white text-center bg-[rgba(0,0,0,0.7)]">
              Đẫ ẩn
            </p>
          </div>
          <Flex className="w-2/3 " vertical gap={5}>
            <p className="font-medium w-full line-clamp-2">
              SH 125 CBS 2020 xe CVC Chät Siéu Li-rdT NEW
            </p>
            <b className="text-red-500 text-[14px]">$3000/tháng</b>
            <Space>
              <Avatar src={''} size={20} />
              <p className="text-[#9b9b9b] font-medium">SimpRaidenEi</p>
            </Space>
            <Space className="max-lg:!hidden">
              <WindowsOutlined />
              <p className="text-[#9b9b9b] font-normal">Thành phố đài nam</p>
            </Space>
            <Flex
              gap={10}
              className="max-lg:justify-between max-md:items-center"
            >
              <p className="bg-[#f4f4f4] text-[12px] px-[10px] py-[5px] rounded-lg">
                2 giờ trước
              </p>
              <p className="bg-[#f4f4f4] text-[12px] px-[10px] py-[5px] rounded-lg max-lg:hidden">
                Ngày làm: 10/10 /23
              </p>
              <div className="hidden max-lg:block">
                <HeartFilled style={{ color: 'red' }} />
              </div>
            </Flex>
          </Flex>
          <Flex
            className="absolute bottom-5 right-5 max-lg:bottom-1 max-lg:right-1/2 max-lg:translate-x-full"
            gap={20}
          >
            <button className=" text-[12px] font-semibold  px-[20px] py-[2px] border border-green-500 text-green-500 rounded-full">
              Chat
            </button>
            <HeartFilled className="max-lg:!hidden" style={{ color: 'red' }} />
          </Flex>

          <Dropdown
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: '1',
                  icon: <ShareAltOutlined />,
                  label: 'Chia sẻ',
                },
                {
                  key: '2',
                  icon: <EyeOutlined />,
                  label: 'Đã bán / Ẩn tin',
                },
                {
                  key: '3',
                  icon: <EditOutlined />,
                  label: 'Sửa tin',
                },
              ],
            }}
          >
            <MoreOutlined className="absolute right-5 top-5" />
          </Dropdown>
        </Flex>
      </Badge.Ribbon>
    </div>
  );
}
