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
export default function CreatePostElectronicDeviceForm(props: Props) {
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
          // onChange={(e) => setUsageStatus(e || '')}
          data={selectData.usageStatusData}
          required
          label={'Tình trạng'}
        />
      </Form.Item>

      <div className="grid grid-cols-2 gap-3">
        <Form.Item<IPost>
          name={['info', 'title']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.colorData}
            defaultValue={currentForm.currentData?.info?.color}
            // onChange={(e) => setColor(e || '')}
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
            // onChange={(e) => setRam(e || '')}
            label={'RAM'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'hardDrive']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={[]}
            defaultValue={currentForm.currentData?.info?.hardDrive}
            // onChange={(e) => setHardDrive(e || '')}
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
            // onChange={(e) => setHardDrive(e || '')}
            label={'Card màn hình'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'screenSize']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.laptopScreenSizeData}
            defaultValue={currentForm.currentData?.info?.screenSize}
            // onChange={(e) => setScreenSize(e || '')}
            label={'Kích cỡ màn hình'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'color']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.colorData}
            defaultValue={currentForm.currentData?.info?.color}
            // onChange={(e) => setColor(e || '')}
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
            // onChange={(e) => setGuarantee(e || '')}
            label={'Bảo hành'}
          />
        </Form.Item>
      </div>

      {/* <Flex gap={10}></Flex>
      <Flex gap={10}></Flex>
      <Flex gap={10} className="w-1/2"></Flex> */}
      <Space>
        {/* <Checkbox checked={checked} onChange={() => setChecked(!checked)} /> */}
        <p>Tôi muốn cho tặng miễn phí</p>
      </Space>

      {!checked && (
        <Form.Item<IPost>
          name={['info', 'price']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.info?.price}
            type="number"
            // onChange={(e) => setPrice(e || '')}
            label={'Giá'}
          />
        </Form.Item>
      )}

      <p className={titleClassName}>Tiêu đề và mô tả chi tiết</p>
      <Form.Item<IPost>
        name={'name'}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <InputCustom
          defaultValue={currentForm.currentData?.info?.title}
          // onChange={(e) => setTitle(e || '')}
          label={'Tiêu đề tin đăng'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={'description'}
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
          label={'Địa chỉ'}
        />
      </Form.Item>
    </Flex>
  );
}
