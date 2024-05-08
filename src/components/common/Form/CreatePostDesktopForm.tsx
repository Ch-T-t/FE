import { Flex, Form, Space } from 'antd';
import { useContext, useState } from 'react';
import InputCustom from '../InputCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import SelectCustom from '../SelectCustom';
import TextAreaCustom from '../TextAreaCustom';

import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import selectData from '@/services/selectData';
import { IElectroDevice, IPost } from '@/types/Job';
import HorizontalSelect from '../HorizontalSelect';

interface Props {
  edit?: boolean;
  data?: IElectroDevice;
}
export default function CreatePostDesktopForm(props: Props) {
  const currentForm = useContext(CurrentFormContext);
  const [checked, setChecked] = useState<boolean>();
  const titleClassName = 'pt-[20px] text-[20px] font-semibold';
  return (
    <Flex vertical gap={20}>
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

      <div className="grid grid-cols-2 gap-3">
        <Form.Item<IPost>
          name={['info', 'color']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.colorData}
            defaultValue={currentForm.currentData?.info?.color}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  color: String(e),
                },
              })
            }
            label={'Màu sắc'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'ram']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.laptopRamData}
            defaultValue={currentForm.currentData?.info?.ram}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  ram: String(e),
                },
              })
            }
            label={'RAM'}
          />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Form.Item<IPost>
          name={['info', 'hardDrive']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={[]}
            defaultValue={currentForm.currentData?.info?.hardDrive}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  hardDrive: String(e),
                },
              })
            }
            label={'Ổ cứng'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'monitorCard']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.laptopCardData}
            defaultValue={currentForm.currentData?.info?.monitorCard}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  monitorCard: String(e),
                },
              })
            }
            label={'Card màn hình'}
          />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Form.Item<IPost>
          name={['info', 'screenSize']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.laptopScreenSizeData}
            defaultValue={currentForm.currentData?.info?.screenSize}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  screenSize: String(e),
                },
              })
            }
            label={'Kích cỡ màn hình'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'color']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.colorData}
            defaultValue={currentForm.currentData?.info?.capacity}
            onChange={(e) =>
              currentForm.setCurrentData?.({
                ...currentForm?.currentData,
                info: {
                  ...currentForm.currentData?.info,
                  capacity: String(e),
                },
              })
            }
            label={'Màu sắc'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'guarantee']}
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
            label={'Bảo hành'}
          />
        </Form.Item>
      </div>
      {/* <div className="grid grid-cols-2 gap-3">
      </div> */}
      <Space>
        {/* <Checkbox checked={checked} onChange={() => setChecked(!checked)} /> */}
        <p>Tôi muốn cho tặng miễn phí</p>
      </Space>

      {!checked && (
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
      )}

      <p className={titleClassName}>Tiêu đề và mô tả chi tiết</p>
      <Form.Item
        name={'title'}
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
      <Form.Item
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
      <p className={titleClassName}>Thông tin người bán</p>
      <Form.Item
        name={'sellerInformation'}
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
      <ModalLocationSelectCustom
        // defaultValue={defaultLabel}
        // onChangeLabel={(e) => setDefaultLabel(e || '')}
        // onChange={(location, address) => {
        //   setLocationId((location as number) || 0);
        //   setAddressId((address as number) || 0);
        // }}
        onChange={(e) =>
          currentForm.setCurrentData?.({
            ...currentForm?.currentData,
            info: {
              ...currentForm.currentData?.info,
              address: String(e),
            },
          })
        }
        label={'Địa chỉ'}
      />
    </Flex>
  );
}
