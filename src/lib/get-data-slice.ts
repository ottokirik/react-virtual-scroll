import { IRowItem } from '../components/row-template';
import { ISettings } from '../components/virtual-scroll';
import { SETTINGS } from '../constants/settings';
import { dataGenerator } from './data-generator';

const data = dataGenerator(SETTINGS.maxIndex);

// Функция, которая передается в virtual scroll. Задача функции запрашивать порцию данных у источника
export const getDataSlice = (offset: number, limit: number, settings: ISettings) => {
  const start = offset;
  const end = Math.min(settings.maxIndex, limit + offset - 1);

  return data.slice(start, end) ?? ([] as IRowItem[]);
};
