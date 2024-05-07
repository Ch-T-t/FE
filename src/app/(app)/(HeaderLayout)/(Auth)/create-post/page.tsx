'use client';
import { fetchCreatePost } from '@/api/allRequest';
import instanceAxios from '@/api/instanceAxios';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import { useAppSelector } from '@/app/hooks';
import CreatePostAirConditionForm from '@/components/common/Form/CreatePostAirConditionForm';
import CreatePostBusinessPremisesForm from '@/components/common/Form/CreatePostBusinessPremisesForm';
import CreatePostCarForm from '@/components/common/Form/CreatePostCarForm';
import CreatePostDesktopForm from '@/components/common/Form/CreatePostDesktopForm';
import CreatePostElectronicDeviceForm from '@/components/common/Form/CreatePostElectronicDeviceForm';
import InputCustom from '@/components/common/InputCustom';
import ModalCategorySelectCustom from '@/components/common/ModalCategorySelectCustom';
import PreviewProduct from '@/components/common/PreviewProduct';
import getBase64, { FileType } from '@/services/getBase64';
import getFormByKey from '@/services/getFormByKey';
import { IPost } from '@/types/Job';
import { InboxOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Space,
  UploadFile,
  UploadProps,
  message,
  notification,
} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function CreatePostPage() {
  const currentForm = useContext(CurrentFormContext);
  const [categoryId, setCategoryId] = useState<string | number>();
  const user = useAppSelector((state) => state.user);
  const [preview, setPreview] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

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
  const handleCancel = () => setPreviewOpen(false);

  const fetchCreate = (e: IPost) => {
    const formData = new FormData();
    // currentForm.currentData?.name &&
    //   formData.append('name', currentForm.currentData?.name as string);
    // currentForm.currentData?.description &&
    //   formData.append(
    //     'description',
    //     currentForm.currentData?.description as string
    //   );
    // currentForm.currentData?.quantity &&
    //   formData.append('quantity', currentForm.currentData?.quantity as string);
    // currentForm.currentData?.shop &&
    //   formData.append('shop', currentForm.currentData?.shop as string);
    // currentForm.currentData?.item_category &&
    //   formData.append(
    //     'item_category',
    //     currentForm.currentData?.item_category as string
    //   );
    // for (const [key, value] of Object.entries(
    //   currentForm.currentData?.infor || {}
    // )) {
    //   if (value !== undefined && value !== null && value !== '') {
    //     formData.append(key, value.toString());
    //   }
    // }
    formData.append('info', JSON.stringify(e.info));
    currentForm.currentData?.item_category &&
      formData.append(
        'item_category',
        String(currentForm.currentData?.item_category)
      );
    currentForm.currentData?.category &&
      formData.append('category', String(currentForm.currentData?.category));
    formData.append('name', String(e.name));
    formData.append('description', String(e.description));
    formData.append('quantity', String(e.quantity || 0));
    currentForm.currentData?.shop && formData.append('shop', String(e.shop));
    currentForm.currentData?.brand && formData.append('brand', String(e.brand));
    formData.append('user', String(user.data.id));
    fileList.length > 0 &&
      formData.append('banner', fileList[0].originFileObj as Blob);
    // formData.append('video', String(currentForm.currentCategoryId));
    instanceAxios
      .post(`/api/products`, formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
      .then((res) => {
        message.success('Đã tạo bài đăng!');
        currentForm.setCurrentData?.({});
        currentForm.setCurrentForm?.('');
        currentForm.setCurrentLabel?.('');
        currentForm.setCurrentCategoryId?.('');
      })
      .catch((err) => console.log(e));
  };

  return (
    <div className="w-4/5 max-lg:w-full flex flex-col gap-y-5 py-[20px] px-[30px] max-lg:px-[15px] m-auto bg-white mt-[20px] rounded-lg">
      <Form
        form={form}
        validateMessages={{
          required: 'Vui lòng nhập đầy đủ',
        }}
        scrollToFirstError
        onFinishFailed={(e) => {
          console.log(e);
          notification.error({
            message: 'Thông báo',
            description: 'Vui lòng nhập đầy đủ!',
          });
        }}
        onFinish={fetchCreate}
      >
        {preview ? (
          <PreviewProduct onCancel={() => setPreview(false)} />
        ) : (
          <>
            <div className="w-full flex gap-x-10 max-lg:flex-col">
              <ModalCategorySelectCustom
                className="hidden max-lg:block mb-[20px]"
                // onChangeKey={(e) => currentForm.setCurrentForm?.(e)}
                label="Danh mục tin đăng"
              />
              {currentForm.currentForm && (
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
                  <div className="w-[300px] max-lg:w-full min-h-[200px] flex items-center justify-center">
                    {/* <Form.Item<IPost>
                    name={`images`}
                    rules={[
                      { required: true, message: 'Trường này bắt buộc!' },
                    ]}
                    className="w-full"
                  > */}
                    <Dragger
                      className="truncate w-full"
                      name="images_A1_data"
                      listType="picture"
                      fileList={fileList}
                      accept="image/*"
                      maxCount={5}
                      // onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <Flex vertical justify="center">
                        <p className="ant-upload-text !text-[14px]">
                          Hình ảnh có kích thước tối thiệu{' '}
                        </p>
                        <p className="ant-upload-text !text-[14px]">
                          240 x 240
                        </p>
                      </Flex>
                    </Dragger>
                    {/* </Form.Item> */}
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <Image
                        alt="example"
                        style={{ width: '100%' }}
                        src={previewImage}
                      />
                    </Modal>
                  </div>
                  <div className="w-[300px] max-lg:w-full min-h-[200px] py-[20px] flex items-center justify-center">
                    {/* <Form.Item<IPost>
                    className="w-full"
                    name={`video`}
                    rules={[
                      { required: true, message: 'Trường này bắt buộc!' },
                    ]}
                  > */}
                    <Dragger
                      className="truncate w-full"
                      name="video"
                      listType="picture"
                      fileList={videoFileList}
                      maxCount={1}
                      accept="video/*"
                      onChange={handleChangeVideo}
                    >
                      <p className="ant-upload-drag-icon">
                        <VideoCameraOutlined />
                      </p>
                      <p className="ant-upload-text !text-[14px]">
                        Đăng tối đa 1 video{' '}
                      </p>
                    </Dragger>
                    {/* </Form.Item> */}
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <Image
                        alt="example"
                        style={{ width: '100%' }}
                        src={previewImage}
                      />
                    </Modal>
                  </div>
                </div>
              )}
              <div className="flex-[3_2_0%]">
                <ModalCategorySelectCustom
                  className="max-lg:hidden mb-[10px]"
                  // onChangeKey={(e) => currentForm.setCurrentForm?.(e)}
                  label="Danh mục tin đăng"
                />
                {currentForm.currentForm && (
                  <>
                    {getFormByKey(currentForm.currentForm)}
                    <Flex gap={20} className="my-[20px]">
                      <Form.Item className="flex-1">
                        <button
                          disabled={!submittable}
                          type="submit"
                          onClick={() => setPreview(true)}
                          className="w-full py-[10px] rounded-lg border text-[#da7502] border-[#da7502] disabled:border-[#8e8e8e] disabled:text-[#787878] disabled:bg-[#c1c1c1] disabled:cursor-not-allowed hover:bg-[#ffe9c2]"
                        >
                          Xem trước
                        </button>
                      </Form.Item>
                      <Form.Item className="flex-1">
                        <button
                          type="submit"
                          // onClick={fetchCreate}
                          className="w-full py-[10px] rounded-lg border text-white bg-[#da7502] border-[#da7502] hover:text-white hover:bg-[#da6702]"
                        >
                          Đăng tin
                        </button>
                      </Form.Item>
                    </Flex>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
