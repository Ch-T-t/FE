import { ICreatePost, IShop } from '@/types/Job';
import { createContext } from 'react';

export const CurrentFormContext = createContext<{
  currentForm?: string;
  setCurrentForm?: React.Dispatch<React.SetStateAction<string>>;
  currentLabel?: string;
  setCurrentLabel?: React.Dispatch<React.SetStateAction<string>>;
  currentCategoryId?: string | number;
  setCurrentCategoryId?: React.Dispatch<React.SetStateAction<string | number>>;
  currentLabelAdress?: string;
  setCurrentLabelAdress?: React.Dispatch<React.SetStateAction<string>>;
  currentData?: ICreatePost | undefined;
  setCurrentData?: React.Dispatch<
    React.SetStateAction<ICreatePost | undefined>
  >;
}>({});

export const CurrentShopDataContext = createContext<{
  currentData?: IShop | undefined;
  setCurrentData?: React.Dispatch<React.SetStateAction<IShop | undefined>>;
}>({});
