import CreateCommonForm from '@/components/common/Form/CreateCommonForm';
import CreatePostAirConditionForm from '@/components/common/Form/CreatePostAirConditionForm';
import CreatePostBusinessPremisesForm from '@/components/common/Form/CreatePostBusinessPremisesForm';
import CreatePostCarForm from '@/components/common/Form/CreatePostCarForm';
import CreatePostCommonVehicleForm from '@/components/common/Form/CreatePostCommonVehicleForm';
import CreatePostDesktopForm from '@/components/common/Form/CreatePostDesktopForm';
import CreatePostElectronicDeviceForm from '@/components/common/Form/CreatePostElectronicDeviceForm';
import CreatePostFridgeForm from '@/components/common/Form/CreatePostFridgeForm';
import CreatePostHomeApplianceForm from '@/components/common/Form/CreatePostHomeApplianceForm';
import CreatePostLaptopForm from '@/components/common/Form/CreatePostLaptopForm';
import CreatePostMachineryEquipmentForm from '@/components/common/Form/CreatePostMachineryEquipmentForm';
import CreatePostMotobikeForm from '@/components/common/Form/CreatePostMotobikeForm';
import CreatePostPhoneForm from '@/components/common/Form/CreatePostPhoneForm';
import CreatePostServiceForm from '@/components/common/Form/CreatePostServiceForm';
import CreatePostTabletForm from '@/components/common/Form/CreatePostTabletForm';
import CreatePostTaxiForm from '@/components/common/Form/CreatePostTaxiForm';
import CreatePostWholeHouse from '@/components/common/Form/CreatePostWholeHouse';
import CreatePostWorkForm from '@/components/common/Form/CreatePostWorkForm';

const getFormByKey = (key: string, data?: any, edit?: boolean) => {
  switch (key) {
    case 'BUSINESS_PREMISES':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'OWN_HOUSE':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'EARPHONE':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'LOUDSPEAKER':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'MONITOR':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'HOUSE':
      return <CreatePostWholeHouse data={data} edit={edit} />;
    case 'FURNITURE':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'HOUSEHOLD_APPLIANCES':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'INSTALLATION':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'AIR_TICKET':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'TRANSPORT':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'OTHER':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'FAN':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'BUSINESS_PREMISES':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'STOVE':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'CLOCK':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'CAR':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'MOTEL_ROOM':
      return <CreatePostWholeHouse data={data} edit={edit} />;
    case 'WHOLE-HOUSE':
      return <CreatePostWholeHouse data={data} edit={edit} />;
    case 'BUSINESS-PREMISES':
      return <CreatePostBusinessPremisesForm data={data} edit={edit} />;
    case 'FRIDGE':
      return <CreatePostFridgeForm data={data} edit={edit} />;
    case 'AIR-CONDITIONING':
      return <CreatePostAirConditionForm data={data} edit={edit} />;
    case 'WASHING-MACHINE':
      return <CreatePostFridgeForm data={data} edit={edit} />;
    case 'MOTORBIKE':
      return <CreatePostMotobikeForm data={data} edit={edit} />;
    case 'VEHICLE':
      return <CreatePostCommonVehicleForm data={data} edit={edit} />;
    case 'TRAM':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'BICYCLE':
      return <CreatePostCommonVehicleForm data={data} edit={edit} />;
    case 'PHONE':
      return <CreatePostPhoneForm data={data} edit={edit} />;
    case 'LAPTOP':
      return <CreatePostLaptopForm data={data} edit={edit} />;
    case 'TABLET':
      return <CreatePostTabletForm data={data} edit={edit} />;
    case 'PC':
      return <CreatePostDesktopForm data={data} edit={edit} />;
    case 'COMMON-ELECTRONICE-DEVICE':
      return <CreatePostElectronicDeviceForm data={data} edit={edit} />;
    case 'ELECTRONIC':
      return <CreatePostElectronicDeviceForm data={data} edit={edit} />;
    case 'SERVICES':
      return <CreatePostServiceForm data={data} edit={edit} />;
    case 'COMMON':
      return <CreateCommonForm data={data} edit={edit} />;
    case 'COMMON-FURNITURE-APPLIANCES':
      return <CreatePostHomeApplianceForm data={data} edit={edit} />;
    case 'COMMON-VIETSHOP':
      return;
    case 'MACHINE':
      return <CreatePostMachineryEquipmentForm data={data} edit={edit} />;
    case 'MACHINES':
      return <CreatePostMachineryEquipmentForm data={data} edit={edit} />;
    case 'WORKER':
      return <CreatePostWorkForm data={data} edit={edit} />;
    case 'TAXI':
      return <CreatePostTaxiForm data={data} edit={edit} />;
    // case 'CAR':
    //   return;
    // case 'CAR':
    //   return;

    default:
      return null;
  }
};
export default getFormByKey;
