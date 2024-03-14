import {
  Checkbox,
  Flex,
  Image,
  Modal,
  Space,
  UploadFile,
  UploadProps,
  notification,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import InputCustom from '../InputCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import SelectCustom from '../SelectCustom';
import TextAreaCustom from '../TextAreaCustom';

import {
  fetchCreateFridgePost,
  fetchRefrigeratorGuaranteeList,
  fetchRefrigeratorSellerInformationList,
  fetchRefrigeratorUsageStatusList,
  fetchRefrigeratorVolumeList,
  fetchRefrigeratorWashingVolumeList,
  fetchRefrigeratorWattageList,
  fetchUpdateFridgePost,
} from '@/api/fridgeRequest';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import getBase64, { FileType } from '@/services/getBase64';
import { IJob, IRefrigeratorPost } from '@/types/Job';
import { InboxOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import Link from 'next/link';
import HorizontalSelect from '../HorizontalSelect';
import ModalCategorySelectCustom from '../ModalCategorySelectCustom';
import PreviewProduct from '../PreviewProduct';
import getParentUrl from '@/services/getUrl';
import { RcFile } from 'antd/es/upload';

interface Props {
  edit?: boolean;
  data?: IRefrigeratorPost;
}

export default function CreatePostAirConditionForm(props: Props) {
  const currentForm = useContext(CurrentFormContext);

  const [mapValue, setMapValue] = useState('');
  const [locationId, setLocationId] = useState<number | string>(
    props.data?.Location.id || ''
  );
  const [addressId, setAddressId] = useState<number | string>(
    props.data?.Address.id || ''
  );
  const [categoryId, setCategoryId] = useState<number | string>(
    currentForm.currentCategoryId || ''
  );
  const [sellerInformationList, setSellerInformationList] = useState<IJob[]>(
    []
  );
  const [guaranteeList, setGuaranteeList] = useState([]);
  const [refrigeratorGuaranteeList, setRefrigeratorGuaranteeList] = useState(
    []
  );
  const [usageStatusList, setUsageStatusList] = useState([]);
  const [volumeList, setVolumeList] = useState([]);
  const [washingVolumeList, setWashingVolumeList] = useState([]);
  const [wattageList, setWattageList] = useState([]);

  const [title, setTitle] = useState<number | string>('');
  const [sellerInformation, setSellerInformation] = useState<number | string>(
    ''
  );
  const [detailedDescription, setDetailedDescription] = useState<string>(
    props.data?.Detailed_description || ''
  );
  const [usageStatus, setUsageStatus] = useState<number | string>(
    props.data?.Usage_status?.id || ''
  );
  const [guarantee, setGuarantee] = useState<number | string>(
    props.data?.Guarantee?.id || ''
  );
  const [map, setMap] = useState<number | string>(props.data?.Map || '');
  const [freeGiveAway, setFreeGiveAway] = useState<number | string>(
    props.data?.Free_giveaway || ''
  );
  const [price, setPrice] = useState<number | string>(props.data?.Price || '');
  const [volume, setVolume] = useState<number | string>(
    props.data?.Volume?.id || ''
  );
  const [wattage, setWattage] = useState<number | string>(
    props.data?.Wattage?.id || ''
  );
  const [washingVolume, setWashingVolume] = useState<number | string>(
    props.data?.Washing_volume?.id || ''
  );

  const [checked, setChecked] = useState<boolean>();
  const [contactPhoneNumber, setContactPhoneNumber] = useState<number | string>(
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
    props.data?.images_A3.map((item) => ({
      uid: `-${item.id}`,
      name: `image${item.id}.jpg`,
      status: 'done',
      url: item.Image,
    })) || []
  );
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    fetchRefrigeratorGuaranteeList().then((res) =>
      setGuaranteeList(res.data.data || [])
    );
    fetchRefrigeratorSellerInformationList().then((res) =>
      setSellerInformationList(res.data.data || [])
    );
    fetchRefrigeratorUsageStatusList().then((res) =>
      setUsageStatusList(res.data.data || [])
    );
    fetchRefrigeratorVolumeList().then((res) =>
      setVolumeList(res.data.data || [])
    );
    fetchRefrigeratorWashingVolumeList().then((res) =>
      setWashingVolumeList(res.data.data || [])
    );
    fetchRefrigeratorWattageList().then((res) =>
      setWattageList(res.data.data || [])
    );
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
    categoryId && formData.append('Category', categoryId as string);
    usageStatus && formData.append('Usage_status', usageStatus as string);
    sellerInformation &&
      formData.append('Seller_information', sellerInformation as string);
    guarantee && formData.append('Guarantee', guarantee as string);
    volume && formData.append('Volume', volume as string);
    wattage && formData.append('Wattage', wattage as string);
    washingVolume && formData.append('Washing_volume', washingVolume as string);
    freeGiveAway && formData.append('Free_giveaway', freeGiveAway as string);
    map && formData.append('Map', map as string);
    price && !checked && formData.append('Price', price as string);
    title && formData.append('Title', title as string);
    detailedDescription &&
      formData.append('Detailed_description', detailedDescription as string);
    contactPhoneNumber &&
      formData.append('Contact_phone_number', contactPhoneNumber as string);
    formData.append('Url', getParentUrl.Fridge);
    for (let index = 0; index < fileList.length; index++) {
      formData.append('images_A3_data', fileList[index]?.originFileObj as Blob);
    }
    formData.append('Video', videoFileList[0]?.originFileObj as Blob);
    if (!props.edit) {
      await fetchUpdateFridgePost(formData, props.data?.id || '')
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
    } else {
      await fetchCreateFridgePost(formData)
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
    }
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
          <p className={titleClassName}>Thông tin chi tiết</p>
          <HorizontalSelect
            defaultValue={usageStatus}
            onChange={(e) => setUsageStatus(e || '')}
            data={usageStatusList}
            required
            label={'Tình trạng'}
          />
          <Flex gap={10}>
            <SelectCustom
              data={guaranteeList}
              defaultValue={guarantee}
              onChange={(e) => setGuarantee(e || '')}
              label={'Bảo Hành'}
            />
            <SelectCustom
              data={wattageList}
              defaultValue={wattage}
              onChange={(e) => setWattage(e || '')}
              label={'Công suất'}
            />
          </Flex>

          <Space>
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
            <p>Tôi muốn cho tặng miễn phí</p>
          </Space>

          {!checked && (
            <InputCustom
              defaultValue={price}
              type="number"
              onChange={(e) => setPrice(e || '')}
              label={'Giá'}
            />
          )}

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
          <p className={titleClassName}>Thông tin người bán</p>
          <HorizontalSelect
            defaultValue={sellerInformation}
            label="Bạn là"
            onChange={(e) => setSellerInformation(e as number)}
            data={sellerInformationList}
          />
          <ModalLocationSelectCustom
            defaultValue={defaultLabel}
            onChangeLabel={(e) => setDefaultLabel(e || '')}
            onChange={(location, address) => {
              setLocationId((location as number) || 0);
              setAddressId((address as number) || 0);
            }}
            label={'Địa chỉ'}
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
