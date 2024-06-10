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
            icon="../tuoi_toi_thieu.png"
            title={`posterInformation: ${
              data.info?.posterInformation || textDefault
            } `}
          />
        );
        break;
      case 'postedNews':
        tabList.push(
          <TagItem
            icon="../tuoi_toi_thieu.png"
            title={`postedNews: ${data.info?.postedNews || textDefault} `}
          />
        );
        break;
      case 'maxAge':
        tabList.push(
          <TagItem
            icon="../tuoi_toi_da.png"
            title={`Tuổi tối đa: ${data.info?.maxAge || textDefault} `}
          />
        );
        break;
      case 'minAge':
        tabList.push(
          <TagItem
            icon="../tuoi_toi_thieu.png"
            title={`Tuổi tối thiệu: ${data.info?.minAge || textDefault} `}
          />
        );
        break;
      case 'workType':
        tabList.push(
          <TagItem
            icon="../loai_cong_viec.png"
            title={`Loại việc: ${data.info?.workType || textDefault} `}
          />
        );
        break;
      case 'pay_forms':
        tabList.push(
          <TagItem
            icon="../hinh_thuc_tra_luong.png"
            title={`Hình thức trả lương: ${data.info?.pay_forms || textDefault} `}
          />
        );
        break;
      case 'recruitment':
        tabList.push(
          <TagItem
            icon="../tuoi_toi_thieu.png"
            title={`Số lượng tuyển dụng: ${data.info?.recruitment || textDefault} `}
          />
        );
        break;
      case 'numberBedrooms':
        tabList.push(
          <TagItem
            icon="../so_phong.png"
            title={`Số phòng: ${data.info?.numberBedrooms || textDefault} `}
          />
        );
        break;
      case 'numberBathrooms':
        tabList.push(
          <TagItem
            icon="../toliet.png"
            title={`Phòng vệ sinh: ${
              data.info?.numberBathrooms || textDefault
            } `}
          />
        );
        break;
      case 'walked':
        tabList.push(
          <TagItem
            icon="../tuoi_toi_thieu.png"
            title={`Đã đi: ${data.info?.walked || textDefault} `}
          />
        );
        break;
      case 'seatNumber':
        tabList.push(
          <TagItem
            icon="../cho_ngoi.png"
            title={`Số chỗ: ${data.info?.seatNumber || textDefault} `}
          />
        );
        break;
      case 'year_produce':
        tabList.push(
          <TagItem
            icon="../nam_sx.png"
            title={`Năm sản xuất: ${data.info?.year_produce || textDefault} `}
          />
        );
        break;
      case 'depositAmount':
        tabList.push(
          <TagItem
            icon="../so_tien_coc.png"
            title={`Số tiền cọc: ${data.info?.depositAmount || textDefault} `}
          />
        );
        break;
      case 'screenSize':
        tabList.push(
          <TagItem
            icon="../kich_thuoc_man_hinh.png"
            title={`Kích thước màn hình: ${data.info?.screenSize || textDefault} `}
          />
        );
        break;
      case 'acreage':
        tabList.push(
          <TagItem
            icon="../dien_tich.png"
            title={`Diện tích: ${data.info?.acreage || textDefault} `}
          />
        );
        break;
      case 'carGear':
        tabList.push(
          <TagItem
            icon="../hop_so.png"
            title={`Bánh xe: ${data.info?.carGear || textDefault} `}
          />
        );
        break;
      case 'carFuel':
        tabList.push(
          <TagItem
            icon="../nhien_lieu.png"
            title={`Nhiên liệu: ${data.info?.carFuel || textDefault} `}
          />
        );
        break;
      case 'usage_status':
        tabList.push(
          <TagItem
            icon="../tinh_trang_su_dung.png"
            title={`Tình trạng sử dụng: ${
              data.info?.usage_status || textDefault
            } `}
          />
        );
        break;
      case 'seller_information':
        tabList.push(
          <TagItem
            icon="../nghanh_nghe.png"
            title={`Thông tin người bán: ${
              data.info?.seller_information || textDefault
            }`}
          />
        );
        break;
      case 'guarantee':
        tabList.push(
          <TagItem
            icon="../bao_hanh.png"
            title={`Bảo hành: ${data.info?.capacity || textDefault}`}
          />
        );
        break;
      case 'company':
        tabList.push(
          <TagItem
            icon="../company.png"
            title={`Hãng: ${data.info?.company || textDefault}`}
          />
        );
        break;
      case 'capacity':
        tabList.push(
          <TagItem
            icon="../dung_tich.png"
            title={`Dung tích: ${data.info?.capacity || textDefault}`}
          />
        );
        break;
      case 'hardDrive':
        tabList.push(
          <TagItem
            icon="../dung_luong.png"
            title={`Dung lượng: ${data.info?.hardDrive || textDefault}`}
          />
        );
        break;
      case 'volume':
        tabList.push(
          <TagItem
            icon="../khoi_luong_giat.png"
            title={`Khối lượng: ${data.info?.volume || textDefault}`}
          />
        );
        break;
      case 'wattage':
        tabList.push(
          <TagItem
            icon="../cong_suat.png"
            title={`Công suất: ${data.info?.wattage || textDefault}`}
          />
        );
        break;
      case 'washing_volume':
        tabList.push(
          <TagItem
            icon="../khoi_luong_giat.png"
            title={`Khối lượng giặt: ${
              data.info?.washing_volume || textDefault
            }`}
          />
        );
        break;
      case 'color':
        tabList.push(
          <TagItem
            icon="../mau_sac.png"
            title={`Màu sắc: ${data.info?.color || textDefault}`}
          />
        );
        break;
      case 'microprocessor':
        tabList.push(
          <TagItem
            icon="../cpu.png"
            title={`Bộ vi xử lí: ${data.info?.microprocessor || textDefault}`}
          />
        );
        break;
      case 'ram':
        tabList.push(
          <TagItem
            icon="../ram.png"
            title={`Ram: ${data.info?.ram || textDefault}`}
          />
        );
        break;

      case 'monitorCard':
        tabList.push(
          <TagItem
            icon="../card_man_hinh.png"
            title={`Card màn hình: ${data.info?.monitorCard || textDefault}`}
          />
        );
        break;
      case 'screenSize':
        tabList.push(
          <TagItem
            icon="../kich_thuoc_man_hinh.png"
            title={`Kích thước màn hình: ${
              data.info?.screenSize || textDefault
            }`}
          />
        );
        break;
      case 'experience':
        tabList.push(
          <TagItem
            icon="../kinh_nghiem.png"
            title={`Kinh nghiệm: ${data.info?.experience || textDefault}`}
          />
        );
        break;
      case 'sex':
        tabList.push(
          <TagItem
            icon="../gioi_tinh.png"
            title={`Giới tính: ${data.info?.sex || textDefault}`}
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
