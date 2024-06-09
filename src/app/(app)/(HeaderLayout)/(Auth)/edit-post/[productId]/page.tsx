'use client';
import instanceAxios from '@/api/instanceAxios';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import { useAppSelector } from '@/app/hooks';
import CreatePostAirConditionForm from '@/components/common/Form/CreatePostAirConditionForm';
import CreatePostLaptopForm from '@/components/common/Form/CreatePostLaptopForm';
import ModalCategorySelectCustom from '@/components/common/ModalCategorySelectCustom';
import PreviewProduct from '@/components/common/PreviewProduct';
import {
  convertImageToUploadFile,
  convertVideoToUploadFile,
} from '@/services/fetchImage';
import getFormByKey from '@/services/getFormByKey';
import getKeybyUrl from '@/services/getKeybyUrl';
import getPrefixUrl from '@/services/getPrefixUrl';
import {
  IElectroDevice,
  IImage,
  IPost,
  IProduct,
  IRefrigeratorPost,
} from '@/types/Job';
import { InboxOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  Button,
  Flex,
  Form,
  Image,
  Modal,
  Result,
  Space,
  UploadFile,
  UploadProps,
  message,
  notification,
} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

export default function EditProductPage({
  params,
}: {
  params: { category: string | number; productId: string | number };
}) {
  const [loadingPage, setLoadingPage] = useState(true);
  const currentForm = useContext(CurrentFormContext);
  const currentUser = useAppSelector((state) => state.user.data);
  const [productData, setProductData] = useState<IPost>();
  const [categoryId, setCategoryId] = useState<string | number>();
  const user = useAppSelector((state) => state.user);
  const [preview, setPreview] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProductData = async () => {
      await instanceAxios
        .get(`/api/products/${params.productId}`)
        .then((res) => {
          setProductData(res.data);
          currentForm?.setCurrentLabel?.(res.data.data?.Category?.Name || '');
          currentForm?.setCurrentCategoryId?.(res.data?.category || '');
          currentForm.setCurrentData?.({
            ...currentForm.currentData,
            ...res.data,
          });
          currentForm?.setCurrentForm?.(res.data.category?.type || '');
          instanceAxios
            .get(`/api/media`, {
              params: {
                product_id: params.productId,
              },
            })
            .then((res) => {
              const fetchImageFiles = async () => {
                const imageFiles = await Promise.all(
                  (res.data || []).map(
                    async (item: IImage) => await convertImageToUploadFile(item)
                  )
                );
                setFileList(imageFiles || []);
              };
              const fetchVideoFiles = async () => {
                if (res.data?.Video) {
                  const VideoFiles = await convertVideoToUploadFile(
                    res.data || ''
                  );
                  setVideoFileList([VideoFiles]);
                }
              };
              fetchImageFiles();
              fetchVideoFiles();
            })
            .catch((err) => {})
            .finally(() => {
              setLoadingPage(false);
            });
        })
        .catch((err) => {})
        .finally(() => {});
    };
    fetchProductData();
  }, []);

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

  const fetchUpdate = (e: IPost) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('info', JSON.stringify(currentForm.currentData?.info));
    currentForm.currentData?.item_category &&
      formData.append(
        'item_category',
        String(currentForm.currentData?.item_category_tmp)
      );
    currentForm.currentData?.category &&
      formData.append(
        'category',
        String(currentForm.currentData?.category_tmp)
      );
    formData.append('name', String(currentForm.currentData?.name));
    formData.append(
      'description',
      String(currentForm.currentData?.description)
    );
    formData.append('quantity', String(currentForm.currentData?.quantity || 0));
    currentForm.currentData?.shop &&
      formData.append('shop', String(currentForm.currentData?.shop));
    currentForm.currentData?.brand &&
      formData.append('brand', String(currentForm.currentData?.brand));
    formData.append('user', String(user.data.id));
    fileList.length > 0 &&
      formData.append('banner', fileList[0].originFileObj as Blob);
    instanceAxios
      .patch(`/api/products`, formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
      .then((res) => {
        const formImageData = new FormData();
        fileList.length > 0 &&
          fileList.map((item, index) =>
            formImageData.append('files', item.originFileObj as Blob)
          );
        formImageData.append('video', fileList[0].originFileObj as Blob);

        instanceAxios
          .post(`api/media/${res.data.id}/upload/`, formImageData)
          .then((res) => {})
          .catch((err) => {
            message.error('Upload thất bại!');
          })
          .finally(() => {
            message.success('Đã tạo bài đăng!');
            setFileList([]);
            setVideoFileList([]);
            currentForm.setCurrentData?.({});
            currentForm.setCurrentForm?.('');
            currentForm.setCurrentLabel?.('');
            currentForm.setCurrentCategoryId?.('');
            setLoading(false);
          });
      })
      .catch((err) => console.log(e))
      .finally(() => setLoading(false));
  };
  return (
    !loadingPage && (
      <>
        {currentUser.id === productData?.user?.id ? (
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
              onFinish={(e) => !loading && fetchUpdate(e)}
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
                      {/* <ModalCategorySelectCustom
                        className="max-lg:hidden mb-[10px]"
                        // onChangeKey={(e) => currentForm.setCurrentForm?.(e)}
                        label="Danh mục tin đăng"
                      /> */}
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
                                disabled={loading}
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
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
          />
        )}
      </>
    )
  );
}
