'use client';
import instanceAxios from '@/api/instanceAxios';
import CardItem from '@/components/common/CardItem';
import TitleBar from '@/components/common/TitleBar';
import TopWork from '@/components/common/TopWork';
import { IPost, ISlide } from '@/types/Job';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Avatar, Carousel, Flex, Image, Space } from 'antd';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export default function WorkPage() {
  const [productList, setProductList] = useState<IPost[]>([]);
  const [slideList, setSlideList] = useState<ISlide[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  // function getUserAccount() {
  //   return instanceAxios.get('/user/12345');
  // }

  // function getUserPermissions() {
  //   return instanceAxios.get('/user/12345/permissions');
  // }

  // Promise.all([getUserAccount(), getUserPermissions()])
  //   .then(function (results) {
  //     const acct = results[0];
  //     const perm = results[1];
  //   });

  useEffect(() => {
    instanceAxios
      .get(`/api/products`, {
        params: {
          limit: 10,
          offset: 1,
          category: 'MACHINES',
        },
      })
      .then((res) => {
        setProductList(res.data.results || []);
      })
      .catch((err) => {})
      .finally(() => {});
    instanceAxios
      .get(`/api/slide`)
      .then((res) => {
        setSlideList((res.data as ISlide[]) || []);
      })
      .catch((err) => {});
  }, []);

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };
  const categoryList = [
    { icon: '../xay_dung.png', name: 'Xây dựng', tag: '' },
    {
      icon: '../nang_luong_mat_troi.svg',
      name: 'Năng lượng mặt trời',
      tag: '',
    },
    { icon: '../nong_nghiep.svg', name: 'Nông nghiệp', tag: '' },
    { icon: '../nhan_vien_phuc_vu.svg', name: 'Nhân viên phục vụ', tag: '' },
    { icon: '../ban_hang.svg', name: 'Bán Hàng', tag: '' },
    { icon: '../chuyen_chu.svg', name: 'Chuyển chủ', tag: '' },
    { icon: '../xay_dung.png', name: 'Việc làm khác', tag: '' },
  ];
  const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <div className="w-3/4 max-lg:w-full max-lg:p-[10px]  flex flex-col gap-y-5 m-auto">
      <div className="p-[10px] bg-white shadow-xl rounded-lg">
        <Carousel className="rounded-lg overflow-hidden" autoplay>
          {slideList.map((item, index) => (
            <div key={index} className="max-lg:h-[100px] ">
              <div style={contentStyle}>
                <Image alt="" preview={false} src={item.banner} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="p-[10px] relative rounded-lg bg-white">
        <TitleBar
          shadow={false}
          title={'Việc làm theo ngành nghề'}
          subTitle={'Xem tất cả'}
          onClick={() => alert('OK')}
        />

        {/* <button
          className="absolute -translate-x-full left-0 top-1/2"
          onClick={() => scroll(-200)}
        >
          <CaretLeftOutlined />
        </button>
        <button
          className="absolute translate-x-full right-0 top-1/2"
          onClick={() => scroll(200)}
        >
          <CaretRightOutlined />
        </button> */}
        <div
          // style={{ scrollBehavior: 'smooth' }}
          ref={ref}
          className="w-full mt-[10px] scroll-smooth transition relative overflow-x-auto no-scrollbar"
        >
          <div className="flex gap-x-4  justify-between">
            {categoryList.map((item, index) => (
              <Link href={'/list/work'} key={index}>
                <div className="flex w-[120px] hover:bg-[#f5f5f5] px-[20px] py-[10px] rounded-md flex-col gap-y-5 items-center">
                  <div className="w-[70px] h-[70px] max-md:w-[50px] max-md:h-[50px]">
                    <Image
                      className="hover:bg-white bg-[#f5f5f5] rounded-full object-cover"
                      width={`100%`}
                      preview={false}
                      height={`100%`}
                      src={item.icon}
                      alt=""
                    />
                  </div>
                  <p className="text-wrap text-center text-[12px] font-medium">
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="p-[10px] relative rounded-lg bg-white">
        <TitleBar
          title={'Chuyên trang việc làm'}
          subTitle={'Xem tất cả'}
          shadow={false}
          onClick={() => alert('OK')}
        />
        <div className="flex w-full overflow-x-auto no-scrollbar gap-x-3">
          <Flex gap={10} className=" w-max">
            <div className="min-w-[300px]">
              <TopWork />
            </div>
            <div className="min-w-[300px]">
              <TopWork />
            </div>
          </Flex>
        </div>
      </div>
      <div className="relative">
        <TitleBar
          title={'VIỆC LÀM 24H'}
          subTitle={'Xem tất cả'}
          onClick={() => {}}
          shadow={true}
        />

        <div className="w-full scroll-smooth overflow-x-auto no-scrollbar ">
          <div className="flex gap-x-2 py-[20px] px-[10px]">
            {productList.map((item, index) => (
              <CardItem data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <TitleBar
          title={'VIỆC LÀM MỚI'}
          subTitle={'Xem tất cả'}
          onClick={() => {}}
          shadow={true}
        />

        <div className="w-full scroll-smooth overflow-x-auto no-scrollbar ">
          <div className="flex gap-x-2 py-[20px] px-[10px]">
            {productList.map((item, index) => (
              <CardItem data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
