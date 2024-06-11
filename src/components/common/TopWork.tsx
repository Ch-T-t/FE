import { AlertOutlined } from '@ant-design/icons';
import { Avatar, Badge, Flex, Image, Rate, Space } from 'antd';
import React from 'react';

export default function TopWork() {
  return (
    <div className="w-full">
      <div className="relative ">
        <Image preview={false} width={'100%'} height={200} alt="" src="" />
        <div className="absolute left-[20px] top-full -translate-y-1/2">
          <Badge dot={true} color="green" size="default">
            <div className="w-[100px] h-[100px]">
              <Image
                alt=""
                preview={false}
                width={`100%`}
                height={`100%`}
                className="p-[2px] bg-black object-cover rounded-full "
              />
            </div>
          </Badge>
        </div>
        <p className="absolute text-nowrap right-5 bottom-5 px-[10px] py-[5px] rounded-full border text-[12px] text-[#dd8500] border-[#dd8500] ">
          Đang theo dõi
        </p>
      </div>
      <div className="w-full">
        <p className="w-full pl-10 max-md:pl-32 max-md:w-[290px] text-center font-semibold truncate">
          Khánh blue - trùm việc làm
        </p>
        <div className="flex flex-col gap-y-1 pt-[40px] pb-[10px]">
          <Space className="text-[14px]">
            <Rate className={'!text-[14px]'} allowHalf defaultValue={2.5} />
            <Space>
              <p>2.5</p>
              <p className="text-[#28699f]">(25 đánh giá)</p>
            </Space>
          </Space>
          <Flex gap={5} align="center" className="text-[13px] text-[#9b9b9b]">
            <Image width={20} alt="" src="../location.png" preview={false} />•
            Hoạt động 3 tuần trước
          </Flex>
          <p className="text-[15px] text-[#9b9b9b]">
            “ Möi gidi viéc låm ( Cöng trinh, näng lugng, cöp pha, nöng nghiép )
            khu vvrc AnNan, AnPing, Yongkang - Dåi Nam „
          </p>
        </div>
      </div>
    </div>
  );
}
