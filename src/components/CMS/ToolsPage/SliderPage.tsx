import instanceAxios from '@/api/instanceAxios';
import AddButtonManager from '@/components/common/AddButtonManager';
import labelManager from '@/services/labelManager';
import { ISlide } from '@/types/Job';
import {
  CloseOutlined,
  ColumnHeightOutlined,
  FormOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  ColorPicker,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Switch,
  Table,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from 'antd';
import { Option } from 'antd/es/mentions';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

// const data: ISlide[] = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     email: `London, Park Lane no. ${i}`,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

type FieldType = {
  icon?: string;
  text_color?: string;
  remember?: string;
  link?: string;
  login_required?: boolean;
  menu_name?: string;
};

export default function SliderPage() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [slideList, setSlideList] = useState<ISlide[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [change, setChange] = useState(true);
  const [currentAction, setCurrentAction] = useState<'CREATE' | 'UPDATE'>(
    'CREATE'
  );
  const [currentId, setCurrentId] = useState('');

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const newList: UploadFile<any>[] = newFileList.map((item) => ({
      ...item,
      status: 'done',
    }));
    setFileList(newList);
  };
  const suffixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select defaultValue={'86'} style={{ width: 130 }}>
        <Option value="86">Liên kết trang</Option>
        <Option value="87">Option2</Option>
      </Select>
    </Form.Item>
  );
  useEffect(() => {
    instanceAxios
      .get(`/api/slide`)
      .then((res) => {
        setSlideList(res.data || []);
      })
      .catch((err) => {});
  }, [change]);
  const onFinish = () => {
    const formData = new FormData();
    formData.append('banner', fileList[0].originFileObj as Blob);
    if (currentAction === 'CREATE')
      instanceAxios
        .post(`/api/slide`, formData)
        .then((res) => {
          message.success('Đã tạo slide');
          setFileList([]);
          setChange(!change);
        })
        .catch((err) => {});
    if (currentAction === 'UPDATE')
      instanceAxios
        .patch(`/api/slide/${currentId}`, formData)
        .then((res) => {
          message.success('Đã update slide');
          setChange(!change);
        })
        .catch((err) => {});
  };
  const onDelete = (id?: string) => {
    instanceAxios
      .delete(`/api/slide/${id}`)
      .then((res) => {
        message.success('Đã xóa slide');
        setChange(!change);
      })
      .catch((err) => {});
  };
  const onUpdateStatus = (id?: string, status?: boolean) => {
    instanceAxios
      .patch(`/api/slide/${id}`, { status: status })
      .then((res) => {
        message.success('Đã xóa slide');
        setChange(!change);
      })
      .catch((err) => {});
  };

  const columns: ColumnsType<ISlide> = [
    {
      render: (value, record, index) => <ColumnHeightOutlined />,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'banner',
      render: (value, record, index) => (
        <Image className="rounded" alt="" src={value} width={100} height={60} />
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      render: (value, record, index) => (
        <div className="flex flex-col font-medium">
          {moment(value).format('DD/MM/YYYY  HH:mm:ss')}
          {/* <p>Banner - Banner dưới tiêu đề</p>
          <p className="text-[#9ea9b4]">Vị trí - Banner dưới tiêu đề</p> */}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value, record, index) => (
        <Switch
          onChange={(e) => onUpdateStatus(record.id, e)}
          checked={value}
        />
      ),
    },
    {
      render: (value, record, index) => (
        <div className="flex gap-x-5 text-[20px] text-[#aea9c6]">
          <FormOutlined
            onClick={() => {
              setCurrentId(record.id || '');
              setCurrentAction('UPDATE');
              setOpenModalCreate(true);
            }}
          />
          <CloseOutlined onClick={() => onDelete(record.id)} />
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <div>{labelManager('Banner/Quảng cáo')}</div>
      <div className="flex gap-x-3">
        <AddButtonManager
          onClick={() => {
            setCurrentAction('CREATE');
            setOpenModalCreate(true);
          }}
          className=" bg-[#4ad49f]"
        >
          Thêm mới
        </AddButtonManager>
        <AddButtonManager className="bg-[#5d5386]">Cài đặt</AddButtonManager>
      </div>
      <div className="p-[20px] bg-white shadow mt-[20px]">
        <Table
          columns={columns}
          dataSource={slideList}
          pagination={{
            position: ['bottomCenter'],
          }}
        />
      </div>
      <Modal
        width={'50%'}
        title={'Chỉnh sửa'}
        onCancel={() => setOpenModalCreate(false)}
        open={openModalCreate}
        onOk={onFinish}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          labelAlign="left"
          style={{ maxWidth: 600 }}
          colon={false}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Icon menu"
            name="icon"
            // rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Upload
              className="truncate w-full"
              name="images"
              listType="picture"
              fileList={fileList}
              accept="image/*"
              maxCount={5}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          {/* <Form.Item<FieldType>
            label="Màu văn bản"
            name="text_color"
            // rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <ColorPicker />
          </Form.Item>
          <Form.Item<FieldType>
            label="Tên menu"
            name="menu_name"
            // rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Yêu cầu đăng nhập"
            name="login_required"
            // rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Liên kết"
            name="link"
            // rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input addonAfter={suffixSelector} />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}
