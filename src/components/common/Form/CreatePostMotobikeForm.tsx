import React, { useContext, useEffect, useState } from 'react';
import SelectCustom from '../SelectCustom';
import {
  Checkbox,
  Flex,
  Form,
  Image,
  Modal,
  Space,
  UploadFile,
  UploadProps,
  notification,
} from 'antd';
import InputCustom from '../InputCustom';
import TextAreaCustom from '../TextAreaCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';

import HorizontalSelect from '../HorizontalSelect';
import ModalCategorySelectCustom from '../ModalCategorySelectCustom';
import Dragger from 'antd/es/upload/Dragger';
import { IJob, IJobPostCreate, IPost, IVehicle } from '@/types/Job';
import getBase64, { FileType } from '@/services/getBase64';
import { fetchCreateWorkPost } from '@/api/jobRequest';
import Link from 'next/link';
import { InboxOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  fetchCreateGoodHousePost,
  fetchInteriorConditionList,
  fetchSellerInformationList,
} from '@/api/goodHouseRequest';
import PreviewProduct from '../PreviewProduct';
import {
  fetchCreateVehiclePost,
  fetchUpdateVehiclePost,
  fetchVehicleCapacitiesList,
  fetchVehicleCompaniesList,
  fetchVehicleFuelsList,
  fetchVehicleGearboxesList,
  fetchVehicleGuaranteeList,
  fetchVehicleSeatNumbersList,
  fetchVehicleSellerInformationList,
  fetchVehicleUsageStatusList,
  fetchVehicleYearsOfManufactureList,
} from '@/api/vehicleRequest';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import getParentUrl from '@/services/getUrl';
import { RcFile } from 'antd/es/upload';
import {
  convertImageToUploadFile,
  convertVideoToUploadFile,
} from '@/services/fetchImage';
import selectData from '@/services/selectData';

interface Props {
  edit?: boolean;
  data?: IVehicle;
}
export default function CreatePostMotobikeForm(props: Props) {
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
          <SelectCustom
            data={selectData.motoCompanyData}
            defaultValue={currentForm.currentData?.info?.company}
            // onChange={(e) => setCompany(e || '')}
            label={'Hãng'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['info', 'year_produce']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={selectData.yearData}
            defaultValue={currentForm.currentData?.info?.year_produce}
            // onChange={(e) => setYearManufacture(e || '')}
            label={'Năm sản xuất'}
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
        <Form.Item<IPost>
          name={['info', 'capacity']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <SelectCustom
            data={[]}
            defaultValue={currentForm.currentData?.info?.capacity}
            // onChange={(e) => setCapacity(e || '')}
            label={'Dung tích xe'}
          />
        </Form.Item>
      </div>
      <Form.Item<IPost>
        name={['info', 'usage_status']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <HorizontalSelect
          // onChange={(e) => setUsageStatus(e || '')}
          data={selectData.usageStatusData}
          defaultValue={currentForm.currentData?.info?.usage_status}
          label={'Tình trạng'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['info', 'walked']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <InputCustom
          defaultValue={currentForm.currentData?.info?.walked}
          // onChange={(e) => setWalked(e || '')}
          label={'Số km đã đi'}
        />
      </Form.Item>
      <Space>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
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
