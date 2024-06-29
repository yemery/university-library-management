import React from "react";
// import { Datepicker } from "flowbite-react";
import H5 from "../atoms/H5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState,useEffect } from "react";
// import { set } from "react-datepicker/dist/date_utils";
const EditBorrowDates = () => {
    // nested for borrow date and return date
    const [dates, setDates] = useState({
        borrowDate: new Date(),
        returnDate: new Date(),
    },);
    useEffect(() => {
    console.log(dates);

    }, [dates])
  
    // added destructuring for borrow date and return date bcs it was not working 
    const { borrowDate, returnDate } = dates; 

  return (
    <div className="space-y-7">
      <H5 label="Edit Borrow Dates" />
      <div className="space-y-3">
        <H5 label="Edit Borrow Date" />
        <DatePicker selected={borrowDate} onChange={(date) => setDates({ ...dates, borrowDate: date })  } />

      </div>
      <div className="space-y-3">
        <H5 label="Edit Return Date" />
        <DatePicker selected={returnDate} onChange={(date) => setDates({ ...dates, returnDate: date })} />
       

      </div>
      

    </div>
  );
};

export default EditBorrowDates;
