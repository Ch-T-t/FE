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

// location?: string;
// category?: string;
// address?: string;
// career?: string;
// type_of_work?: string;
// pay_forms?: string;
// sex?: string;
// experience?: string;
// map?: string;
// title?: string;
// number_of_recruitment?: string;
// wage?: string;
// detailed_description?: string;
// minimum_age?: string;
// maximum_age?: string;
// video?: string;
// contact_phone_number?: string;
// url?: string;
// usage_status?: string;
// seller_information?: string;
// guarantee?: string;
// volume?: string;
// wattage?: string;
// washing_volume?: string;
// free_giveaway?: string;
// price?: string;
// company?: string;
// capacity?: string;
// map?: string | number;
// color?: string;
// microprocessor?: string;
// ram?: string;
// hardDrive?: string;
// monitorCard?: string;

const renderTagItem = (data: IPost) => {
  let tabList = [];
  for (let index = 0; index < Object.keys(data || {}).length; index++) {
    switch (Object.keys(data.info || {})[index]) {
      case 'posterInformation':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`posterInformation: ${
              data.info?.posterInformation || textDefault
            } `}
          />
        );
        break;
      case 'postedNews':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`postedNews: ${data.info?.postedNews || textDefault} `}
          />
        );
        break;
      case 'maxAge':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`maxAge: ${data.info?.maxAge || textDefault} `}
          />
        );
        break;
      case 'minAge':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`minAge: ${data.info?.minAge || textDefault} `}
          />
        );
        break;
      case 'workType':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`workType: ${data.info?.workType || textDefault} `}
          />
        );
        break;
      case 'recruitment':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`recruitment: ${data.info?.recruitment || textDefault} `}
          />
        );
        break;
      case 'numberBedrooms':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`numberBedrooms: ${
              data.info?.numberBedrooms || textDefault
            } `}
          />
        );
        break;
      case 'numberBathrooms':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`numberBathrooms: ${
              data.info?.numberBathrooms || textDefault
            } `}
          />
        );
        break;
      case 'walked':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`walked: ${data.info?.walked || textDefault} `}
          />
        );
        break;
      case 'seatNumber':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`seatNumber: ${data.info?.seatNumber || textDefault} `}
          />
        );
        break;
      case 'year_produce':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`year_produce: ${data.info?.year_produce || textDefault} `}
          />
        );
        break;
      case 'depositAmount':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`depositAmount: ${data.info?.depositAmount || textDefault} `}
          />
        );
        break;
      case 'screenSize':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`screenSize: ${data.info?.screenSize || textDefault} `}
          />
        );
        break;
      case 'acreage':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`acreage: ${data.info?.acreage || textDefault} `}
          />
        );
        break;
      case 'carGear':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`carFuel: ${data.info?.carGear || textDefault} `}
          />
        );
        break;
      case 'carFuel':
        tabList.push(
          <TagItem
            icon={<ScheduleOutlined />}
            title={`carFuel: ${data.info?.carFuel || textDefault} `}
          />
        );
        break;
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
