import React from "react";
// import { Datepicker } from "flowbite-react";
import H5 from "../atoms/H5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import Button from "../atoms/Button";
// import { set } from "react-datepicker/dist/date_utils";
const EditBorrowDates = () => {
  // nested for borrow date and return date
  // const [dates, setDates] = useState({
  //   borrowDate: "",
  //   returnDate: "",
  // });
  // useEffect(() => {
  //   console.log(dates);
  // }, [dates]);

  // added destructuring for borrow date and return date bcs it was not working
  // const { borrowDate, returnDate } = dates;

  const borrowDate = useSelector((state) => state.borrows.borrow.borrow_date);
  const returnDate = useSelector((state) => state.borrows.borrow.return_date);

  const datesForm = useFormik({
    initialValues: {
      borrowDate: borrowDate == null ? "" : borrowDate,
      returnDate: returnDate == null ? "" : returnDate,
    },
    onSubmit: (values) => {
      const submitValues = {
        borrowDate: values.borrowDate ? new Date(values.borrowDate).toISOString() : null,
        returnDate: values.returnDate ? new Date(values.returnDate).toISOString() : null,
      };
      console.log(submitValues);
      // borrowthunk patch call
    },
  });

  return (
    <form className="space-y-7" onSubmit={datesForm.handleSubmit}>
      <H5 label="Edit Borrow Dates" />
      <div className="space-y-3">
        <H5 label="Edit Borrow Date" />

        {/* <DatePicker selected={borrowDate} onSelect={(date) => setDates({ ...dates, borrowDate: date })  } /> */}
        <DatePicker
          name="borrowDate"
          selected={datesForm.values.borrowDate ? new Date(datesForm.values.borrowDate) : null}
          onChange={date => datesForm.setFieldValue('borrowDate', date)}
        />
        
      </div>
      <div className="space-y-3">
        <H5 label="Edit Return Date" />

        {/* <DatePicker selected={returnDate} onSelect={(date) => setDates({ ...dates, returnDate: date })  } /> */}
        <DatePicker
          name="returnDate"
          selected={datesForm.values.returnDate ? new Date(datesForm.values.returnDate) : null}
          onChange={date => datesForm.setFieldValue('returnDate', date)}
        />
      </div>

      <Button text="Submit" />
    </form>
  );
};

export default EditBorrowDates;
