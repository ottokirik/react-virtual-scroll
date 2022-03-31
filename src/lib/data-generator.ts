import { IRowItem } from '../components/row-template';

export const dataGenerator = (dataCount: number): IRowItem[] => {
  return [...Array(dataCount)].map((_, index) => ({ index, text: `Элемент № ${index}` }));
};
