'use client';
import ModalCategorySelectCustom from '@/components/common/ModalCategorySelectCustom';
import PreviewProduct from '@/components/common/PreviewProduct';
import {
  InboxOutlined,
  PlusOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {
  Flex,
  GetProp,
  Image,
  Modal,
  Space,
  UploadFile,
  UploadProps,
  notification,
} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { fetchCreateWorkPost } from '@/api/jobRequest';
import CreatePostGooHouse from '@/components/common/Form/CreatePostWholeHouse';
import CreatePostMotelRoomForm from '@/components/common/Form/CreatePostMotelRoomForm';
import getBase64, { FileType } from '@/services/getBase64';
import CreatePostWorkForm from '@/components/common/Form/CreatePostWorkForm';
import CreatePostWholeHouse from '@/components/common/Form/CreatePostWholeHouse';
import getFormByKey from '@/services/getFormByKey';
import ModalLocationSelectCustom from '@/components/common/ModalLocationSelectCustom';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';

export default function CreatePostPage() {
  const currentForm = useContext(CurrentFormContext);
  const [categoryId, setCategoryId] = useState<string | number>();
  const [preview, setPreview] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  return (
    <div className="w-3/5 flex flex-col gap-y-5 py-[20px] px-[10px] m-auto bg-white mt-[20px] rounded-lg">
      {
        preview ? (
          <PreviewProduct onCancel={() => setPreview(false)} />
        ) : (
          <>
            {currentForm.currentForm ? (
              getFormByKey(currentForm.currentForm)
            ) : (
              // <div className="flex-[2_2_0%]">
              <ModalCategorySelectCustom
                onChangeKey={(e) => currentForm.setCurrentForm?.(e)}
                label="Danh mục tin đăng"
              />
              // </div>
            )}
          </>
        )
        // <CreatePostWholeHouse />
        // <CreatePostMotelRoomForm />
        // <CreatePostWorkForm />
      }
    </div>
  );
}
