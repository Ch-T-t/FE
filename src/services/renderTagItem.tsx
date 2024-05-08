import TagItem from '@/components/common/TagItem';
import { IPost, IProduct } from '@/types/Job';
import { textDefault } from './dataDefault';
import {
  AlertOutlined,
  AuditOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  BorderInnerOutlined,
  BoxPlotOutlined,
  FilterOutlined,
  FunnelPlotOutlined,
  InsertRowBelowOutlined,
  MergeCellsOutlined,
  PictureOutlined,
  ScheduleOutlined,
  UserOutlined,
} from '@ant-design/icons';

const renderTagItem = (data: IPost) => {
  let tabList = [];
  for (let index = 0; index < Object.keys(data || {}).length; index++) {
    switch (Object.keys(data.info || {})[index]) {
      case 'usage_status':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`Tình trạng sử dụng: ${
              data.info?.usage_status || textDefault
            } `}
          />
        );
        break;
      case 'seller_information':
        tabList.push(
          <TagItem
            icon={<UserOutlined />}
            title={`Thông tin người bán: ${
              data.info?.seller_information || textDefault
            }`}
          />
        );
        break;
      case 'guarantee':
        tabList.push(
          <TagItem
            icon={<BarcodeOutlined />}
            title={`Bảo hành: ${data.info?.capacity || textDefault}`}
          />
        );
        break;
      case 'company':
        tabList.push(
          <TagItem
            icon={<AuditOutlined />}
            title={`Công ty: ${data.info?.company || textDefault}`}
          />
        );
        break;
      case 'capacity':
        tabList.push(
          <TagItem
            icon={<AlertOutlined />}
            title={`Dung tích: ${data.info?.capacity || textDefault}`}
          />
        );
        break;
      case 'volume':
        tabList.push(
          <TagItem
            icon={<FilterOutlined />}
            title={`Khối lượng: ${data.info?.volume || textDefault}`}
          />
        );
        break;
      case 'wattage':
        tabList.push(
          <TagItem
            icon={<FunnelPlotOutlined />}
            title={`Công suất: ${data.info?.wattage || textDefault}`}
          />
        );
        break;
      case 'washing_volume':
        tabList.push(
          <TagItem
            icon={undefined}
            title={`Khối lượng giặt: ${
              data.info?.washing_volume || textDefault
            }`}
          />
        );
        break;
      case 'color':
        tabList.push(
          <TagItem
            icon={<BgColorsOutlined />}
            title={`Màu: ${data.info?.color || textDefault}`}
          />
        );
        break;
      case 'microprocessor':
        tabList.push(
          <TagItem
            icon={<BorderInnerOutlined />}
            title={`Bộ vi xử lí: ${data.info?.microprocessor || textDefault}`}
          />
        );
        break;
      case 'ram':
        tabList.push(
          <TagItem
            icon={<InsertRowBelowOutlined />}
            title={`Ram: ${data.info?.ram || textDefault}`}
          />
        );
        break;
      case 'hardDrive':
        tabList.push(
          <TagItem
            icon={<MergeCellsOutlined />}
            title={`Ổ cứng: ${data.info?.hardDrive || textDefault}`}
          />
        );
        break;
      case 'monitorCard':
        tabList.push(
          <TagItem
            icon={<BoxPlotOutlined />}
            title={`Card màn hình: ${data.info?.monitorCard || textDefault}`}
          />
        );
        break;
      case 'screenSize':
        tabList.push(
          <TagItem
            icon={<PictureOutlined />}
            title={`Kích thước màn hình ${
              data.info?.screenSize || textDefault
            }`}
          />
        );
        break;

      default:
        break;
    }
  }
  return tabList;
};

export default renderTagItem;
