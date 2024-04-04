'use client';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import CreatePostAirConditionForm from '@/components/common/Form/CreatePostAirConditionForm';
import ModalCategorySelectCustom from '@/components/common/ModalCategorySelectCustom';
import PreviewProduct from '@/components/common/PreviewProduct';
import getBase64, { FileType } from '@/services/getBase64';
import getFormByKey from '@/services/getFormByKey';
import { InboxOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Flex, Image, Modal, Space, UploadFile, UploadProps } from 'antd';
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);

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

  return (
    <div className="w-4/5 flex flex-col gap-y-5 py-[20px] px-[30px] m-auto bg-white mt-[20px] rounded-lg">
      {preview ? (
        <PreviewProduct onCancel={() => setPreview(false)} />
      ) : (
        <>
          <div className="w-full flex gap-x-10">
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
                    <p className="ant-upload-text !text-[14px]">240 x 240</p>
                  </Flex>
                </Dragger>
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
              <div className="w-[300px] min-h-[200px] py-[20px] flex items-center justify-center">
                <Dragger
                  className="truncate w-full"
                  name="Video"
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
            <div className="flex-[3_2_0%]">
              <ModalCategorySelectCustom
                onChangeKey={(e) => currentForm.setCurrentForm?.(e)}
                label="Danh mục tin đăng"
              />
              {/* {currentForm.currentForm ? (
              getFormByKey(currentForm.currentForm)
            ) : (
              <ModalCategorySelectCustom
                onChangeKey={(e) => currentForm.setCurrentForm?.(e)}
                label="Danh mục tin đăng"
              />
            )} */}
              <Flex gap={20} className="my-[20px]">
                <button
                  onClick={() => setPreview(true)}
                  className="flex-1 py-[10px] rounded-lg border text-[#da7502] border-[#da7502]  hover:bg-[#ffe9c2]"
                >
                  Xem trước
                </button>
                <button
                  // onClick={onSubmit}
                  className="flex-1 py-[10px] rounded-lg border text-white bg-[#da7502] border-[#da7502] hover:text-white hover:bg-[#da6702]"
                >
                  Đăng tin
                </button>
              </Flex>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
