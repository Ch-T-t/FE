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
      case 'posterInformation':
        tabList.push(
          <TagItem
            key={index}
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
            key={index}
            icon="../tuoi_toi_thieu.png"
            title={`postedNews: ${data.info?.postedNews || textDefault} `}
          />
        );
        break;
      case 'maxAge':
        tabList.push(
          <TagItem
            key={index}
            icon="../tuoi_toi_da.png"
            title={`Tuổi tối đa: ${data.info?.maxAge || textDefault} `}
          />
        );
        break;
      case 'minAge':
        tabList.push(
          <TagItem
            key={index}
            icon="../tuoi_toi_thieu.png"
            title={`Tuổi tối thiệu: ${data.info?.minAge || textDefault} `}
          />
        );
        break;
      case 'workType':
        tabList.push(
          <TagItem
            key={index}
            icon="../loai_cong_viec.png"
            title={`Loại việc: ${data.info?.workType || textDefault} `}
          />
        );
        break;
      case 'pay_forms':
        tabList.push(
          <TagItem
            key={index}
            icon="../hinh_thuc_tra_luong.png"
            title={`Hình thức trả lương: ${data.info?.pay_forms || textDefault} `}
          />
        );
        break;
      case 'recruitment':
        tabList.push(
          <TagItem
            key={index}
            icon="../tuoi_toi_thieu.png"
            title={`Số lượng tuyển dụng: ${data.info?.recruitment || textDefault} `}
          />
        );
        break;
      case 'numberBedrooms':
        tabList.push(
          <TagItem
            key={index}
            icon="../so_phong.png"
            title={`Số phòng: ${data.info?.numberBedrooms || textDefault} `}
          />
        );
        break;
      case 'numberBathrooms':
        tabList.push(
          <TagItem
            key={index}
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
            key={index}
            icon="../tuoi_toi_thieu.png"
            title={`Đã đi: ${data.info?.walked || textDefault} `}
          />
        );
        break;
      case 'seatNumber':
        tabList.push(
          <TagItem
            key={index}
            icon="../cho_ngoi.png"
            title={`Số chỗ: ${data.info?.seatNumber || textDefault} `}
          />
        );
        break;
      case 'year_produce':
        tabList.push(
          <TagItem
            key={index}
            icon="../nam_sx.png"
            title={`Năm sản xuất: ${data.info?.year_produce || textDefault} `}
          />
        );
        break;
      case 'depositAmount':
        tabList.push(
          <TagItem
            key={index}
            icon="../so_tien_coc.png"
            title={`Số tiền cọc: ${data.info?.depositAmount || textDefault} `}
          />
        );
        break;
      case 'screenSize':
        tabList.push(
          <TagItem
            key={index}
            icon="../kich_thuoc_man_hinh.png"
            title={`Kích thước màn hình: ${data.info?.screenSize || textDefault} `}
          />
        );
        break;
      case 'acreage':
        tabList.push(
          <TagItem
            key={index}
            icon="../dien_tich.png"
            title={`Diện tích: ${data.info?.acreage || textDefault} `}
          />
        );
        break;
      case 'carGear':
        tabList.push(
          <TagItem
            key={index}
            icon="../hop_so.png"
            title={`Bánh xe: ${data.info?.carGear || textDefault} `}
          />
        );
        break;
      case 'carFuel':
        tabList.push(
          <TagItem
            key={index}
            icon="../nhien_lieu.png"
            title={`Nhiên liệu: ${data.info?.carFuel || textDefault} `}
          />
        );
        break;
      case 'usage_status':
        tabList.push(
          <TagItem
            key={index}
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
            key={index}
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
            key={index}
            icon="../bao_hanh.png"
            title={`Bảo hành: ${data.info?.capacity || textDefault}`}
          />
        );
        break;
      case 'company':
        tabList.push(
          <TagItem
            key={index}
            icon="../company.png"
            title={`Hãng: ${data.info?.company || textDefault}`}
          />
        );
        break;
      case 'capacity':
        tabList.push(
          <TagItem
            key={index}
            icon="../dung_tich.png"
            title={`Dung tích: ${data.info?.capacity || textDefault}`}
          />
        );
        break;
      case 'hardDrive':
        tabList.push(
          <TagItem
            key={index}
            icon="../dung_luong.png"
            title={`Dung lượng: ${data.info?.hardDrive || textDefault}`}
          />
        );
        break;
      case 'volume':
        tabList.push(
          <TagItem
            key={index}
            icon="../khoi_luong_giat.png"
            title={`Khối lượng: ${data.info?.volume || textDefault}`}
          />
        );
        break;
      case 'wattage':
        tabList.push(
          <TagItem
            key={index}
            icon="../cong_suat.png"
            title={`Công suất: ${data.info?.wattage || textDefault}`}
          />
        );
        break;
      case 'washing_volume':
        tabList.push(
          <TagItem
            key={index}
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
            key={index}
            icon="../mau_sac.png"
            title={`Màu sắc: ${data.info?.color || textDefault}`}
          />
        );
        break;
      case 'microprocessor':
        tabList.push(
          <TagItem
            key={index}
            icon="../cpu.png"
            title={`Bộ vi xử lí: ${data.info?.microprocessor || textDefault}`}
          />
        );
        break;
      case 'ram':
        tabList.push(
          <TagItem
            key={index}
            icon="../ram.png"
            title={`Ram: ${data.info?.ram || textDefault}`}
          />
        );
        break;

      case 'monitorCard':
        tabList.push(
          <TagItem
            key={index}
            icon="../card_man_hinh.png"
            title={`Card màn hình: ${data.info?.monitorCard || textDefault}`}
          />
        );
        break;
      case 'screenSize':
        tabList.push(
          <TagItem
            key={index}
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
            key={index}
            icon="../kinh_nghiem.png"
            title={`Kinh nghiệm: ${data.info?.experience || textDefault}`}
          />
        );
        break;
      case 'sex':
        tabList.push(
          <TagItem
            key={index}
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
