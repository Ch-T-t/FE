import { Flex, Form } from 'antd';
import { useContext, useState } from 'react';
import InputCustom from '../InputCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import SelectCustom from '../SelectCustom';
import TextAreaCustom from '../TextAreaCustom';

import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import selectData from '@/services/selectData';
import { IGoodHousePost, IPost } from '@/types/Job';
import HorizontalSelect from '../HorizontalSelect';

interface Props {
  edit?: boolean;
  data?: IGoodHousePost;
}
export default function CreatePostMotelRoomForm(props: Props) {
  const currentForm = useContext(CurrentFormContext);
  const [checked, setChecked] = useState<boolean>();
  const titleClassName = 'pt-[20px] text-[20px] font-semibold';
  return (
    <Flex vertical gap={20}>
      <p className={titleClassName}>Địa chỉ</p>
      <Form.Item<IPost>
        name={['infor', 'address']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <ModalLocationSelectCustom
          // onChange={(location, address) => {
          //   setLocationId((location as number) || 0);
          //   setAddressId((address as number) || 0);
          // }}
          label={'Địa chỉ'}
        />
      </Form.Item>
      <p className={titleClassName}>Diện tích & Giá</p>
      <Flex gap={10}>
        <Form.Item<IPost>
          name={['infor', 'acreage']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.infor?.acreage}
            // onChange={(e) => setAcreage(e || '')}
            label={'Diện tích'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['infor', 'price']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.infor?.price}
            type="number"
            // onChange={(e) => setPriceValue(e || '')}
            label={'Giá'}
          />
        </Form.Item>
      </Flex>
      <p className={titleClassName}>Thông tin khác</p>
      <Flex gap={10}>
        <Form.Item<IPost>
          name={['infor', 'depositAmount']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.infor?.depositAmount}
            // onChange={(e) => setDepositAmount(e || '')}
            label={'Số tiền cọc'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['infor', 'usage_status']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            defaultValue={currentForm.currentData?.infor?.usage_status}
            // onChange={(e) => setInteriorCondition(e || '')}
            label={'Tình trạng nội thất'}
            data={selectData.goodHouseUsageStatus}
          />
        </Form.Item>
      </Flex>
      <p className={titleClassName}>Tiêu đề và mô tả chi tiết</p>
      <Form.Item<IPost>
        name={'name'}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <InputCustom
          defaultValue={currentForm.currentData?.infor?.title}
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
      <p className={titleClassName}>Thông tin người đăng</p>
      <Form.Item<IPost>
        name={['infor', 'seller_information']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          defaultValue={currentForm.currentData?.infor?.seller_information}
          label="Thông tin người bán"
          // onChange={(e) => setSellerInformation(e as number)}
          data={[
            { id: 1, name: 'Cá nhân' },
            { id: 2, name: 'Môi giới' },
          ]}
        />
      </Form.Item>
    </Flex>
  );
}
