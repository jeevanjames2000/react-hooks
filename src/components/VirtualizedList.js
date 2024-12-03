import React, { memo } from "react";
import { FixedSizeList as List } from "react-window";
const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);

const ListItem = memo(
  ({ index, style, data }) => {
    // console.log(`Rendering item at index: ${index}`);
    return <div style={style}>{data[index]}</div>;
  },
  (prevProps, nextProps) => {
    const isEqual =
      prevProps.index === nextProps.index &&
      prevProps.style === nextProps.style &&
      prevProps.data === nextProps.data;
    if (!isEqual) console.log("Props changed for index:", nextProps.index);
    return isEqual;
  }
);
const VirtualizedList = () => {
  return (
    <List
      height={400}
      width="100%"
      itemCount={items.length}
      itemSize={35}
      itemData={items}
      style={{ border: "1px solid black" }}
    >
      {ListItem}
    </List>
  );
};
export default VirtualizedList;
