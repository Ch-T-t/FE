'use client';
import instanceAxios from '@/api/instanceAxios';
import CardItem from '@/components/common/CardItem';
import TitleBar from '@/components/common/TitleBar';
import TopWork from '@/components/common/TopWork';
import { IPost, ISlide } from '@/types/Job';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Avatar, Carousel, Flex, Image, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

export default function OverViewGoodHousePage() {
  const [productList, setProductList] = useState<IPost[]>([]);
  const [slideList, setSlideList] = useState<ISlide[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    instanceAxios
      .get(`/api/products`, {
        params: {
          limit: 10,
          offset: 1,
          category: 'VEHICLE',
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

  const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const categoryList = [
    {
      iconLink: `../xe_may.png`,
      name: 'Xe máy',
    },
    {
      iconLink: `../xe_dien.png`,
      name: 'Xe điện',
    },
    {
      iconLink: `../category_oto.png`,
      name: 'Ô tô',
    },
    {
      iconLink: `../xe_dap.png`,
      name: 'Xe đạp',
    },
  ];

  return (
    <div className="max-w-[1050px] max-lg:w-full max-lg:p-[0px]  flex flex-col gap-y-5 m-auto">
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
          title={'Khám phá danh mục'}
          subTitle={'Xem tất cả'}
          onClick={() => alert('OK')}
        />

        <button
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
        </button>
        <div
          // style={{ scrollBehavior: 'smooth' }}
          ref={ref}
          className="w-full mt-[10px] scroll-smooth transition relative overflow-x-auto no-scrollbar"
        >
          <div className="flex gap-x-4 justify-around">
            {categoryList.map((item, index) => (
              <div
                key={index}
                className="flex w-[100px] hover:bg-[#f5f5f5] px-[20px] py-[10px] rounded-md flex-col gap-y-5 items-center"
              >
                <Image
                  className=" hover:bg-white bg-[#f5f5f5] rounded-full object-cover"
                  width={70}
                  preview={false}
                  height={70}
                  src={item.iconLink}
                  alt=""
                />
                <p className="text-wrap text-center text-[12px] font-medium">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
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
      <div className="p-[10px] relative rounded-lg bg-white">
        <TitleBar
          title={'Cửa hàng nổi bật'}
          subTitle={'Xem tất cả'}
          shadow={false}
          onClick={() => alert('OK')}
        />
        <div className="flex w-full overflow-x-auto no-scrollbar gap-x-3">
          <Flex gap={10} className="w-max">
            <div className="min-w-[300px]">
              <TopWork />
              <div className="grid grid-cols-3 gap-5 px-[20px] max-md:hidden">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-full">
                    <Image
                      width={'100%'}
                      className="rounded-lg"
                      preview={false}
                      height={150}
                      alt=""
                      src="https://res.cloudinary.com/postman/image/upload/t_user_profile_300/v1660311364/user/tcy2f7x3msweyrddcnjf"
                    />
                    <p className="h-[40px] my-[10px] text-[14px] line-clamp-2">
                      Thanh lin ags das asd asdga sdada sasasda sdd
                    </p>
                    <p className="font-bold">$2000</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-[300px]">
              <TopWork />
              <div className="grid grid-cols-3 gap-5 px-[20px] max-md:hidden">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-full">
                    <Image
                      width={'100%'}
                      className="rounded-lg"
                      preview={false}
                      height={150}
                      alt=""
                      src="https://res.cloudinary.com/postman/image/upload/t_user_profile_300/v1660311364/user/tcy2f7x3msweyrddcnjf"
                    />
                    <p className="h-[40px] my-[10px] text-[14px] line-clamp-2">
                      Thanh lin ags das asd asdga sdada sasasda sdd
                    </p>
                    <p className="font-bold">$2000</p>
                  </div>
                ))}
              </div>
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
}
