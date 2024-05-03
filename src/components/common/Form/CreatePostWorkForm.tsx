import { fetchCreateGoodHousePost } from '@/api/goodHouseRequest';
import {
  fetchCareerList,
  fetchCreateWorkPost,
  fetchExperienceList,
  fetchPayFormsList,
  fetchUpdateWorkPost,
  fetchWorkTypeList,
} from '@/api/jobRequest';
import getBase64, { FileType } from '@/services/getBase64';
import { IJob, IJobPost, IPost } from '@/types/Job';
import { InboxOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  Flex,
  Form,
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
import HorizontalSelect from '../HorizontalSelect';
import InputCustom from '../InputCustom';
import ModalCategorySelectCustom from '../ModalCategorySelectCustom';
import ModalLocationSelectCustom from '../ModalLocationSelectCustom';
import PreviewProduct from '../PreviewProduct';
import SelectCustom from '../SelectCustom';
import TextAreaCustom from '../TextAreaCustom';
import getParentUrl from '@/services/getUrl';
import { RcFile } from 'antd/es/upload';
import { CurrentFormContext } from '@/app/(app)/CurentFormContext';
import selectData from '@/services/selectData';

interface Props {
  edit?: boolean;
  data?: IJobPost;
}
interface Props {
  onPreview?: () => void;
}

export default function CreatePostWorkForm(props: Props) {
  const currentForm = useContext(CurrentFormContext);
  const [checked, setChecked] = useState<boolean>();
  const titleClassName = 'pt-[20px] text-[20px] font-semibold';
  return (
    <Flex vertical gap={15}>
      <Form.Item<IPost>
        name={['infor', 'title']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <InputCustom
          required
          defaultValue={currentForm.currentData?.infor?.title}
          // onChange={(e) => setTitle(e as string)}
          label={'Tiêu đề tin đăng'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['infor', 'recruitment']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <InputCustom
          required
          type="number"
          defaultValue={currentForm.currentData?.infor?.recruitment}
          // onChange={(e) => setRecruitment(e as number)}
          label={'Số lượng tuyển dụng'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['infor', 'career']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <SelectCustom
          // onChange={(e) => setCareerId(e as number)}
          data={selectData.workCarrerData}
          defaultValue={currentForm.currentData?.infor?.career}
          label={'Nghành nghề'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['infor', 'workType']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <SelectCustom
          // onChange={(e) => setWorkTypeId(e as number)}
          data={selectData.workTypeData}
          defaultValue={currentForm.currentData?.infor?.workType}
          label={'Loại công việc'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['infor', 'pay_forms']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <SelectCustom
          // onChange={(e) => setPayForm(e as number)}
          data={selectData.workPayMethodData}
          defaultValue={currentForm.currentData?.infor?.pay_forms}
          required
          label={'Hình thức trả lương'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['infor', 'wage']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <InputCustom
          required
          defaultValue={currentForm.currentData?.infor?.wage}
          // onChange={(e) => setWage(e as number)}
          type="number"
          label={'Lương'}
        />
      </Form.Item>
      <Form.Item<IPost>
        name={['infor', 'detailed_description']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <TextAreaCustom
          // onChange={(e) => setDescription(e as string)}
          required
          label={'Mô tả chi tiết'}
        />
      </Form.Item>
      <p className="py-[10px] text-[20px] font-semibold">Thông tin thêm</p>

      <Flex gap={20}>
        <Form.Item<IPost>
          name={['infor', 'minAge']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            required
            type="number"
            defaultValue={currentForm.currentData?.infor?.minAge}
            // onChange={(e) => setMinAge(e as number)}
            label={'Độ tuổi tối thiểu'}
          />
        </Form.Item>
        <Form.Item<IPost>
          name={['infor', 'maxAge']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <InputCustom
            required
            defaultValue={currentForm.currentData?.infor?.maxAge}
            // onChange={(e) => setMaxAge(e as number)}
            type="number"
            label={'Độ tuổi tối đa'}
          />
        </Form.Item>
      </Flex>

      <Flex className="text-[14px] cursor-pointer" gap={10}>
        <Form.Item<IPost>
          name={['infor', 'sex']}
          rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
        >
          <HorizontalSelect
            // onChange={(e) => setGenderId(e as number)}
            defaultValue={currentForm.currentData?.infor?.sex}
            data={[
              { id: 1, name: 'Nam' },
              { id: 2, name: 'Nữ' },
            ]}
            label={'Giới tính'}
          />
        </Form.Item>
      </Flex>
      <Form.Item<IPost>
        name={['infor', 'experience']}
        rules={[{ required: true, message: 'Trường này bắt buộc!' }]}
      >
        <SelectCustom
          // onChange={(e) => setExperienceId(e as number)}
          data={[]}
          defaultValue={currentForm.currentData?.infor?.experience}
          required
          label={'Kinh nghiệm'}
        />
      </Form.Item>
    </Flex>
  );
}
