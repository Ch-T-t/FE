'use client';
import { CurrentShopDataContext } from '@/app/(app)/CurentFormContext';
import ActiveCreateMarketPage from '@/components/create-market/ActiveCreateMarketPage';
import ChooseCategoryPage from '@/components/create-market/ChooseCategoryPage';
import PaidCreateMarketPage from '@/components/create-market/PaidCreateMarketPage';
import SetCreateMarketPage from '@/components/create-market/SetCreateMarketPage';
import { Flex, Space } from 'antd';
import React, { useContext, useState } from 'react';

export default function CreateMarketPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [finalStep, setFinalStep] = useState(false);

  const currentShopData = useContext(CurrentShopDataContext);

  const lableStepList = [
    {
      step: 0,
      lablel: 'Chọn chuyên mục',
      children: (
        <ChooseCategoryPage onFinish={(e) => setCurrentStep(currentStep + 1)} />
      ),
    },
    {
      step: 1,
      lablel: 'Thiết lập trang',
      children: (
        <SetCreateMarketPage
          onFinish={(e) => setCurrentStep(currentStep + 1)}
        />
      ),
    },
    {
      step: 2,
      lablel: 'Thanh toán',
      children: (
        <PaidCreateMarketPage
          onFinish={(e) => {
            setCurrentStep(currentStep + 1);
            setFinalStep(true);
          }}
        />
      ),
    },
    {
      step: 3,
      lablel: 'Kích hoạt',
      children: <ActiveCreateMarketPage />,
    },
  ];
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto no-scrollbar px-[10px]">
        <Flex className="my-[20px] w-fit" gap={10} justify="center">
          {lableStepList.map((item, index) => (
            <Space
              onClick={() => finalStep && setCurrentStep(index)}
              className="flex cursor-pointer"
              key={index}
            >
              <div
                className={`w-[30px] h-[30px] flex justify-center items-center ${
                  currentStep >= index ? `bg-[#fe9900]` : `bg-[#cfcfcf]`
                } rounded-full`}
              >
                <b className={`text-white`}>{item.step + 1}</b>
              </div>
              <p
                className={`font-semibold text-nowrap ${currentStep > item.step && 'max-lg:hidden'} ${
                  currentStep === index ? `text-black` : `text-[#cfcfcf]`
                }`}
              >
                {item.lablel}
              </p>
            </Space>
          ))}
        </Flex>
      </div>
      <div className="w-4/5 max-lg:w-full m-auto">
        {lableStepList[currentStep].children}
      </div>
    </div>
  );
}
