import React, { SetStateAction, useEffect, useState } from 'react';
import { TimePicker } from 'antd';
import 'dayjs/locale/ko';
import dayjs, {Dayjs} from 'dayjs';

interface TimeRangeProps {
  selectedTimeRange: [Dayjs | null, Dayjs | null] | null;
  setSelectedTimeRange: React.Dispatch<React.SetStateAction<[Dayjs | null, Dayjs | null] | null>>;
  handleTimeRangeChange: (value: [Dayjs | null, Dayjs | null] | null, dateString: string[]) => void;
}

const TimeRange: React.FC<TimeRangeProps> = ({ selectedTimeRange, setSelectedTimeRange, handleTimeRangeChange }) => {
  
  const format = 'HH:mm';
  
  const disabledTime = (current: Dayjs, type: 'start' | 'end') => {
    const now = dayjs();
    const startOfToday = dayjs().startOf('day');

    if (type === 'start') {
      return {
        disabledHours: () => range(0, now.hour()),
        disabledMinutes: () => (current.hour() === now.hour() ? range(0, now.minute()) : []),
      };
    }

    return {
      disabledHours: () => {
        if (current.isSame(startOfToday, 'day')) {
          return range(0, now.hour() + 1);
        }
        return [];
      },
      disabledMinutes: () => {
        if (current.isSame(startOfToday, 'day') && current.hour() === now.hour()) {
          return range(0, now.minute() + 1);
        }
        return [];
      },
    };
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  
  return (
    <>
      <TimePicker.RangePicker
        value={selectedTimeRange}
        {...disabledTime(dayjs(), 'start')}
        format={format}
        onChange={handleTimeRangeChange}
      />
    </>
  );
};

export default TimeRange;