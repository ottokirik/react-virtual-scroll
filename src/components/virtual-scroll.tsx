import { useRef, useState, UIEvent } from 'react';
import { getDataSlice } from '../lib/get-data-slice';
import { IRowItem, IRowTemplate } from './row-template';

export interface ISettings {
  maxIndex: number; // Количество однородных элементов в данных
  itemHeight: number; // Высота элемента
  amount: number; // Количество видимых элементов
  tolerance: number; // Количество строк над и под видимой частью
}

interface IVirtualScroll {
  settings: ISettings;
  template: ({ item }: IRowTemplate) => JSX.Element;
  get: (offset: number, limit: number, settings: ISettings) => IRowItem[];
}

const setInitialState = (settings: ISettings) => {
  const { maxIndex, itemHeight, amount, tolerance } = settings;
  const viewPortHeight = amount * itemHeight; // Высота видимой области
  const totalHeight = maxIndex * itemHeight; // Общая высота контейнера
  const bufferedItems = amount + 2 * tolerance; // Количество элементов, которые не отображаются на странице, но присутствуют в данных
  const topPaddingHeight = 0;
  const bottomPaddingHeight = totalHeight - viewPortHeight;

  return {
    settings,
    viewPortHeight,
    totalHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    data: getDataSlice(0, bufferedItems, settings),
  };
};

export const VirtualScroll = ({ settings, template, get }: IVirtualScroll) => {
  const viewPortElement = useRef<HTMLDivElement>(null);

  const [state, setState] = useState(setInitialState(settings));

  const { viewPortHeight, data, bottomPaddingHeight, topPaddingHeight } = state;
  const RowTemplate = template;

  const handleScroll = ({ currentTarget: { scrollTop } }: UIEvent<HTMLDivElement>) => {
    const {
      totalHeight,
      bufferedItems,
      settings: { itemHeight, tolerance },
    } = state;

    const index = Math.max(Math.floor(scrollTop / itemHeight) - tolerance, 0);
    const data = get(index, bufferedItems, state.settings);
    const topPaddingHeight = index * itemHeight;
    const bottomPaddingHeight = totalHeight - topPaddingHeight - data.length * itemHeight;

    setState((prevState) => ({ ...prevState, topPaddingHeight, bottomPaddingHeight, data }));
  };

  return (
    <div
      ref={viewPortElement}
      style={{ height: viewPortHeight, overflow: 'auto', border: '1px solid #ccc', margin: '20px' }}
      onScroll={handleScroll}
    >
      <div style={{ height: topPaddingHeight }}></div>
      {data.map((item) => (
        <RowTemplate key={item.text} item={item} />
      ))}
      <div style={{ height: bottomPaddingHeight }}></div>
    </div>
  );
};
