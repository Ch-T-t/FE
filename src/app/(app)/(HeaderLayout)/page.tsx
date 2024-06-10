'use client';
import instanceAxios from '@/api/instanceAxios';
import Introduce from '@/components/Introduce';
import CardItem from '@/components/common/CardItem';
import InputCustom from '@/components/common/InputCustom';
import InputTest from '@/components/common/InputTest';
import categoryList from '@/services/categoryList';
import { IPost, IProduct, ISlide } from '@/types/Job';
import {
  BellFilled,
  CaretLeftOutlined,
  CaretRightOutlined,
  CheckOutlined,
  DingdingOutlined,
  HeartFilled,
  HeatMapOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { UserButton } from '@clerk/nextjs';
import {
  Badge,
  Button,
  Carousel,
  Flex,
  Form,
  Image,
  Input,
  Pagination,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  const [productList, setProducList] = useState<IPost[]>([]);
  const [slideList, setSlideList] = useState<ISlide[]>([]);
  const [limit, setLimit] = useState(10);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [productTotal, setProductTotal] = useState(0);

  const router = useRouter();
  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };
  const contentStyle: React.CSSProperties = {
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    height: '400px',
  };

  useEffect(() => {
    instanceAxios
      .get(`/api/products?limit=${limit}&offset=2`)
      .then((res) => {
        setProducList((res.data.results as IPost[]) || []);
        setProductTotal(res.data.count);
      })
      .catch((err) => console.log(err));

    instanceAxios
      .get(`/api/slide`)
      .then((res) => {
        setSlideList((res.data as ISlide[]) || []);
      })
      .catch((err) => {});
  }, []);
  const simpleCategoryList = [
    {
      icon: '../lien_he_quang_cao.png',
      name: 'Liên hệ quảng cáo',
    },
    {
      icon: '../tin_dang_da_luu.png',
      name: 'Tin đăng đã lưu',
    },
    {
      icon: '../danh_muc_theo_doi.png',
      name: 'Danh mục theo dõi',
    },
    {
      icon: '../tao_cua_hang_chuyen_trang.png',
      name: 'Tạo cửa hàng chuyên trang',
    },
    {
      icon: '../dang_tin_cho_tang.png',
      name: 'Đăng tin cho tặng',
    },
  ];
  return (
    <div className="w-[90%] flex max-lg:w-full p-[10px] max-lg:p-0 flex-col gap-y-5 m-auto overflow-hidden">
      <div className="p-[10px] max-lg:p-0 bg-white shadow-xl rounded-lg max-lg:rounded-none">
        <Carousel
          className="rounded-lg max-lg:rounded-none overflow-hidden"
          autoplay
        >
          {slideList.map((item, index) => (
            <div key={index} className="max-lg:h-[100px] ">
              <div style={contentStyle}>
                <Image alt="" preview={false} src={item.banner} />
              </div>
            </div>
          ))}
        </Carousel>
        <Flex
          justify="space-between"
          wrap="wrap"
          className="mt-[10px] max-lg:!flex-nowrap max-lg:overflow-y-auto max-lg:gap-5 no-scrollbar"
        >
          {simpleCategoryList.map((item, index) => (
            <Flex
              key={index}
              vertical
              align="center"
              gap={10}
              onClick={() => router.push('/save-post')}
              className="rounded-md font-medium p-[10px] hover:bg-[#e1e1e1]"
            >
              <div className="w-[60px] max-lg:w-[30px] ">
                <Image width={`100%`} alt="" src={item.icon} preview={false} />
              </div>
              <p className="text-center text-[14px] max-lg:text-[8px]">
                Liên hệ quảng cáo
              </p>
            </Flex>
          ))}
        </Flex>
      </div>

      <div className="p-[10px] w-full relative rounded-lg bg-white">
        <p className="uppercase font-semibold py-[20px] p-[10px] text-[20px] max-lg:text-[14px]">
          Khám phá danh mục
        </p>
        {/* <button
          className="absolute  left-0 top-1/2"
          onClick={() => scroll(-200)}
        >
          <CaretLeftOutlined />
        </button>
        <button
          className="absolute  right-0 top-1/2"
          onClick={() => scroll(200)}
        >
          <CaretRightOutlined />
        </button> */}
        <div
          // style={{ scrollBehavior: 'smooth' }}
          ref={ref}
          className="w-full scroll-smooth transition relative overflow-x-auto no-scrollbar px-[24px]"
        >
          <div className="!w-max grid grid-cols-5 flex-wrap gap-x-16 gap-y-10 max-md:!gap-10 justify-start">
            {categoryList.map((item, index) => (
              <Link key={index} href={item.url || ''}>
                <div className="flex flex-col max-md:w-[50px] items-center">
                  <div className="w-[120px] h-[120px] max-md:w-[70px] max-md:h-[70px]">
                    <Image
                      preview={false}
                      width={`100%`}
                      height={`100%`}
                      className="rounded-xl object-cover"
                      src={item.img}
                      alt=""
                    />
                  </div>
                  <p className="text-wrap w-full text-center text-[14px] mt-[5px] max-md:text-[8px] font-medium">
                    {item.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-lg:bg-white">
        <div className="rounded-md bg-white max-lg:text-[14px] max-lg:border-none max-lg:shadow-none font-semibold uppercase text-[16px] px-[10px] py-[5px] shadow-[0_2px_8px_rgba(0,0,0,.15)]">
          Tin đăng mới
        </div>
        <div className="grid grid-cols-5 justify-center gap-3 max-lg:gap-1 mt-[20px] max-lg:mt-[10px] max-lg:grid max-lg:gap-y-5 max-lg:grid-cols-2">
          {productList.map?.((item, index) => (
            <CardItem
              className="w-full"
              classNameImg="max-lg:!h-[100px]"
              data={item}
              ribbon={index % 2 == 0 ? 'Việc 24h' : ''}
              key={index}
            />
          ))}
          {productList.map?.((item, index) => (
            <CardItem
              className="w-full"
              classNameImg="max-lg:!h-[100px]"
              data={item}
              ribbon={index % 2 == 0 ? 'Việc 24h' : ''}
              key={index}
            />
          ))}

          {/* {[...Array(3)].map((_, index) => (
            <CardItem
              data={{
                id: index,
              }}
              ribbon={index % 2 == 0 ? 'Việc 24h' : ''}
              key={index}
            />
          ))} */}
        </div>
        <Pagination
          className="flex items-center justify-center !mt-[20px]"
          defaultCurrent={currentPagination}
          total={productTotal}
        />
      </div>
      <div className="bg-white p-[10px] rounded-md">
        <Introduce />
      </div>
    </div>
  );
}
