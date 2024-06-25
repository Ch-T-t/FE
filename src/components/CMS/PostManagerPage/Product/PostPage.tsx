import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/app/hooks';
import CMSCategory from '@/components/common/CMSCategory';
import { IJobPost, IPost, IProduct } from '@/types/Job';
import {
  CloseOutlined,
  ColumnHeightOutlined,
  FormOutlined,
} from '@ant-design/icons';
import {
  Button,
  Dropdown,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Switch,
  message,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useEffectOnce } from 'usehooks-ts';

export default function PostPage() {
  const [postList, setPostList] = useState<IJobPost[]>([]);
  const [valueFilter, setValueFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dataTotal, setDataTotal] = useState(0);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [currentValue, setcurrentValue] = useState('');
  const { mutate } = useSWRConfig();
  const [form] = useForm();

  const onFinish = async (e: any) => {
    await instanceAxios
      .patch(`/job/items/${currentID}/`, e)
      .then((res) => {
        form.resetFields();
        setOpenModalCreate(false);
        message.success('Đã cập nhật');
        mutate('fetchPostList');
      })
      .catch((err) => {
        message.error('Thao tác thất bại');
      });
  };

  const onSearch = (e: string) => {
    setValueFilter(e);
  };
  const onChangPage = (e: number) => {
    setCurrentPage(e);
  };

  const fetchDelete = async (id: string) => {
    await instanceAxios
      .delete(`/api/products/${id}`)
      .then((res) => {
        message.success('Xóa thành công');
        mutate('fetchPostList');
      })
      .catch((err) => {
        message.error('Thao tác thất bại');
      });
  };

  const fetchUpdateStatus = async (id: string, value: string) => {
    await instanceAxios
      .patch(`/api/products/${id}`, { status: value })
      .then((res) => {
        message.success('Cập nhật thành công');
        mutate('fetchPostList');
      })
      .catch((err) => {
        message.error('Thao tác thất bại');
      });
  };

  const fetchPostList = useCallback(async () => {
    await instanceAxios
      .get(`/api/products`, {
        params: {
          ...(valueFilter && { search: valueFilter }),
          ...(limit && { limit: limit * currentPage }),
          ...(currentPage && { offset: currentPage }),
          status: 'PENDING',
        },
      })
      .then((res) => {
        if (res.data && res.data && res.data.results) {
          setDataTotal(res.data.count || 0);
          setPostList(res.data.results || []);
        } else {
          console.error('Không có dữ liệu hoặc cấu trúc dữ liệu không đúng.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, limit, valueFilter]);
  useSWR('fetchPostList', fetchPostList);

  useEffect(() => {
    fetchPostList();
  }, [fetchPostList]);
  // useEffect(() => {
  //   fetchUserList(valueFilter);
  // }, [fetchUserList, valueFilter]);
  const columns: ColumnsType<IPost> = [
    {
      title: 'STT',
      render: (value, record, index) => index + 1,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      render: (value, record, index) => record.id,
    },
    {
      title: 'Ảnh',
      dataIndex: 'banner',
      render: (value, record, index) => (
        <Image
          className="rounded"
          alt=""
          src={record.banner || ''}
          width={100}
          height={60}
        />
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'name',
      render: (value, record, index) => record.name,
    },
    {
      title: 'Trang thái',
      dataIndex: 'status',
      render: (value, record, index) => record.status,
    },

    {
      title: 'Hành động',
      width: 150,
      // className: 'flex item-center justify-center',
      render: (value, record, index) => (
        <div className="flex gap-x-5 text-[20px] text-[#aea9c6]">
          <Popover
            content={
              <Flex vertical gap={10}>
                <Button
                  onClick={() =>
                    fetchUpdateStatus(record.id || '', 'PROCESSING')
                  }
                  type="primary"
                >
                  Duyệt
                </Button>
                <Button
                  onClick={() => fetchUpdateStatus(record.id || '', 'REJECTED')}
                  type="primary"
                >
                  Từ chối
                </Button>
                <Button
                  onClick={() => fetchDelete(record.id || '')}
                  type="primary"
                >
                  Xóa
                </Button>
              </Flex>
            }
            title="Hành động"
            trigger="click"
            placement="left"
            // open={open}
            // onOpenChange={handleOpenChange}
          >
            <Button type="primary">Click me</Button>
          </Popover>
          {/* <Switch />
          <Popconfirm
            title={'Xác nhận xóa'}
            onConfirm={() => fetchDelete(record.id || '')}
          >
            <CloseOutlined />
          </Popconfirm> */}
        </div>
      ),
    },
  ];
  return (
    <div>
      <CMSCategory
        label="Các loại công việc của hệ thống"
        onChangPage={onChangPage}
        dataTotal={dataTotal}
        onSearch={onSearch}
        data={postList.map((item, index) => ({ key: index, ...item }))}
        createAble={true}
        create={{
          url: '/job/items/',
          inputName: ['Name'],
          // body: { asdas: 'asdd' },
          onSucces(res) {
            mutate('fetchPostList');
            message.success(res.data.message);
          },
          onFailed(err) {
            message.error(err.res.data.detail);
          },
        }}
        columns={columns}
      />
      <Modal
        styles={{
          mask: {
            backdropFilter: 'blur(5px)',
          },
        }}
        centered
        title={<p className="text-center">Label</p>}
        open={openModalCreate}
        onCancel={() => setOpenModalCreate(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={onFinish} name="basic" layout="vertical">
          <Form.Item
            label={'Tên nghành nghề'}
            name={'Name'}
            rules={[{ required: true }]}
          >
            <Input defaultValue={currentValue} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
