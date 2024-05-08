'use client';
import instanceAxios from '@/api/instanceAxios';
import MessageTabItem from '@/components/common/MessageTabItem';
import getPrefixUrl from '@/services/getPrefixUrl';
import { IProduct } from '@/types/Job';
import {
  DeploymentUnitOutlined,
  FileImageOutlined,
  MenuOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Avatar, Flex, Input, Space } from 'antd';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [productData, setProductData] = useState<IProduct>();
  const [detailChat, setDetailChat] = useState(false);

  useEffect(() => {
    const fethCurrentChat = async () => {
      const productChatId = localStorage.getItem('productChatId');
      const productChatKey = localStorage.getItem('productChatKey');
      await instanceAxios
        .get(`/${getPrefixUrl(productChatKey || '')}/items/${productChatId}/`)
        .then((res) => {
          setProductData(res.data.data);
        })
        .catch((err) => {});
    };
    fethCurrentChat();
  }, []);
  return (
    <div className="w-5/6 max-lg:w-full h-[630px] max-lg:h-[calc(100%)] max-lg:mb-[85px] m-auto bg-white">
      <Flex className="h-full">
        <Flex
          vertical
          justify="space-between"
          className={`max-lg:w-full w-2/5 h-full cursor-pointer ${detailChat && 'max-lg:!hidden'}`}
        >
          <Flex vertical className="h-full">
            <Flex className="p-[10px]" gap={10}>
              <p className="bg-[#ffe9c2] px-[20px] py-[3px] text-[#ffa031] rounded-full text-[14px]">
                Tất cả
              </p>
              <p className="bg-[#ffe9c2] px-[20px] py-[3px] text-[#ffa031] rounded-full text-[14px]">
                Tôi mua
              </p>
              <p className="bg-[#ffe9c2] px-[20px] py-[3px] text-[#ffa031] rounded-full text-[14px]">
                Tôi bán
              </p>
            </Flex>
            <Flex className="overflow-y-auto" vertical align="revert">
              <Flex vertical>
                {[...Array(100)].map((_, index) => (
                  <MessageTabItem
                    onClick={() => setDetailChat(true)}
                    key={index}
                  />
                ))}
              </Flex>
            </Flex>
            <Flex vertical className="">
              <button className="w-fit my-[20px] m-auto px-[10px] py-[5px] rounded-lg border text-orange-600 border-orange-600">
                Xóa cuộc trò chuyện
              </button>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          vertical
          className={`w-3/5 max-lg:w-full max-lg:h-[calc(100vh-170px)] max-lg:overflow-y-auto relative text-[14px] ${detailChat ? 'max-lg:!flex' : 'max-lg:!hidden'}`}
        >
          <Flex vertical className="max-lg:absolute max-lg:top-0 max-lg:w-full">
            <Flex justify="space-between" className="p-[10px] border-b">
              <Flex justify="center" align="center" gap={10}>
                <p onClick={() => setDetailChat(false)}>{`<`}</p>
                <Avatar src={productData?.User?.avatar || ''} size={50} />
                <Flex vertical>
                  <p>{productData?.User?.first_name}</p>
                  <Space> • Đang hoạt động</Space>
                </Flex>
              </Flex>
              <MenuOutlined />
            </Flex>
            <Flex className="p-[10px] border-b" align="center" gap={10}>
              <Avatar shape="square" src="" size={50} />
              <Flex vertical>
                <p>{productData?.Title || ''}</p>
                <p className="text-red-500 font-semibold">
                  ${productData?.Price?.toLocaleString()}
                </p>
              </Flex>
            </Flex>
          </Flex>
          <div className="h-full max-lg:mt-[140px] flex flex-col-reverse overflow-y-auto">
            <Flex vertical gap={10} className="p-[10px]">
              {[...Array(50)].map((_, index) => (
                <Flex key={index} justify={index % 2 === 0 ? 'start' : 'end'}>
                  <Flex
                    vertical
                    className={`p-[10px] rounded-lg ${
                      index % 2 === 0 ? 'bg-[#f4f4f4]' : 'bg-[#fff4d6]'
                    }`}
                  >
                    <p>asdqweqweqwqwqwqwe-{index}</p>
                    <p
                      className={`text-[#bdc1c9] text-[12px] ${
                        index % 2 !== 0 && 'text-right'
                      }`}
                    >
                      {index} giờ trước
                    </p>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </div>
          <Flex
            gap={10}
            className="m-[20px] text-[20px] max-lg:fixed max-lg:bg-white max-lg:w-full max-lg:m-0 max-lg:p-[20px] max-lg:bottom-0 max-lg:z-[100]"
          >
            <FileImageOutlined />
            <DeploymentUnitOutlined />
            <Input className="text-[14px]" placeholder="..." />
            <SendOutlined />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
