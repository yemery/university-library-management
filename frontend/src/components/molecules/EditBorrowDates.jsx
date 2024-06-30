import React from "react";
// import { Datepicker } from "flowbite-react";
import H5 from "../atoms/H5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import Button from "../atoms/Button";
const EditBorrowDates = () => {


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
    <form className="flex  flex-col gap-4" onSubmit={datesForm.handleSubmit}>
      <H5 label="Edit Borrow Dates" />
      <div className="mb-2 block ">
        <H5 label="Edit Borrow Date" />

        {/* <DatePicker selected={borrowDate} onSelect={(date) => setDates({ ...dates, borrowDate: date })  } /> */}
        <DatePicker
          name="borrowDate"
          selected={datesForm.values.borrowDate ? new Date(datesForm.values.borrowDate) : null}
          onChange={date => datesForm.setFieldValue('borrowDate', date)}
        />
        
      </div>
      <div className="mb-2 block">
        <H5 label="Edit Return Date" />

        {/* <DatePicker selected={returnDate} onSelect={(date) => setDates({ ...dates, returnDate: date })  } /> */}
        <DatePicker
        // wrapperClassName='date_picker full-width'
        style={{ width: '100%' }}
          name="returnDate"
          selected={datesForm.values.returnDate ? new Date(datesForm.values.returnDate) : null}
          onChange={date => datesForm.setFieldValue('returnDate', date)}
        />
      </div>
      <Button text="Submit" type="submit" />
    </form>
  );
};

export default EditBorrowDates;
