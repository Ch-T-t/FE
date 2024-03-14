import TagItem from '@/components/common/TagItem';
import { IProduct } from '@/types/Job';
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

const renderTagItem = (data: IProduct) => {
  let tabList = [];
  for (let index = 0; index < Object.keys(data).length; index++) {
    switch (Object.keys(data)[index]) {
      case 'Usage_status':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`Tình trạng sử dụng: ${
              data.Usage_status?.Name || textDefault
            } `}
          />
        );
        break;
      case 'Seller_information':
        tabList.push(
          <TagItem
            icon={<UserOutlined />}
            title={`Thông tin người bán: ${
              data.Seller_information?.Name || textDefault
            }`}
          />
        );
        break;
      case 'Guarantee':
        tabList.push(
          <TagItem
            icon={<BarcodeOutlined />}
            title={`Bảo hành: ${data.Guarantee?.Name || textDefault}`}
          />
        );
        break;
      case 'Company':
        tabList.push(
          <TagItem
            icon={<AuditOutlined />}
            title={`Công ty: ${data.Company?.Name || textDefault}`}
          />
        );
        break;
      case 'Capacity':
        tabList.push(
          <TagItem
            icon={<AlertOutlined />}
            title={`Dung tích: ${data.Capacity?.Name || textDefault}`}
          />
        );
        break;
      case 'Volume':
        tabList.push(
          <TagItem
            icon={<FilterOutlined />}
            title={`Khối lượng: ${data.Volume?.Name || textDefault}`}
          />
        );
        break;
      case 'Wattage':
        tabList.push(
          <TagItem
            icon={<FunnelPlotOutlined />}
            title={`Công suất: ${data.Wattage?.Name || textDefault}`}
          />
        );
        break;
      case 'Washing_volume':
        tabList.push(
          <TagItem
            icon={undefined}
            title={`Khối lượng giặt: ${
              data.Washing_volume?.Name || textDefault
            }`}
          />
        );
        break;
      case 'Color':
        tabList.push(
          <TagItem
            icon={<BgColorsOutlined />}
            title={`Màu: ${data.Color?.Name || textDefault}`}
          />
        );
        break;
      case 'Microprocessor':
        tabList.push(
          <TagItem
            icon={<BorderInnerOutlined />}
            title={`Bộ vi xử lí: ${data.Microprocessor?.Name || textDefault}`}
          />
        );
        break;
      case 'Ram':
        tabList.push(
          <TagItem
            icon={<InsertRowBelowOutlined />}
            title={`Ram: ${data.Ram?.Name || textDefault}`}
          />
        );
        break;
      case 'HardDrive':
        tabList.push(
          <TagItem
            icon={<MergeCellsOutlined />}
            title={`Ổ cứng: ${data.HardDrive?.Name || textDefault}`}
          />
        );
        break;
      case 'MonitorCard':
        tabList.push(
          <TagItem
            icon={<BoxPlotOutlined />}
            title={`Card màn hình: ${data.MonitorCard?.Name || textDefault}`}
          />
        );
        break;
      case 'ScreenSize':
        tabList.push(
          <TagItem
            icon={<PictureOutlined />}
            title={`Kích thước màn hình ${
              data.ScreenSize?.Name || textDefault
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
