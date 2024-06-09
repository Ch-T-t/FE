import { textDefault } from '@/services/dataDefault';
import getImageLink from '@/services/getImageLink';
import { IPost, IProduct } from '@/types/Job';
import { Avatar, Badge, Image, Space } from 'antd';
import Ribbon from 'antd/es/badge/Ribbon';
import moment from 'moment';
import Link from 'next/link';
import React, { ClassAttributes, HTMLAttributes } from 'react';

interface Props {
  ribbon?: string;
  imageHeight?: number;
  imageWidth?: number;
  data?: IPost;
  className?: string;
  classImg?: string;
  pricerSuffixes?: string;
}

export default function CardItem(props: Props) {
  const children = (
    <div
      className={`w-[200px] ${props.className} max-lg:w-full max-lg:shadow-none max-lg:h-[300px] bg-white shadow-[0_2px_8px_rgba(0,0,0,.15)] p-[10px] rounded-lg `}
    >
      <Image
        width={`100%`}
        height={250}
        preview={false}
        className="object-cover rounded-lg overflow-hidden"
        alt={''}
        src={props.data?.banner}
      />
      <div className={`w-full`}>
        <p className="line-clamp-2 h-[50px] font-medium text-[15px] max-lg:font-normal max-lg:text-[13px]">
          {props.data?.name || textDefault}
        </p>
        <p className="truncate text-[#808080] h-[30px] py-[5px] text-[14px] max-lg:hidden">
          Ngày làm: {moment(props.data?.created_at).format('DD/MM/YYYY')}
        </p>
        <p className="text-[#d0021b] h-[30px] my-[5px] !text[15px] !font-sans font-bold">
          ${props.data?.info?.price || 0}
          {props.pricerSuffixes && `/${props.pricerSuffixes}`}
        </p>
        <Space className="w-full h-[40px]">
          <Avatar src="" className="max-lg:!w-[20px] max-lg:!h-[20px]" />
          <p className="w-[150px] block text-[12px] text-[#c7c7c7] truncate max-lg:text-[10px]">
            {moment(props.data?.created_at).fromNow()} • {props.data?.name}
          </p>
        </Space>
      </div>
    </div>
  );

  return (
    <Link
      className="text-black hover:text-black"
      href={`/product/${props.data?.id}`}
    >
      <Ribbon
        // className="invisible"
        color="red"
        placement="start"
        text={<i className="font-semibold">Việc làm 24h</i>}
      >
        {children}
      </Ribbon>
    </Link>
  );
}
