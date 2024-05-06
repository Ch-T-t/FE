import { Flex, Form } from 'antd';
import { useContext, useState } from 'react';
import InputCustom from '../InputCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import TextAreaCustom from '../TextAreaCustom';

import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import selectData from '@/services/selectData';
import { IGoodHousePost, IPost } from '@/types/Job';
import HorizontalSelect from '../HorizontalSelect';

interface Props {
  edit?: boolean;
  data?: IGoodHousePost;
}

export default function CreatePostBusinessPremisesForm(props: Props) {
  const currentForm = useContext(CurrentFormContext);
  const [checked, setChecked] = useState<boolean>();
  const titleClassName = 'pt-[20px] text-[20px] font-semibold';
  return (
    <Flex vertical gap={15}>
      <p className={titleClassName}>Diện tích & Giá</p>
      <div className="grid grid-cols-2 gap-x-[10px]">
        <Form.Item
          name={'acreage'}
          // className="w-1/2"
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.info?.acreage}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  acreage: String(e),
                },
              })
            }
            label={'Diện tích'}
          />
        </Form.Item>
        <Form.Item
          name={'price'}
          // className="w-1/2"
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.info?.price}
            type="number"
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  price: String(e),
                },
              })
            }
            label={'Giá'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'depositAmount']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            // className="!w-1/2"
            defaultValue={currentForm.currentData?.info?.depositAmount}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  depositAmount: String(e),
                },
              })
            }
            label={'Số tiền cọc'}
          />
        </Form.Item>
      </div>

      <p className={titleClassName}>Tiêu đề và mô tả chi tiết</p>
      <Form.Item<IPost>
        name={'name'}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <InputCustom
          defaultValue={currentForm.currentData?.info?.title}
          onChange={(e) =>
            currentForm.setCurrentData?.({
              ...currentForm?.currentData,
              info: {
                ...currentForm.currentData?.info,
                title: String(e),
              },
              name: String(e),
            })
          }
          label={'Tiêu đề tin đăng'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={'description'}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <TextAreaCustom
          defaultValue={currentForm.currentData?.description}
          onChange={(e) =>
            currentForm.setCurrentData?.({
              ...currentForm?.currentData,
              info: {
                ...currentForm.currentData?.info,
                detailed_description: String(e),
              },
              description: String(e),
            })
          }
          label="Mô tả chi tiết"
        />
      </Form.Item>
      <p className={titleClassName}>Thông tin người đăng</p>
      <Form.Item<IPost>
        name={['info', 'seller_information']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          defaultValue={currentForm.currentData?.info?.seller_information}
          label="Thông tin người bán"
          onChange={(e) =>
            currentForm.setCurrentData?.({
              ...currentForm?.currentData,
              info: {
                ...currentForm.currentData?.info,
                seller_information: String(e),
              },
            })
          }
          data={selectData.sellerInformationData}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['info', 'address']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <ModalLocationSelectCustom
          // onChange={(location, address) => {
          //   setLocationId((location as number) || 0);
          //   setAddressId((address as number) || 0);
          // }}
          // label={'Địa chỉ'}
          onChange={(e) =>
            currentForm.setCurrentData?.({
              ...currentForm?.currentData,
              info: {
                ...currentForm.currentData?.info,
                address: String(e),
              },
            })
          }
          label=""
        />
      </Form.Item>
    </Flex>
  );
}
