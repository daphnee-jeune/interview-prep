import { memo, useMemo } from "react";

const ParentComponent1 = ({ items }: { items: string[] }) => {
  const sortedItems = items.sort();
  return (
    <ul>
      {sortedItems.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};
type TableItemsProps = {
  items: string[];
};
const ParentComponent2 = memo(({ items }: TableItemsProps) => {
  const sortedItems = useMemo(() => items.sort(), [items]);

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
});
// Always create types for props
// Memoize (React.memo) the expensive component results so that it only re-renderes when the items change
// Memoize (useMemo) ensure the sorting only happens when the items change
// Avoid using (index) for the key prop in list items
export default { ParentComponent1, ParentComponent2 };
