import React from 'react';
import { TimePicker } from 'antd';
import 'dayjs/locale/ko';
import dayjs, {Dayjs} from 'dayjs';
import { SchedulesProps } from '@/pages/scheduleregistration/ScheduleRegistrationPage';

interface TimeRangeProps {
  index: number;
  placeIndex: number;
  autoschedules: SchedulesProps[];
  setAutoSchedules: React.Dispatch<React.SetStateAction<SchedulesProps[]>>;
}

const TimeRange: React.FC<TimeRangeProps> = ({ index, placeIndex, setAutoSchedules, autoschedules }) => {
  
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

  const handleTimeChange = (index: number, placeIndex: number, times: [Dayjs | null, Dayjs | null] | null) => {
    if (times && times.length === 2 && times[0] && times[1]) {
      const arriveTime = times[0].format(format);
      const leaveTime = times[1].format(format);
  
      setAutoSchedules(prev => {
        const newSchedules = [...prev];
  
        if (index in newSchedules && placeIndex in newSchedules[index].places) {
          newSchedules[index].places[placeIndex] = {
            ...newSchedules[index].places[placeIndex],
            arriveTime,
            leaveTime
          };
        }
  
        return newSchedules;
      });
    }

    console.log(`${index} - ${placeIndex} arriveTime`, autoschedules[index].places[placeIndex].arriveTime);
    console.log(`${index} - ${placeIndex} leaveTime`, autoschedules[index].places[placeIndex].leaveTime);
  };

  return (
    <>
      <TimePicker.RangePicker
        {...disabledTime(dayjs(), 'start')}
        format={format}
        onChange={(times) => handleTimeChange(index, placeIndex, times)}
      />
    </>
  );
};

export default TimeRange;