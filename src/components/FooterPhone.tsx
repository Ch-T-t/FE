import {
  BellOutlined,
  CloseCircleFilled,
  HomeOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Flex, Space } from 'antd';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import NotificationItem from './common/NotificationItem';
import { useRouter } from 'next/navigation';
import { useOnClickOutside } from 'usehooks-ts';
import { INotification } from '@/types/User';
import instanceAxios from '@/api/instanceAxios';

export default function FooterPhone() {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationList, setNotificationList] = useState<INotification[]>([]);
  const [changeNotification, setChangeNotification] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const redirectURL = (url: string) => {
    router.push(url);
    setOpenNotification(false);
  };
  const fethReadNotification = async (id: string) => {
    await instanceAxios
      .put(`/api/notification/${id}/read`)
      .then((res) => setChangeNotification(!changeNotification))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchNotification = async () => {
      await instanceAxios
        .get(`/api/notification`)
        .then((res) => {
          setNotificationList(res.data);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    };
    fetchNotification();
  }, [changeNotification]);

  return (
    <div className="w-full max-h-[calc(100%-88px)] fixed z-50 hidden max-lg:flex max-lg:flex-col max-lg:justify-end bg-transparent bottom-0 px-[10px] max-lg:p-0 py-[5px]">
      {openNotification && (
        <div ref={notificationRef} className="overflow-y-auto h-full bg-white">
          <Flex className="px-[10px] pt-[10px] justify-between max-lg:!hidden">
            <b>Thông báo</b>
            <CloseCircleFilled onClick={() => setOpenNotification(false)} />
          </Flex>
          <Flex>
            <p className="bg-[#e8e8e8] font-semibold w-1/2 text-center px-[20px] py-[10px] text-[16px] border-b-2 border-[#ffa031]">
              Hoạt động
            </p>
            <p className=" w-1/2 text-center px-[20px] py-[10px] text-[16px]">
              Tin mới
            </p>
          </Flex>
          <Flex gap={10} className="p-[10px] max-lg:!hidden">
            <p className="bg-[#ffe9c2] px-[20px] py-[3px] text-[#ffa031] rounded-full text-[14px]">
              Tất cả
            </p>
            <p className="bg-[#ffe9c2] px-[20px] py-[3px] text-[#ffa031] rounded-full text-[14px]">
              Chưa xem
            </p>
          </Flex>
          <Flex
            vertical
            className="border-t border-[#ffa031] max-lg:h-full overflow-y-auto"
          >
            {notificationList.map((item, index) => (
              <NotificationItem
                data={item}
                onClick={() => fethReadNotification(item.id || '')}
                key={index}
              />
            ))}
          </Flex>
        </div>
      )}
      <Flex
        justify="space-between"
        className="w-full relative bg-white pt-[5px] border-t"
      >
        <Flex
          // onClick={() => setOpenNotification(false)}
          className="w-[40%]"
          justify="space-around"
        >
          <Flex className="text-[#9f9f9f]" onClick={() => redirectURL('/')}>
            <Flex vertical justify="center" align="center">
              <HomeOutlined className="text-[24px]" />
              <p className="text-[10px]">Trang chủ</p>
            </Flex>
          </Flex>
          <Flex
            className="text-[#9f9f9f]"
            onClick={() => redirectURL('/post-manager')}
          >
            <Flex vertical justify="center" align="center">
              <ProfileOutlined className="text-[24px]" />
              <p className="text-[10px]">Quản lí tin</p>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          onClick={() => redirectURL('/create-post')}
          vertical
          justify="center"
          align="center"
          className="absolute text-black top-1/2 left-1/2 p-[12px] border-8 rounded-full border-white -translate-x-1/2 -translate-y-1/2 bg-[#ffba00]"
        >
          <HomeOutlined className="text-[24px]" />
          <p className="text-[10px]">Đăng tin</p>
        </Flex>
        <Flex className="w-[40%]" justify="space-around">
          {/* <Link className="text-[#9f9f9f]" href={'/'}> */}
          <Flex
            onClick={() => {
              setOpenNotification(!openNotification);
            }}
            vertical
            justify="center"
            align="center"
          >
            <BellOutlined className="text-[24px]" />
            <p className="text-[10px]">Thông báo</p>
          </Flex>
          {/* </Link> */}

          <Flex
            onClick={() => redirectURL('/profile')}
            vertical
            justify="center"
            align="center"
          >
            <UserOutlined className="text-[24px]" />
            <p className="text-[10px]">Tài khoản</p>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
