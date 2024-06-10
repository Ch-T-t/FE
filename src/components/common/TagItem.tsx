import { ShareAltOutlined } from '@ant-design/icons';
import { Flex, Image, Space, Tooltip } from 'antd';
import React, { ReactNode } from 'react';
interface Props {
  icon: string;
  title: string | number;
}
export default function TagItem(props: Props) {
  return (
    <div>
      <Flex className="w-full" gap={10} key={'as'}>
        <Image src={props.icon} width={20} alt="" preview={false} />
        <p className="truncate text-[13px]">{props.title}</p>
      </Flex>
    </div>
  );
}
