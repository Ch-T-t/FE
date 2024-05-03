import { Flex, Form } from 'antd';
import { useContext, useState } from 'react';
import InputCustom from '../InputCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import TextAreaCustom from '../TextAreaCustom';

import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import selectData from '@/services/selectData';
import { IPost, IVehicle } from '@/types/Job';
import HorizontalSelect from '../HorizontalSelect';
import SelectCustom from '../SelectCustom';

interface Props {
  edit?: boolean;
  data?: IVehicle;
}
export default function CreatePostCarForm(props: Props) {
  const currentForm = useContext(CurrentFormContext);
  const [checked, setChecked] = useState<boolean>();
  const titleClassName = 'pt-[20px] text-[20px] font-semibold';
  return (
    <Flex vertical gap={15}>
      <p className={titleClassName}>Thông tin chi tiết</p>
      <Flex gap={10}>
        <Form.Item<IPost>
          name={['infor', 'company']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            defaultValue={currentForm.currentData?.infor?.company}
            data={selectData.carCompanyData}
            //  // onChange={(e) => setCompany(e || '')}
            label={'Hãng'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['infor', 'year_produce']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            defaultValue={currentForm.currentData?.infor?.year_produce}
            data={selectData.yearData}
            // // onChange={(e) => setYearManufacture(e || '')}
            label={'Năm sản xuất'}
          />
        </Form.Item>
      </Flex>
      <Form.Item<IPost>
        name={['infor', 'carGear']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          //// onChange={(e) => setGearBox(e || '')}
          data={selectData.carGearData}
          label={'Hộp sô'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['infor', 'carFuel']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          // onChange={(e) => setFuel(e || '')}
          data={selectData.carFuelData}
          label={'Nhiên liệu'}
        />
      </Form.Item>
      <Flex gap={10}>
        <Form.Item<IPost>
          name={['infor', 'guarantee']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            defaultValue={currentForm.currentData?.infor?.guarantee}
            data={selectData.guaranteeData}
            // onChange={(e) => setGuarantee(e || '')}
            label={'Bảo hành'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['infor', 'seatNumber']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.infor?.seatNumber}
            type="number"
            // onChange={(e) => setSeatNumber(e || '')}
            label={'Số chỗ'}
          />
        </Form.Item>
      </Flex>
      <Form.Item<IPost>
        name={['infor', 'usage_status']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          data={selectData.usageStatusData}
          label={'Tình trạng sử dụng'}
        />
      </Form.Item>
      <Flex gap={10}>
        <Form.Item<IPost>
          name={['infor', 'walked']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.infor?.walked}
            // onChange={(e) => setWalked(e || '')}
            label={'Số km đã đi'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={'name'}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            defaultValue={currentForm.currentData?.infor?.price}
            type="number"
            // onChange={(e) => setPrice(e || '')}
            label={'Giá'}
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
      <p className={titleClassName}>Thông tin người bán</p>
      <Form.Item<IPost>
        name={['infor', 'seller_information']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          defaultValue={currentForm.currentData?.infor?.seller_information}
          label="Bạn là"
          // onChange={(e) => setSellerInformation(e as number)}
          data={selectData.sellerInformationData}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['infor', 'address']}
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
