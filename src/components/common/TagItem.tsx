import { ShareAltOutlined } from '@ant-design/icons';
import { Flex, Space, Tooltip } from 'antd';
import React, { ReactNode } from 'react';
interface Props {
  icon: ReactNode;
  title: string | number;
}
export default function TagItem(props: Props) {
  return (
    <div>
      <Flex className="w-full" gap={10} key={'as'}>
        {props.icon}
        <p className="truncate text-[13px]">{props.title}</p>
      </Flex>
    </div>
  );
}
