import { DatePicker, Form, Input, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import { useState, useEffect } from "react";

type TIIRangePickersProps = {
  id: string;
  name: string;
  value?: [moment.Moment | null, moment.Moment | null];
  initialValue?: [moment.Moment | null, moment.Moment | null];
  placeholder?: [string, string];
} & RangePickerProps;

export const TIIRangePicker = (prop: TIIRangePickersProps) => {
  const form = Form.useFormInstance();
  const [dateRange, setDateRange] = useState<
    [moment.Moment | null, moment.Moment | null]
  >(prop.initialValue!);
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const handleRangeChange = (dates: any) => {
    setDateRange(dates);
  };

  const handleOpenChange = (status: boolean) => {
    setOpen(status);
  };

  useEffect(() => {
    if (dateRange && !!dateRange[0] && !!!dateRange[1]) {
      setDateRange([dateRange[0], dateRange[0]]);
      setOpen(false);
    }
    const offsetMinutes = moment().utcOffset();
    const absoluteOffset = Math.abs(offsetMinutes);
    const hours = Math.floor(absoluteOffset / 60);
    const minutes = absoluteOffset % 60;
    const sign = offsetMinutes < 0 ? "-" : "+";
    const formattedOffset =
      sign +
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0");

    const formattedDates = dateRange?.map((i, index) =>
      !!i
        ? (index === 0 ? i.startOf("day") : i.endOf("day")).format(
            "YYYY-MM-DDTHH:mm:ss"
          ) + formattedOffset
        : undefined
    );
    form.setFieldValue(prop.id, formattedDates);
  }, [dateRange]);

  return (
    <>
      {/* The style in this typography tag is inherited from the form item's label */}
      <Typography children={prop.name} style={{ padding: "0 0 8px" }} />
      <DatePicker.RangePicker
        {...prop}
        // This style is obtained from the form item which provides default margin bottom
        style={{ marginBottom: "24px" }}
        defaultValue={prop.value}
        open={open}
        value={dateRange}
        onCalendarChange={handleRangeChange}
        onOpenChange={handleOpenChange}
        placeholder={prop.placeholder ?? undefined}
      />
      <Form.Item name={prop.id} initialValue={prop.initialValue} noStyle>
        <Input hidden />
      </Form.Item>
    </>
  );
};
