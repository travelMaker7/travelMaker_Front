import React, { useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize'; // 필수 초기화
import 'react-dates/lib/css/_datepicker.css';
export const pureComponentAvailable = true;

const MyRangeCalendar: React.FC = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

  const handleDateChange = ({ startDate, endDate }: { startDate: any; endDate: any }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div>
      <DateRangePicker
        startDate={startDate}
        startDateId="start_date_id"
        endDate={endDate}
        endDateId="end_date_id"
        onDatesChange={handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
    </div>
  );
};

export default MyRangeCalendar;