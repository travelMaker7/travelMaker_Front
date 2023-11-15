import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko'

const { RangePicker } = DatePicker;
dayjs.locale('ko');

interface DateRangeProps {
  selectedRange: [Dayjs | null, Dayjs | null] | null;
  setSelectedRange: (value: [Dayjs | null, Dayjs | null] | null) => void;
  handleRangeChange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
  calcDayCnt: (selectedRange: [Dayjs | null, Dayjs | null] | null) => void;
  dayCnt: number | null;
  disabledDate: (current: Dayjs | null) => boolean;
}

const DateRange: React.FC<DateRangeProps> = ({ selectedRange, handleRangeChange, disabledDate }) => {  

  return (
    <>
      <RangePicker
        format="YYYY-MM-DD"
        value={selectedRange}
        onChange={(selectedRange) => handleRangeChange(selectedRange)}
        disabledDate={disabledDate}
      />
    </>
  );
};

export default DateRange;

