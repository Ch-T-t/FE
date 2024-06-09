import { CurrentShopDataContext } from '@/app/(app)/CurentFormContext';
import { Col, Image, Row } from 'antd';
import React, { useContext } from 'react';

interface Props {
  onFinish?: (e?: any) => void;
}

export default function ChooseCategoryPage(props: Props) {
  const currentShopData = useContext(CurrentShopDataContext);

  const categoryList = [
    {
      img: '../oto.png',
      title: 'Cửa hàng',
      name: 'Xe cộ',
    },
    {
      img: '../viec_lam.png',
      title: 'Chuyên trang',
      name: 'Việc làm',
    },
    {
      img: '../dien_tu.png',
      title: 'Cửa hàng',
      name: 'Điện tử',
    },
    {
      img: '../taxi.png',
      title: 'Chuyên trang',
      name: 'Taxi',
    },
    {
      img: '../dien_lanh.png',
      title: 'Cửa hàng',
      name: 'Điện lạnh',
    },
  ];

  return (
    <div className="w-full p-[20px] bg-white rounded-xl cursor-pointer">
      <p className="pb-[20px] font-bold text-[20px]">
        Tạo cửa hàng / chuyên trang
      </p>
      <Row gutter={[16, 16]} className="w-full">
        {categoryList.map((item, index) => (
          <Col key={index} span={12}>
            <div
              onClick={() => {
                props.onFinish?.(index);
                currentShopData.setCurrentData?.({
                  ...currentShopData.currentData,
                  id: index,
                });
              }}
              className="w-full h-[150px] relative rounded-lg overflow-hidden"
            >
              <Image
                alt=""
                width={`100%`}
                height={`100%`}
                className="object-cover rounded-lg !m-0 overflow-hidden "
                preview={false}
                src={item.img}
              />
              <span className="w-1/2 absolute left-0 h-full bg-gradient-to-r from-[#121212a2]"></span>
              <div className="absolute w-full h-full text-white top-0 pl-[30px] flex flex-col justify-center ">
                <p>{item.title}</p>
                <strong>{item.name}</strong>
              </div>
            </div>
          </Col>
        ))}
        <Col span={12}>
          <div className="w-full h-[150px] flex justify-center items-center relative rounded-lg overflow-hidden">
            <i className="py-[5px] px-[10px] border rounded-lg border-[#fecb7f]">
              Khám phá cửa hàng / Chuyên trang trên chợ tốt Đài Loan
            </i>
          </div>
        </Col>
      </Row>
      <p className="py-[20px] font-bold text-[20px]">
        Thêm cửa hàng vào chợ tốt map
      </p>
      <Row>
        <Col span={12}>
          <div className="w-full h-[150px] relative rounded-lg overflow-hidden">
            <Image
              alt=""
              width={`100%`}
              height={`100%`}
              className="object-cover rounded-lg !m-0 overflow-hidden "
              preview={false}
              src="../map.png"
            />
            <span className="w-1/2 absolute left-0 h-full bg-gradient-to-r from-[#121212a2]"></span>
            <div className="absolute w-full h-full text-white top-0 pl-[30px] flex flex-col justify-center ">
              <p>Thêm vào</p>
              <strong>Chợ tốt map</strong>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
