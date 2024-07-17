import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({
  selectedDate,
  onChange,
  selectsStart,
  startDate,
  endDate,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      selectsStart={selectsStart}
      startDate={startDate}
      endDate={endDate}
      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
      required
    />
  );
};

export default Calendar;
