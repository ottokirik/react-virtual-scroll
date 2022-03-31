interface IRowItem {
  index: number;
  text: string;
}

export const RowTemplate = ({ item }: { item: IRowItem }): JSX.Element => {
  return <div key={item.index}>{item.text}</div>;
};
