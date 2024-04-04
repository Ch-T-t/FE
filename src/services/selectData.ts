import { IJob } from '@/types/Job';

const workCarrerData: IJob[] = [
  {
    name: 'Xây dựng',
  },
  {
    name: 'Năng lượng mặt trời',
  },
  {
    name: 'Nông nghiệp',
  },
  {
    name: 'Nhân viên phục vụ',
  },
  {
    name: 'Bán hàng',
  },
  {
    name: 'Chuyển chủ',
  },
];

const workPayMethodData: IJob[] = [
  {
    name: 'Theo giờ',
  },
  {
    name: 'Theo ngày',
  },
  {
    name: 'Theo tháng',
  },
  {
    name: 'Lương khoán',
  },
];

const workTypeData: IJob[] = [
  {
    name: '24h ( Trong ngày )',
  },
  {
    name: 'Toàn thời gian',
  },
  {
    name: 'Bán thời gian',
  },
  {
    name: 'Thời vụ',
  },
  {
    name: 'Làm theo ca',
  },
];

const genderData: IJob[] = [
  {
    name: 'Không yêu cầu',
  },
  {
    name: 'Nam',
  },
  {
    name: 'Nữ',
  },
];

const carCompanyData: IJob[] = [
  {
    name: 'Toyota',
  },
  {
    name: 'Honda',
  },
  {
    name: 'Nissan',
  },
  {
    name: 'Ford',
  },
  {
    name: 'Mitsubishi',
  },
  {
    name: 'Mazda',
  },
  {
    name: 'Chevrolet',
  },
  {
    name: 'Mercedes-Benz',
  },
  {
    name: 'Kia',
  },
  {
    name: 'Hãng khác',
  },
];

const motoCompanyData: IJob[] = [
  {
    name: 'Kymco',
  },
  {
    name: 'SYM',
  },
  {
    name: 'Yamaha',
  },
  {
    name: 'Hãng khác',
  },
];

const yearData: IJob[] = [
  ...Array(20)
    .fill(null)
    .map((_, index) => ({
      name: `Năm ${2005 + index}`,
    })),
  { name: 'Trước năm 2005' },
];

const carGearData: IJob[] = [
  {
    name: 'Tự động',
  },
  {
    name: 'Số sàn',
  },
];

const carFuelData: IJob[] = [
  {
    name: 'Xăng',
  },
  {
    name: 'Dầu',
  },
  {
    name: 'Điện',
  },
];
const usageStatusData: IJob[] = [
  {
    name: 'Đã sử dụng',
  },
  {
    name: 'Mới',
  },
];
const sellerInformationData: IJob[] = [
  {
    name: 'Cá nhân',
  },
  {
    name: 'Bán chuyên',
  },
];
const motoCapacityData: IJob[] = [
  {
    name: '<50 cc',
  },
  {
    name: '50 - 100 cc',
  },
  {
    name: '100 - 175 cc',
  },
  {
    name: '> 175 cc',
  },
];

const colorData: IJob[] = [
  {
    name: 'Xanh',
  },
  {
    name: 'Đỏ',
  },
  {
    name: 'Tím',
  },
  {
    name: 'Vàng',
  },
  {
    name: 'Màu khác',
  },
];

const laptopCompanyData: IJob[] = [
  {
    name: 'Apple',
  },
  {
    name: 'Acer',
  },
  {
    name: 'Dell',
  },
  {
    name: 'MSI',
  },
  {
    name: 'Asus',
  },
  {
    name: 'HP',
  },
  {
    name: 'Samsung',
  },
  {
    name: 'Lenovo',
  },
  {
    name: 'Khác',
  },
];

const phoneCompanyData: IJob[] = [
  {
    name: 'Apple',
  },
  {
    name: 'Samsung',
  },
  {
    name: 'Oppo',
  },
  {
    name: 'Nokia',
  },
  {
    name: 'Sony',
  },
  {
    name: 'Realme',
  },
  {
    name: 'Khác',
  },
];

const laptopRamData: IJob[] = [
  {
    name: '4 GB',
  },
  {
    name: '6 GB',
  },
  {
    name: '8 GB',
  },
  {
    name: '16 GB',
  },
  {
    name: '32 GB',
  },
  {
    name: '> 32 GB',
  },
];

const laptopCardData: IJob[] = [
  {
    name: 'Onboard',
  },
  {
    name: 'AMD',
  },
  {
    name: 'NVIDIA',
  },
  {
    name: 'Khác',
  },
];

const laptopScreenSizeData: IJob[] = [
  {
    name: '9 inch',
  },
  {
    name: '9 - 10.9 inch',
  },
  {
    name: '11 - 12.9 inch',
  },
  {
    name: '13 - 14.9 inch',
  },
  {
    name: '17 - 18.9 inch',
  },
  {
    name: '19 - 20.9 inch',
  },
];

const goodHouseUsageStatus: IJob[] = [
  {
    name: 'Nội thất đầy đủ',
  },
  {
    name: 'Nội thất cao cấp',
  },
  {
    name: 'Nhà trống',
  },
];

const guaranteeData: IJob[] = [
  {
    name: 'Hết bảo hành',
  },
  {
    name: '1 tháng',
  },
  {
    name: '2 tháng',
  },
  {
    name: '3 tháng',
  },
  {
    name: '4-6 tháng',
  },
  {
    name: '7-12 tháng',
  },
  {
    name: 'Còn bảo hành',
  },
];

const fridgeVolumeData: IJob[] = [
  {
    name: '< 100 lít',
  },
  {
    name: '100 -149 lít',
  },
  {
    name: '150 - 199 lít',
  },
  {
    name: '200 - 299 lít',
  },
  {
    name: '300 - 399 lít',
  },
  {
    name: '> 400 lít',
  },
];

const fridgeWattageData: IJob[] = [
  {
    name: '1 HP',
  },
  {
    name: '1.5 HP',
  },
  {
    name: '2 HP',
  },
  {
    name: '> 2 HP',
  },
  {
    name: 'Khác',
  },
];

const washingWeightData: IJob[] = [
  {
    name: '< 7 kg>',
  },
  {
    name: '7 - 7.9 kg',
  },
  {
    name: '8 - 8.9 kg',
  },
  {
    name: '9 - 9.9 kg',
  },
  {
    name: '> 10 kg',
  },
];

const selectData = {
  workCarrerData,
  workPayMethodData,
  workTypeData,
  genderData,
  carCompanyData,
  motoCompanyData,
  yearData,
  carGearData,
  carFuelData,
  usageStatusData,
  sellerInformationData,
  motoCapacityData,
  colorData,
  laptopCompanyData,
  laptopRamData,
  laptopCardData,
  laptopScreenSizeData,
  goodHouseUsageStatus,
  guaranteeData,
  fridgeVolumeData,
  fridgeWattageData,
  washingWeightData,
  phoneCompanyData,
};

export default selectData;
