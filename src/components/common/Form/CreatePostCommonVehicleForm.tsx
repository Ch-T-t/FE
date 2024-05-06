import { Flex, Form } from 'antd';
import { useContext, useState } from 'react';
import InputCustom from '../InputCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import TextAreaCustom from '../TextAreaCustom';

import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import selectData from '@/services/selectData';
import { IPost, IVehicle } from '@/types/Job';
import HorizontalSelect from '../HorizontalSelect';

interface Props {
  edit?: boolean;
  data?: IVehicle;
}
export default function CreatePostCommonVehicleForm(props: Props) {
  const currentForm = useContext(CurrentFormContext);
  const [checked, setChecked] = useState<boolean>();
  const titleClassName = 'pt-[20px] text-[20px] font-semibold';
  return (
    <Flex vertical gap={20}>
      <p className={titleClassName}>Thông tin chi tiết</p>
      <div className="grid grid-cols-2 gap-3">
        <Form.Item<IPost>
          name={['info', 'company']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.info?.company}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  company: String(e),
                },
              })
            }
            label={'Hãng'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'year_produce']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.info?.year_produce}
            type="number"
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  year_produce: String(e),
                },
              })
            }
            label={'Năm sản xuất'}
          />
        </Form.Item>
      </div>
      <Form.Item<IPost>
        name={['info', 'carGear']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          onChange={(e) =>
            currentForm.setCurrentData?.({
              ...currentForm?.currentData,
              info: {
                ...currentForm.currentData?.info,
                carGear: String(e),
              },
            })
          }
          data={selectData.carGearData}
          label={'Hộp sô'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['info', 'carFuel']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          onChange={(e) =>
            currentForm.setCurrentData?.({
              ...currentForm?.currentData,
              info: {
                ...currentForm.currentData?.info,
                carFuel: String(e),
              },
            })
          }
          data={selectData.carFuelData}
          label={'Nhiên liệu'}
        />
      </Form.Item>
      <div className="grid grid-cols-2 gap-3">
        <Form.Item<IPost>
          name={['info', 'guarantee']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
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
            label={'Bảo hành'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'seatNumber']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.info?.seatNumber}
            type="number"
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  seatNumber: Number(e),
                },
              })
            }
            label={'Số chỗ'}
          />
        </Form.Item>
      </div>
      <Form.Item<IPost>
        name={['info', 'usage_status']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          data={selectData.usageStatusData}
          label={'Tình trạng sử dụng'}
        />
      </Form.Item>
      <div className="grid grid-cols-2 gap-3">
        <Form.Item<IPost>
          name={['info', 'walked']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.info?.walked}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  walked: Number(e),
                },
              })
            }
            label={'Số km đã đi'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'price']}
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
            })
          }
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
          // defaultValue={defaultLabel}
          // onChangeLabel={(e) => setDefaultLabel(e || '')}
          // onChange={(location, address) => {
          //   setLocationId((location as number) || 0);
          //   setAddressId((address as number) || 0);
          // }}
          onChange={(e) => {
            currentForm.setCurrentData?.({
              ...currentForm?.currentData,
              info: {
                ...currentForm.currentData?.info,
                address: String(e),
              },
            });
          }}
          label={'Địa chỉ'}
        />
      </Form.Item>
    </Flex>
  );
}
