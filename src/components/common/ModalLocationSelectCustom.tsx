import { Collapse, Flex, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Span } from 'next/dist/trace';
import {
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  GlobalOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { fetchAreaList } from '@/api/addressRequest';
import { ILocationResponse } from '@/types/Job';
import taiwanProvinces from '@/services/taiwanProvinces';

interface Props {
  maxLength?: number;
  required?: boolean;
  label: string;
  className?: string;
  defaultValue?: string | number | undefined;
  onChange?: (
    location: string | number | undefined,
    address?: string | number | undefined
  ) => void;
  onChangeLabel?: (e: string | number | undefined) => void;
}

export default function ModalLocationSelectCustom(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [areaList, setAreaList] = useState<ILocationResponse[]>([]);
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [value, setValue] = useState<string | number>(props.defaultValue || '');

  const handleChange = (e: string | number, address: string | number) => {
    setValue(e);
    props.onChange?.(value);
  };

  // const fethAreaListData = async (name?: string) => {
  //   taiwanProvinces.filter((item) => item.name === name);
  // };

  return (
    <div className="w-full ">
      <div
        onClick={() => setShowModal(true)}
        className={`w-full relative flex justify-between  px-[10px] rounded-lg border ${
          value ? 'py-[5px]' : 'py-[15px] '
        }`}
      >
        <div className="flex flex-col gap-y-0">
          <Space
            className={`w-full text-[#9b9b9b] transition-all text-[14px] ${
              value && '!text-[12px] font-medium'
            }`}
          >
            {props.label} <span className="text-red-500">*</span>
          </Space>
          <p className="text-[12px]">{value}</p>
        </div>

        <CaretDownOutlined />
      </div>
      <Modal
        width={700}
        title={
          <div className="relative">
            <p className=" text-[20px] font-bold py-[10px] text-center">
              Chọn khu vực
            </p>
            {isSubMenu && (
              <button
                className="absolute left-[10px] top-1/2 -translate-y-1/2"
                onClick={() => setIsSubMenu(false)}
              >
                <CaretLeftOutlined />
              </button>
            )}
          </div>
        }
        // className="!absolute !top-[50px] !left-[370px]"
        classNames={
          {
            // mask: '!bg-transparent',
            // content: '!p-0 overflow-hidden',
          }
        }
        onCancel={() => setShowModal(false)}
        centered
        open={showModal}
        footer={[]}
      >
        <div className="px-[30px]">
          <Space className="font-semibold text-[16px]">
            <GlobalOutlined />
            Lọc khu vực
          </Space>
          <div className="flex justify-center gap-x-5 my-[20px]">
            {taiwanProvinces.map((item, index) => (
              <p
                key={index}
                className="w-fit px-[20px] py-[5px] rounded-full bg-[#f4f4f4] text-nowrap"
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className="rounded-lg cursor-pointer border overflow-hidden">
            {taiwanProvinces.map((item, index) => (
              <Collapse
                key={index}
                className="w-full !rounded-none !border-0"
                expandIconPosition="end"
                collapsible="icon"
                defaultActiveKey={['1']}
                items={[
                  {
                    key: '1',
                    label: (
                      <Space direction="vertical">
                        <p className="text-[16px]">{item.name}</p>
                        <p>Taipei City</p>
                      </Space>
                    ),
                    children: item.cities.map((citie, index) => (
                      <Flex
                        key={index}
                        onClick={() => {
                          setValue(citie.name);
                          handleChange(citie.name, citie.name);
                          props.onChangeLabel?.(citie.name || '');
                          props.onChange?.(citie.name || '');
                          setShowModal(false);
                        }}
                        justify="space-between"
                      >
                        <p>{citie.name}</p>
                        <p
                          className={`w-[20px] h-[20px] rounded-full bg-white  ${
                            value !== citie.name
                              ? 'border-[#c8c8c8]'
                              : 'border-yellow-500'
                          } border-[6px]`}
                        ></p>
                      </Flex>
                    )),
                    className: '!rounded-none',
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
