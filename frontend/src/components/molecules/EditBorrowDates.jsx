import React from "react";
// import { Datepicker } from "flowbite-react";
import H5 from "../atoms/H5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
// import { set } from "react-datepicker/dist/date_utils";
const EditBorrowDates = () => {
  // nested for borrow date and return date
  const [dates, setDates] = useState({
    borrowDate: "",
    returnDate: "",
  });
  useEffect(() => {
    console.log(dates);
  }, [dates]);

  // added destructuring for borrow date and return date bcs it was not working
  const { borrowDate, returnDate } = dates;

  return (
    <div className="space-y-7">
      <H5 label="Edit Borrow Dates" />
      <div className="space-y-3">
        <H5 label="Edit Borrow Date" />
        <DatePicker selected={borrowDate} onSelect={(date) => setDates({ ...dates, borrowDate: date })  } />
        {/* <Datepicker inline /> */}
      </div>
      <div className="space-y-3">
        <H5 label="Edit Return Date" />
        <DatePicker selected={returnDate} onSelect={(date) => setDates({ ...dates, returnDate: date })  } />
      </div>
    </div>
  );
};

export default EditBorrowDates;
