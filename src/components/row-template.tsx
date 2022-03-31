import { SETTINGS } from '../constants/settings';

export interface IRowItem {
  index: number;
  text: string;
}

export interface IRowTemplate {
  item: IRowItem;
}

export const RowTemplate = ({ item }: IRowTemplate): JSX.Element => {
  return (
    <div
      style={{ height: SETTINGS.itemHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      key={item.index}
    >
      {item.text}
    </div>
  );
};
