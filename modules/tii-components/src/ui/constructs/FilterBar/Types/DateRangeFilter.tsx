import {
  FilterBarResult,
  FilterBarViewProps as props,
} from "../../../../props";
import React from "react";
import { TIIRangePicker } from "../../../constructs";

export const DateRangeFilter = React.memo((item: any) => {
  const currPlaceHolders = item.placeholder?.split(",");
  const placeHolders: [string, string] =
    currPlaceHolders?.length == 2
      ? currPlaceHolders!
      : ["Start Date", "End Date"];
  return (
    <TIIRangePicker
      id={item.id}
      name={item.name}
      initialValue={item.initialValue}
      value={item.value}
      placeholder={placeHolders}
      size={"large"}
      {...item.addedProps}
    />
  );
});

export function handleDateRangeOk(
  finaldata: FilterBarResult,
  props: props,
  i: number,
  values: any
) {
  const startDate = values[props.fields[i].id]?.[0] ?? undefined;
  const endDate = values[props.fields[i].id]?.[1] ?? undefined;

  if (!!startDate) {
    finaldata[`${props.fields[i].id}StartDate`] =
      values[props.fields[i].id]?.[0];
  }
  if (!!endDate) {
    finaldata[`${props.fields[i].id}EndDate`] =
      values[props.fields[i].id]?.[1] ?? undefined;
  }
}
