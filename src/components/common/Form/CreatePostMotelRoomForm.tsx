import React, { useContext, useEffect, useState } from 'react';
import SelectCustom from '../SelectCustom';
import {
  Flex,
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
import { IGoodHousePost, IJob, IJobPostCreate } from '@/types/Job';
import getBase64, { FileType } from '@/services/getBase64';
import { fetchCreateWorkPost } from '@/api/jobRequest';
import Link from 'next/link';
import { InboxOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  fetchCreateGoodHousePost,
  fetchInteriorConditionList,
  fetchSellerInformationList,
  fetchUpdateGoodHousePost,
} from '@/api/goodHouseRequest';
import PreviewProduct from '../PreviewProduct';
import getParentUrl from '@/services/getUrl';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import { RcFile } from 'antd/es/upload';

interface Props {
  edit?: boolean;
  data?: IGoodHousePost;
}
export default function CreatePostMotelRoomForm(props: Props) {
  const currentForm = useContext(CurrentFormContext);

  const [mapValue, setMapValue] = useState(props.data?.Map || '');
  const [locationId, setLocationId] = useState<number | string>(
    props.data?.Location.id || ''
  );
  const [addressId, setAddressId] = useState<number | string>(
    props.data?.Address.id || ''
  );
  const [categoryId, setCategoryId] = useState<number | string>(
    props.data?.Category.id || currentForm.currentCategoryId || ''
  );
  const [interiorConditionList, setInteriorConditionList] = useState<IJob[]>(
    []
  );
  const [sellerInformationList, setSellerInformationList] = useState<IJob[]>(
    []
  );
  const [acreage, setAcreage] = useState<number | string>(
    props.data?.Acreage || ''
  );
  const [priceValue, setPriceValue] = useState<number | string>(
    props.data?.Price || ''
  );
  const [depositAmount, setDepositAmount] = useState<number | string>(
    props.data?.Deposit_amount || ''
  );
  const [interiorCondition, setInteriorCondition] = useState<number | string>(
    ''
  );
  const [title, setTitle] = useState<number | string>(props.data?.Title || '');
  const [sellerInformation, setSellerInformation] = useState<number | string>(
    props.data?.Seller_information.id || ''
  );
  const [numberBedrooms, setNumberBedrooms] = useState<number>(
    props.data?.Number_of_bedrooms || 0
  );
  const [numberBathrooms, setNumberBathrooms] = useState<number>(
    props.data?.Number_of_bathrooms || 0
  );
  const [detailedDescription, setDetailedDescription] = useState<string>('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState<string | number>(
    props.data?.Contact_phone_number || ''
  );
  const [url, setUrl] = useState(props.data?.Url);
  const [defaultLabel, setDefaultLabel] = useState<number | string>(
    currentForm.currentLabelAdress || ''
  );

  const [preview, setPreview] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(
    props.data?.images_A2.map((item, index) => ({
      uid: `-${item.id}`,
      name: `image${item.id}.jpg`,
      status: 'done',
      url: item.Image,
      originFileObj: new File([item.Image], 'image.jpg', {
        type: 'image/jpg',
      }) as RcFile,
    })) || []
  );
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    fetchInteriorConditionList().then((res) =>
      setInteriorConditionList(res.data.data || [])
    );
    fetchSellerInformationList().then((res) =>
      setSellerInformationList(res.data.data || [])
    );
    // fetchExperienceList().then((res) => setExperienceList(res.data.data || []));
    // fetchPayFormsList().then((res) => setPayFormsList(res.data.data || []));
    // fetchWorkTypeList().then((res) => setWorkTypeList(res.data.data || []));
  }, []);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview: (file: UploadFile) => Promise<void> = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name ||
        (file.url ? file.url.substring(file.url.lastIndexOf('/') + 1) : '')
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const newList: UploadFile<any>[] = newFileList.map((item) => ({
      ...item,
      status: 'done',
    }));
    setFileList(newList);
  };
  const handleChangeVideo: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    const newList: UploadFile<any>[] = newFileList.map((item) => ({
      ...item,
      status: 'done',
    }));
    setVideoFileList(newList);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    addressId && formData.append('Address', addressId as string);
    locationId && formData.append('Location', locationId as string);
    acreage && formData.append('Acreage', acreage as string);
    categoryId && formData.append('Category', categoryId as string);
    interiorCondition &&
      formData.append('Interior_condition', interiorCondition as string);
    priceValue && formData.append('Price', priceValue as string);
    sellerInformation &&
      formData.append('Seller_information', sellerInformation as string);
    title && formData.append('Title', title as string);
    formData.append('Url', getParentUrl.GoodHouse);
    for (let index = 0; index < fileList.length; index++) {
      formData.append('images_A2_data', fileList[index]?.originFileObj as Blob);
    }
    formData.append('Video', videoFileList[0]?.originFileObj as Blob);

    if (!props.edit)
      await fetchCreateGoodHousePost(formData)
        .then((res) =>
          notification.success({
            message: 'Đã tạo',
            description: 'Đã tạo bài đăng',
          })
        )
        .catch((err) =>
          notification.error({
            message: 'Lỗi',
            description: 'Tạo bài đăng thất bại',
          })
        );
    else
      await fetchUpdateGoodHousePost(formData, props.data?.id || '')
        .then((res) =>
          notification.success({
            message: 'Đã tạo',
            description: 'Đã tạo bài đăng',
          })
        )
        .catch((err) =>
          notification.error({
            message: 'Lỗi',
            description: 'Tạo bài đăng thất bại',
          })
        );
  };
  const titleClassName = 'pt-[20px] text-[20px] font-semibold';
  return preview ? (
    <PreviewProduct onCancel={() => setPreview(false)} />
  ) : (
    <div className="w-full flex gap-x-5">
      <div className="flex-1">
        <b>Ảnh / video sản phẩm</b>
        <Space className="flex text-[#9b9b9b] text-[13px]">
          Xem thêm về
          <Link href="/">
            <p className="text-blue-500 underline text-wrap">
              Quy định đăng tin của chợ tốt
            </p>
          </Link>
        </Space>
        <div className="w-[300px] min-h-[200px] flex items-center justify-center">
          <Dragger
            className="truncate w-full"
            name="images_A1_data"
            listType="picture"
            fileList={fileList}
            accept="image/*"
            onPreview={handlePreview}
            onChange={handleChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <Flex vertical justify="center">
              <p className="ant-upload-text !text-[14px]">
                Hình ảnh có kích thước tối thiệu{' '}
              </p>
              <p className="ant-upload-text !text-[14px]">240 x 240</p>
            </Flex>
          </Dragger>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <Image alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <div className="w-[300px] min-h-[200px] py-[20px] flex items-center justify-center">
          <Dragger
            className="truncate w-full"
            name="Video"
            listType="picture"
            fileList={videoFileList}
            maxCount={1}
            accept="video/*"
            // onPreview={handlePreview}
            onChange={handleChangeVideo}
          >
            <p className="ant-upload-drag-icon">
              <VideoCameraOutlined />
            </p>
            <p className="ant-upload-text !text-[14px]">Đăng tối đa 1 video </p>
          </Dragger>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <Image alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </div>
      <div className="flex-[2_2_0%]">
        <ModalCategorySelectCustom
          onChange={(e) => setCategoryId(e as number)}
          label="Danh mục tin đăng"
        />
        <Flex vertical gap={20}>
          <p className={titleClassName}>Địa chỉ</p>
          <ModalLocationSelectCustom
            onChange={(location, address) => {
              setLocationId((location as number) || 0);
              setAddressId((address as number) || 0);
            }}
            label={'Địa chỉ'}
          />
          <p className={titleClassName}>Diện tích & Giá</p>
          <Flex gap={10}>
            <InputCustom
              defaultValue={acreage}
              onChange={(e) => setAcreage(e || '')}
              label={'Diện tích'}
            />
            <InputCustom
              defaultValue={priceValue}
              type="number"
              onChange={(e) => setPriceValue(e || '')}
              label={'Giá'}
            />
          </Flex>
          <p className={titleClassName}>Thông tin khác</p>
          <Flex gap={10}>
            <InputCustom
              defaultValue={depositAmount}
              onChange={(e) => setDepositAmount(e || '')}
              label={'Số tiền cọc'}
            />
            <SelectCustom
              defaultValue={interiorCondition}
              onChange={(e) => setInteriorCondition(e || '')}
              label={'Tình trạng nội thất'}
              data={interiorConditionList}
            />
          </Flex>
          <p className={titleClassName}>Tiêu đề và mô tả chi tiết</p>
          <InputCustom
            defaultValue={title}
            onChange={(e) => setTitle(e || '')}
            label={'Tiêu đề tin đăng'}
          />
          <TextAreaCustom
            defaultValue={detailedDescription}
            onChange={(e) => setDetailedDescription(e as string)}
            label="Mô tả chi tiết"
          />
          <p className={titleClassName}>Thông tin người đăng</p>
          <HorizontalSelect
            defaultValue={sellerInformation}
            label="Thông tin người bán"
            onChange={(e) => setSellerInformation(e as number)}
            data={[
              { id: 1, Name: 'Cá nhân' },
              { id: 2, Name: 'Môi giới' },
            ]}
          />
        </Flex>
        <Flex gap={20} className="my-[20px]">
          <button
            onClick={() => setPreview(true)}
            className="flex-1 py-[10px] rounded-lg border text-[#da7502] border-[#da7502]  hover:bg-[#ffe9c2]"
          >
            Xem trước
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 py-[10px] rounded-lg border text-white bg-[#da7502] border-[#da7502] hover:text-white hover:bg-[#da6702]"
          >
            Đăng tin
          </button>
        </Flex>
      </div>
    </div>
  );
}
