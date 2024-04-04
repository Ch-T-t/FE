import { Flex } from 'antd';
import { useContext, useState } from 'react';
import InputCustom from '../InputCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import TextAreaCustom from '../TextAreaCustom';

import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import selectData from '@/services/selectData';
import { IGoodHousePost } from '@/types/Job';
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
    <Flex vertical gap={20}>
      <p className={titleClassName}>Diện tích & Giá</p>
      <Flex gap={10}>
        <InputCustom
          defaultValue={currentForm.currentData?.infor?.acreage}
          // onChange={(e) => setAcreage(e || '')}
          label={'Diện tích'}
        />
        <InputCustom
          defaultValue={currentForm.currentData?.infor?.price}
          type="number"
          // onChange={(e) => setPriceValue(e || '')}
          label={'Giá'}
        />
      </Flex>
      <InputCustom
        className="!w-1/2"
        defaultValue={currentForm.currentData?.infor?.depositAmount}
        // onChange={(e) => setDepositAmount(e || '')}
        label={'Số tiền cọc'}
      />

      <p className={titleClassName}>Tiêu đề và mô tả chi tiết</p>
      <InputCustom
        defaultValue={currentForm.currentData?.infor?.title}
        // onChange={(e) => setTitle(e || '')}
        label={'Tiêu đề tin đăng'}
      />
      <TextAreaCustom
        defaultValue={currentForm.currentData?.description}
        // onChange={(e) => setDetailedDescription(e as string)}
        label="Mô tả chi tiết"
      />
      <p className={titleClassName}>Thông tin người đăng</p>
      <HorizontalSelect
        defaultValue={currentForm.currentData?.infor?.seller_information}
        label="Thông tin người bán"
        // onChange={(e) => setSellerInformation(e as number)}
        data={selectData.sellerInformationData}
      />
      <ModalLocationSelectCustom
        // onChange={(location, address) => {
        //   setLocationId((location as number) || 0);
        //   setAddressId((address as number) || 0);
        // }}
        // label={'Địa chỉ'}
        label=""
      />
    </Flex>
  );
}
