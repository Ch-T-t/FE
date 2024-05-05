import { Modal, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Span } from 'next/dist/trace';
import {
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { IJob } from '@/types/Job';
import instanceAxios from '@/api/instanceAxios';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
interface Props {
  maxLength?: number;
  required?: boolean;
  label: string;
  className?: string;
  onChange?: (e: string | number | undefined) => void;
  onChangeKey?: (e: string) => void;
}
export default function ModalCategorySelectCustom(props: Props) {
  const currentForm = useContext(CurrentFormContext);

  const [showModal, setShowModal] = useState(false);
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [categoryList, setCategoryList] = useState<IJob[]>([]);
  const [subMenuList, setSubMenuList] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string | number>(
    currentForm.currentLabel || ''
  );
  const handleChange = (e: string | number) => {
    setValue(e);
    props.onChange?.(e || undefined);
  };
  useEffect(() => {
    instanceAxios
      .get(`/api/category`)
      .then((res) => {
        setCategoryList(res.data || []);
      })
      .catch((err) => {});
  }, []);

  const fetchSubMenuList = async (id?: string | number) => {
    setLoading(true);
    await instanceAxios
      .get(`/api/item_category`)
      .then((res) => {
        const categoryListData: Array<IJob> = res.data;
        const filteredData = categoryListData.filter(
          (item) => item.category === id
        );
        if (filteredData.length) {
          setIsSubMenu(true);
          setSubMenuList(filteredData || []);
        } else {
          currentForm.setCurrentForm?.(
            categoryList.find((item) => item.id === id)?.type || ''
          );
          currentForm.setCurrentLabel?.(
            categoryList.find((item) => item.id === id)?.name || ''
          );
          currentForm.setCurrentCategoryId?.(
            categoryList.find((item) => item.id === id)?.id || ''
          );
          setValue(categoryList.find((item) => item.id === id)?.name || '');
          setShowModal(false);
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };
  return (
    <div className={`w-full ${props.className}`}>
      <div
        onClick={() => setShowModal(true)}
        className={`w-full relative flex justify-between px-[10px] rounded-lg border bg-[#f1f1f1] ${
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
          <p className="text-[14px]">
            {currentForm.currentLabel}
            {/* {subMenuList.find((item) => item.id === value)?.name ||
              currentForm.currentLabel} */}
          </p>
        </div>

        <CaretDownOutlined />
      </div>
      <Modal
        width={700}
        title={
          <div className="relative">
            <p className="bg-[#f4f4f4] font-bold py-[10px] text-center">
              Chọn danh mục
            </p>
            {isSubMenu && (
              <button
                className="absolute left-[10px] top-1/2 -translate-y-1/2"
                onClick={() => {
                  setIsSubMenu(false);
                }}
              >
                <CaretLeftOutlined />
              </button>
            )}
          </div>
        }
        // className="!absolute !top-[50px] !left-[370px]"
        classNames={{
          // mask: '!bg-transparent',
          content: '!p-0 overflow-hidden',
          header: 'rounded',
        }}
        onCancel={() => setShowModal(false)}
        centered
        open={showModal}
        footer={[]}
      >
        <div className="rounded-lg border mx-[30px] overflow-hidden">
          {isSubMenu
            ? subMenuList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleChange(item.id || '');
                    currentForm.setCurrentForm?.(item.type || '');
                    currentForm.setCurrentLabel?.(item.name || '');
                    currentForm.setCurrentCategoryId?.(item.id || '');
                    props.onChangeKey?.(item.type || '');
                    isSubMenu ? setShowModal(false) : setIsSubMenu(true);
                  }}
                  className="flex justify-between p-[10px] border-b hover:bg-[#f5f5f5]"
                >
                  <Space className="">
                    {/* {!isSubMenu && <ProfileOutlined />} */}
                    {item.name}
                  </Space>
                  <CaretRightOutlined />
                </div>
              ))
            : categoryList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    !loading && fetchSubMenuList(item.id || '');
                    // if (item.urlSub) {
                    //   setIsSubMenu(true);
                    //   fetchSubMenuList(item.urlSub || '');
                    // } else {
                    // props.onChangeKey?.(item.key);
                    // currentForm.setCurrentForm?.(item.key || '');
                    // currentForm.setCurrentLabel?.(item.label || '');
                    // currentForm.setCurrentCategoryId?.('');
                    // setValue(item.label);
                    //   setShowModal(false);
                    // }
                  }}
                  className="flex justify-between p-[10px] border-b hover:bg-[#f5f5f5]"
                >
                  <Space className="">
                    {!isSubMenu && <ProfileOutlined />}
                    {item.name}
                  </Space>
                  <CaretRightOutlined />
                </div>
              ))}
        </div>
      </Modal>
    </div>
  );
}
