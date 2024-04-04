import { Flex } from 'antd';
import { useContext, useState } from 'react';
import InputCustom from '../InputCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import TextAreaCustom from '../TextAreaCustom';

import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import selectData from '@/services/selectData';
import { IVehicle } from '@/types/Job';
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
    <Flex vertical gap={20}>
      <p className={titleClassName}>Thông tin chi tiết</p>
      <Flex gap={10}>
        <SelectCustom
          defaultValue={currentForm.currentData?.infor?.company}
          data={selectData.carCompanyData}
          //  // onChange={(e) => setCompany(e || '')}
          label={'Hãng'}
        />
        <SelectCustom
          defaultValue={currentForm.currentData?.infor?.year_produce}
          data={selectData.yearData}
          // // onChange={(e) => setYearManufacture(e || '')}
          label={'Năm sản xuất'}
        />
      </Flex>
      <HorizontalSelect
        //// onChange={(e) => setGearBox(e || '')}
        data={selectData.carGearData}
        label={'Hộp sô'}
      />
      <HorizontalSelect
        // onChange={(e) => setFuel(e || '')}
        data={selectData.carFuelData}
        label={'Nhiên liệu'}
      />
      <Flex gap={10}>
        <SelectCustom
          defaultValue={currentForm.currentData?.infor?.guarantee}
          data={selectData.guaranteeData}
          // onChange={(e) => setGuarantee(e || '')}
          label={'Bảo hành'}
        />
        <InputCustom
          defaultValue={currentForm.currentData?.infor?.seatNumber}
          type="number"
          // onChange={(e) => setSeatNumber(e || '')}
          label={'Số chỗ'}
        />
      </Flex>
      <HorizontalSelect
        data={selectData.usageStatusData}
        label={'Tình trạng sử dụng'}
      />
      <Flex gap={10}>
        <InputCustom
          defaultValue={currentForm.currentData?.infor?.walked}
          // onChange={(e) => setWalked(e || '')}
          label={'Số km đã đi'}
        />
        <InputCustom
          defaultValue={currentForm.currentData?.infor?.price}
          type="number"
          // onChange={(e) => setPrice(e || '')}
          label={'Giá'}
        />
      </Flex>

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
      <p className={titleClassName}>Thông tin người bán</p>
      <HorizontalSelect
        defaultValue={currentForm.currentData?.infor?.seller_information}
        label="Bạn là"
        // onChange={(e) => setSellerInformation(e as number)}
        data={selectData.sellerInformationData}
      />
      <ModalLocationSelectCustom
        // defaultValue={defaultLabel}
        // onChangeLabel={(e) => setDefaultLabel(e || '')}
        // onChange={(location, address) => {
        //   setLocationId((location as number) || 0);
        //   setAddressId((address as number) || 0);
        // }}
        label={'Địa chỉ'}
      />
    </Flex>
  );
}
