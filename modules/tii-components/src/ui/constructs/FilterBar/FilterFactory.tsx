import {
  StringFilter,
  ArrayFilter,
  NumberFilter,
  TreeFilter,
  NumberRangeFilter,
  DateRangeFilter,
} from "./Types";

export const FilterFactory = (item: any) => {
  switch (item.item.type) {
    case "string":
      return <StringFilter {...item.item} />;
    case "array":
      return <ArrayFilter {...item.item} />;
    case "number":
      return <NumberFilter {...item.item} />;
    case "tree":
      return <TreeFilter {...item.item} />;
    case "numberRange":
      return <NumberRangeFilter {...item.item} />;
    case "dateRange":
      return <DateRangeFilter {...item.item} />;
    default:
      return <StringFilter {...item.item} />;
  }
};
