'use client';
import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/app/hooks';
import CardItem from '@/components/common/CardItem';
import { textCensorship, textDefault } from '@/services/dataDefault';
import renderTagItem from '@/services/renderTagItem';
import { IImage, IPost, ISlide } from '@/types/Job';
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CheckCircleTwoTone,
  EditOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  HeartFilled,
  MailOutlined,
  MessageFilled,
  MessageOutlined,
  PhoneOutlined,
  ShareAltOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  Popover,
  Radio,
  Rate,
  Space,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

export default function ProductInfoPage({
  params,
}: {
  params: { category: string | number; productId: string | number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const currentUser = useAppSelector((state) => state.user.data);
  const [productData, setProductData] = useState<IPost>();
  const [relateProductList, setRelateProductList] = useState<IPost[]>([]);
  const [imageList, setImageList] = useState<IImage[]>([]);
  const [currentImg, setCurrentImg] = useState('');
  const [openReport, setOpenReport] = useState(false);
  const [reportValue, setReportValue] = useState('');

  const router = useRouter();
  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      await instanceAxios
        .get(`/api/products/${params.productId}`)
        .then((res) => {
          setProductData(res.data);
          setCurrentImg(res.data.banner);
          instanceAxios
            .get(
              `/api/products?limit=10&offset=1&category=${res.data.item_category?.name || res.data.category?.name}`
            )
            .then((res) => {
              setRelateProductList(res.data.results);
            })
            .catch((err) => {});
        })
        .catch((err) => {})
        .finally(() => setLoadingPage(false));
    };
    instanceAxios
      .get(`/api/media`, {
        params: {
          product_id: params.productId,
        },
      })
      .then((res) => {
        setImageList(res.data);
      })
      .catch((err) => {})
      .finally(() => setLoadingPage(false));

    fetchProductData();
  }, [params.category, params.productId]);
  const fetchFolow = async () => {
    await instanceAxios
      .post(`/api/follower`, { user_to: productData?.user?.id })
      .then((res) => {
        message.success('Đã theo dõi');
      })
      .catch((err) => {
        message.info('Đã theo dõi rồi');
      });
  };
  const handleStartChat = () => {
    localStorage.setItem('productChatId', (productData?.id || 0).toString());
    // localStorage.setItem('productChatKey', productData?.Url || '');
    router.push(`/chat`);
  };
  const reportCategory = [
    {
      name: 'Lừa đảo',
      value: 'Lừa đảo',
    },
    {
      name: 'Trùng lặp',
      value: 'Trùng lặp',
    },
    {
      name: 'Sản phẩm đã bán',
      value: 'Sản phẩm đã bán',
    },
    {
      name: 'Thông tin không đúng thực tế',
      value: 'Thông tin không đúng thực tế',
    },
    {
      name: 'Lý do khác',
      value: 'Lý do khác',
    },
  ];
  return (
    !loadingPage && (
      <div className="w-3/4 max-lg:w-full m-auto">
        <div className="flex gap-x-5">
          <div className="w-2/3 max-lg:w-full flex flex-col gap-y-5">
            <div className="w-full bg-white p-[10px] rounded-lg">
              <Image
                width={'100%'}
                height={300}
                className="object-cover "
                preview={false}
                src={currentImg}
                alt=""
              />
              <div className="w-full overflow-x-auto">
                <div className="flex gap-x-2">
                  {imageList.map((item, index) => (
                    <Image
                      key={index}
                      width={100}
                      onClick={() => setCurrentImg(item.image || '')}
                      height={100}
                      className="object-cover "
                      preview={false}
                      src={item.image}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-[10px] rounded-lg bg-white">
              <p className="font-semibold text-[16px]">{productData?.name}</p>
              <div className="flex justify-between">
                <b className="text-[#d0021b]">
                  ${productData?.info?.price?.toLocaleString() || 0}
                </b>
                <div className="flex gap-x-5 cursor-pointer">
                  <Popover
                    content={
                      <Flex gap={10}>
                        <FacebookShareButton
                          url={`${process.env.NEXT_PUBLIC_URL_ORIGIN}/product/${params.productId}`}
                        >
                          <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>

                        <TwitterShareButton
                          url={`${process.env.NEXT_PUBLIC_URL_ORIGIN}/product/${params.productId}`}
                        >
                          <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>

                        <TelegramShareButton
                          url={`${process.env.NEXT_PUBLIC_URL_ORIGIN}/product/${params.productId}`}
                        >
                          <TelegramIcon size={32} round={true} />
                        </TelegramShareButton>
                      </Flex>
                    }
                    trigger="click"
                  >
                    <Space>
                      <ShareAltOutlined />
                      Chia sẻ
                    </Space>
                  </Popover>
                  <Space>
                    <HeartFilled />
                    lưu tin
                  </Space>
                </div>
              </div>
              <div className="py-[10px]">
                <Space className="text-[#777777] ">
                  <ShareAltOutlined />
                  <p className="truncate w-[500px] text-[14px]">
                    {productData?.info?.address || textDefault}
                  </p>
                </Space>
                <Space className="text-[#777777] ">
                  <FieldTimeOutlined />
                  <p className="truncate w-[500px] text-[14px]">
                    {`Đăng ${
                      moment(productData?.created_at).format('DD/MM/YYYY') ||
                      textDefault
                    }`}
                  </p>
                </Space>
                <Space className="text-[#777777] ">
                  <CheckCircleTwoTone />
                  <p className="truncate w-[500px] text-[14px]">
                    {textCensorship}
                  </p>
                </Space>
              </div>
            </div>
            <div className="p-[10px] rounded-lg bg-white">
              <p className="font-semibold">Mô tả chi tiết</p>
              <div className="py-[10px] text-[14px]">
                {productData?.description || textDefault}
              </div>
            </div>
            <div className="p-[10px] rounded-lg bg-white">
              <p className="font-semibold">Đặc điểm công việc</p>
              <div className="grid grid-cols-2 gap-2 py-[10px]">
                {renderTagItem(productData || {}).map((item, index) => item)}
              </div>
            </div>
          </div>
          <div className="w-1/3 max-lg:hidden flex flex-col gap-y-5">
            <div className="p-[15px] bg-white rounded-lg">
              <div className="flex gap-x-3">
                <Avatar size={50} src={''} />
                <div className="flex flex-col gap-y-1">
                  <b>{productData?.user?.fullname || textDefault}</b>
                  <Space className="text-[14px]">
                    <Rate
                      className={'!text-[14px]'}
                      allowHalf
                      defaultValue={2.5}
                    />
                    <p>2.5</p>
                    <p className="text-[#28699f]">(25 đánh giá)</p>
                  </Space>
                  <p className="text-[13px] text-[#9b9b9b]">
                    • Hoạt động 3 tuần trước
                  </p>
                </div>
              </div>
              <div className="flex gap-x-3 text-[14px] mt-[20px]">
                <button
                  onClick={fetchFolow}
                  className="flex flex-1 items-center justify-center rounded-md hover:bg-[#fe9900] hover:text-white border-2 border-[#fe9900] text-[#fe9900]"
                >
                  Đang theo dõi
                </button>
                <button className="flex flex-1 items-center justify-center rounded-md hover:bg-[#fe9900] hover:text-white border-2 border-[#fe9900] text-[#fe9900]">
                  <Link href={`/user/${productData?.user?.id}`}>
                    {`Trang cá nhân >`}
                  </Link>
                </button>
              </div>
            </div>
            <div className="p-[15px] bg-white rounded-lg">
              <p className="font-medium">Liên hệ bán</p>
              <div className="w-full overflow-x-auto py-[10px]">
                <div className="w-max flex text-[14px]">
                  {[...Array(5)].map((_, index) => (
                    <p
                      key={index}
                      className=" inline-block py-[5px] px-[10px] border rounded-full border-[#fe9900]"
                    >
                      Công việc này còn ko ạ
                    </p>
                  ))}
                </div>
              </div>
              {currentUser?.id === productData?.user ? (
                <>
                  <div className="flex items-center mt-[20px] gap-3 rounded-lg px-[10px] py-[5px] text-white justify-center bg-[#48862d]">
                    <EyeOutlined />
                    <b className="uppercase">Đã bán/ẩn tin</b>
                  </div>
                  <Link href={`/edit-post/${params.productId}`}>
                    <div className="flex items-center mt-[20px] gap-3 rounded-lg px-[10px] py-[5px] text-white justify-center bg-[#48862d]">
                      <EditOutlined />
                      <b className="uppercase">Sửa tin</b>
                    </div>
                  </Link>
                </>
              ) : (
                <div
                  onClick={handleStartChat}
                  className="flex items-center mt-[20px] rounded-lg px-[10px] py-[5px] text-white justify-between bg-[#48862d]"
                >
                  <MessageFilled />
                  <b className="uppercase">Chat với người bán</b>
                </div>
              )}
            </div>
            <Space
              onClick={() => setOpenReport(true)}
              className="text-[#b5b5b5]"
            >
              <WarningOutlined />
              Báo cáo tin đăng này
            </Space>
            <Modal
              centered
              open={openReport}
              title={
                <p className="text-[20px] text-center font-bold">
                  Báo cáo tin đăng này
                </p>
              }
              onCancel={() => setOpenReport(false)}
              footer={[]}
            >
              <b>Tin rao này có vấn đề gì?</b>
              <Flex className="mt-[10px]" vertical gap={10}>
                {reportCategory.map((item, index) => (
                  <Flex key={index} justify="space-between">
                    <p>{item.name}</p>
                    <div className="w-[20px] h-[20px] border-[7px] bg-white rounded-full"></div>
                  </Flex>
                ))}
              </Flex>
              <p className="mt-[20px] font-bold">Chi tiết</p>
              <TextArea placeholder="Vui lòng mô tả thêm dấu hiệu lừa đảo" />
              <p className="mt-[20px] font-bold">
                Thông tin để chợ tốt Đài Loan liên hệ với bạn khi cần thiết
              </p>
              <Input placeholder="Số điện thoại của bạn" />
              <Input className="!mt-[10px]" placeholder="Email của bạn" />
              <Button className="mt-[20px] !text-white !w-full !bg-[#ff9902]">
                GỬI BÁO CÁO
              </Button>
            </Modal>
          </div>
        </div>
        {relateProductList.length ? (
          <div className="relative max-lg:bg-white max-lg:mt-[10px]">
            <div className="flex justify-between rounded-lg mt-[20px] bg-white font-semibold  text-[20px] max-lg:text-[14px] max-lg:border-b max-lg:m-0 max-lg:shadow-none px-[10px] py-[5px] shadow-[0_2px_8px_rgba(0,0,0,.15)]">
              <p>Tin tương tự</p>
              <Space className="text-blue-800 text-[12px]">Xem tất cả</Space>
            </div>
            <button
              className="absolute -translate-x-full left-0 top-1/2"
              onClick={() => scroll(-200)}
            >
              <CaretLeftOutlined />
            </button>
            <button
              className="absolute translate-x-full right-0 top-1/2"
              onClick={() => scroll(200)}
            >
              <CaretRightOutlined />
            </button>
            <div
              ref={ref}
              className="w-full scroll-smooth overflow-x-auto no-scrollbar "
            >
              <div className="flex gap-x-2 py-[20px] px-[10px]">
                {relateProductList.map((item, index) => (
                  <CardItem data={item} key={index} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="hidden max-lg:flex w-full fixed bottom-0 z-10 bg-white">
          <Flex
            align="center"
            justify="center"
            className="w-1/3 border-r bg-[#33a837] text-white py-[12px]"
            vertical
          >
            <Link
              className="flex flex-col items-center justify-center text-white"
              href="tel:+05890000111"
            >
              <PhoneOutlined />
              <p className="text-[12px]">Goi điện</p>
            </Link>
          </Flex>

          <Flex align="center" justify="center" className="w-1/3" vertical>
            <Link
              className="flex flex-col items-center justify-center text-black hover:text-black"
              href="mailto: email@example.com"
            >
              <MailOutlined />
              <p className="text-[12px]">SMS</p>
            </Link>
          </Flex>
          <Flex
            align="center"
            justify="center"
            className="w-1/3 border-l "
            vertical
          >
            <MessageOutlined />
            <p className="text-[12px]">Chat</p>
          </Flex>
        </div>
      </div>
    )
  );
}
