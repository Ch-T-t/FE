import { Checkbox, Flex, Form, Space } from 'antd';
import { useContext, useEffect, useState } from 'react';
import InputCustom from '../InputCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import SelectCustom from '../SelectCustom';
import TextAreaCustom from '../TextAreaCustom';

import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import selectData from '@/services/selectData';
import { IPost, IProduct, IRefrigeratorPost } from '@/types/Job';
import HorizontalSelect from '../HorizontalSelect';
import { fetchPostDetail } from '@/api/allRequest';

interface Props {
  edit?: boolean;
  data?: IProduct;
}

export default function CreatePostAirConditionForm(props: Props) {
  const currentForm = useContext(CurrentFormContext);
  const [checked, setChecked] = useState<boolean>();

  const titleClassName = 'pt-[20px] text-[20px] font-semibold';
  useEffect(() => {
    if (props.edit) {
      fetchPostDetail(props.data?.id || 0)
        .then((res) => {
          currentForm.setCurrentData?.(res.data.data || {});
        })
        .catch((err) => {});
    }
  });
  return (
    <Flex vertical gap={15}>
      <p className={titleClassName}>Thông tin chi tiết</p>
      <Form.Item<IPost>
        name={['info', 'usage_status']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          defaultValue={currentForm.currentData?.info?.usage_status}
          onChange={(e) =>
            currentForm.setCurrentData?.({
              ...currentForm?.currentData,
              info: {
                ...currentForm.currentData?.info,
                usage_status: String(e),
              },
            })
          }
          data={selectData.usageStatusData}
          required
          label={'Tình trạng'}
        />
      </Form.Item>

      <Flex gap={10}>
        <Form.Item<IPost>
          name={['info', 'guarantee']}
          className="w-1/2"
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.guaranteeData}
            defaultValue={currentForm.currentData?.info?.guarantee}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  guarantee: String(e),
                },
              })
            }
            label={'Bảo Hành'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'wattage']}
          className="w-1/2"
          rules={[{ required: true }]}
        >
          <SelectCustom
            data={selectData.fridgeWattageData}
            defaultValue={currentForm.currentData?.info?.wattage}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  wattage: String(e),
                },
              })
            }
            label={'Công suất'}
          />
        </Form.Item>
      </Flex>

      <Space>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
        <p>Tôi muốn cho tặng miễn phí</p>
      </Space>

      {!checked && (
        <Form.Item<IPost>
          name={['info', 'price']}
          className="w-1/2"
          rules={[{ required: true }]}
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
      )}

      <p className={titleClassName}>Tiêu đề và mô tả chi tiết</p>
      <Form.Item<IPost>
        name={['info', 'title']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <InputCustom
          defaultValue={currentForm.currentData?.info?.title}
          // onChange={(e) => setTitle(e || '')}
          label={'Tiêu đề tin đăng'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['info', 'detailed_description']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <TextAreaCustom
          defaultValue={currentForm.currentData?.description}
          // onChange={(e) => setDetailedDescription(e as string)}
          label="Mô tả chi tiết"
        />
      </Form.Item>
      <p className={titleClassName}>Thông tin người bán</p>
      <Form.Item<IPost>
        name={['info', 'seller_information']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          defaultValue={currentForm.currentData?.info?.seller_information}
          label="Bạn là"
          // onChange={(e) => setSellerInformation(e as number)}
          data={selectData.sellerInformationData}
        />
      </Form.Item>
      <Form.Item
        name={['info', 'address']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <ModalLocationSelectCustom
          defaultValue={currentForm.currentLabel}
          // onChangeLabel={(e) => setDefaultLabel(e || '')}
          // onChange={(location, address) => {
          //   setLocationId((location as number) || 0);
          //   setAddressId((address as number) || 0);
          // }}
          label={'Địa chỉ'}
        />
      </Form.Item>
    </Flex>
  );
}
