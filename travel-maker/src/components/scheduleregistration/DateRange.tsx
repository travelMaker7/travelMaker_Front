import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko'
import { useState } from 'react';

const { RangePicker } = DatePicker;
dayjs.locale('ko');

// interface DateRangeProps {
//   selectedRange: [Dayjs | null, Dayjs | null] | null;
//   setSelectedRange: (value: [Dayjs | null, Dayjs | null] | null) => void;
//   handleRangeChange: () => void;
// }

const DateRange: React.FC = () => {

  const [selectedRange, setSelectedRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [dayCnt, SetDayCnt] = useState<number | null>(null);


  const calcDayCnt = (selectedRange: [Dayjs | null, Dayjs | null] | null) => {
    if (selectedRange !== null && selectedRange[0] !== null && selectedRange[1] !== null) {
      let startDay = selectedRange[0];
      let endDay = selectedRange[1];
      let calcDay = startDay.diff(endDay, 'day');
      SetDayCnt(calcDay);
    } else return
  }

  const handleRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setSelectedRange(dates);
    calcDayCnt(dates);
  };

  const disabledDate = (current: Dayjs | null) => {
    if (current === null) return false;
    return current && dayjs(current).isBefore(dayjs(), 'day');
  };

  return (
    <>
      <RangePicker
        format="YYYY-MM-DD"
        value={selectedRange}
        onChange={handleRangeChange}
        disabledDate={disabledDate}
      />
    </>
  );
};

export default DateRange;

