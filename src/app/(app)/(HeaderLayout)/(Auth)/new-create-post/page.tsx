'use client';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import ModalCategorySelectCustom from '@/components/common/ModalCategorySelectCustom';
import PreviewProduct from '@/components/common/PreviewProduct';
import getFormByKey from '@/services/getFormByKey';
import { InboxOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Flex, Image, Modal, Space } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function NewCreatePostPage() {
  const currentForm = useContext(CurrentFormContext);
  const [categoryId, setCategoryId] = useState<string | number>();
  const [preview, setPreview] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  return (
    <div className="w-4/5 flex flex-col gap-y-5 py-[20px] px-[30px] m-auto bg-white mt-[20px] rounded-lg">
      {
        preview ? (
          <PreviewProduct onCancel={() => setPreview(false)} />
        ) : (
          <>
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
                    // fileList={fileList}
                    accept="image/*"
                    // onPreview={handlePreview}
                    // onChange={handleChange}
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
                    // onCancel={handleCancel}
                  >
                    <Image
                      alt="example"
                      style={{ width: '100%' }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
                <div className="w-[300px] min-h-[200px] py-[20px] flex items-center justify-center">
                  <Dragger
                    className="truncate w-full"
                    name="Video"
                    listType="picture"
                    // fileList={videoFileList}
                    maxCount={1}
                    accept="video/*"
                    // onChange={handleChangeVideo}
                  >
                    <p className="ant-upload-drag-icon">
                      <VideoCameraOutlined />
                    </p>
                    <p className="ant-upload-text !text-[14px]">
                      Đăng tối đa 1 video{' '}
                    </p>
                  </Dragger>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    // onCancel={handleCancel}
                  >
                    <Image
                      alt="example"
                      style={{ width: '100%' }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
              </div>
              <div className="flex-[3_2_0%]">
                <ModalCategorySelectCustom
                  onChangeKey={(e) => currentForm.setCurrentForm?.(e)}
                  label="Danh mục tin đăng"
                />
              </div>
            </div>
            {/* {currentForm.currentForm ? (
              getFormByKey(currentForm.currentForm)
            ) : (
              <ModalCategorySelectCustom
                onChangeKey={(e) => currentForm.setCurrentForm?.(e)}
                label="Danh mục tin đăng"
              />
            )} */}
          </>
        )
        // <CreatePostWholeHouse />
        // <CreatePostMotelRoomForm />
        // <CreatePostWorkForm />
      }
    </div>
  );
}
