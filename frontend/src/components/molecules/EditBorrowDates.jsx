import React from "react";
// import { Datepicker } from "flowbite-react";
import H5 from "../atoms/H5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Button from "../atoms/Button";
import { updateBorrowRecord } from "../../features/borrow/borrowThunks";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorMessage from "../atoms/ErrorMessage";

const Editborrow_dates = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  // const borrow_date = useSelector((state) => state.borrows.borrow.borrow_date);
  // const return_date = useSelector((state) => state.borrows.borrow.return_date);

  const borrow = useSelector((state) => state.borrows.borrow);

  const datesForm = useFormik({
    initialValues: {
      borrow_date: borrow.borrow_date == null ? "" : borrow.borrow_date,
      return_date: borrow.return_date == null ? "" : borrow.return_date,
    },
    validationSchema: Yup.object({
      borrow_date: Yup.date().required("Required"),
      return_date: Yup.date()
        .required("Return date is required")
        .min(
          Yup.ref("borrow_date"),
          "Return date must be greater than borrow date"
        ),
    }),
    onSubmit: (values) => {
      const submitValues = {
        borrow_date: values.borrow_date
          ? new Date(values.borrow_date).toISOString()
          : null,
        return_date: values.return_date
          ? new Date(values.return_date).toISOString()
          : null,
      };

      dispatch(updateBorrowRecord({ id: borrow.id, ...submitValues }));
      navigator(0);
      // console.log(submitValues);
      // borrowthunk patch call
    },
  });

  return (
    <form className="flex  flex-col gap-4" onSubmit={datesForm.handleSubmit}>
      <H5 label="Edit Borrow Dates" />
      <div className="mb-2 block ">
        <H5 label="Edit Borrow Date" />

        {/* <DatePicker selected={borrow_date} onSelect={(date) => setDates({ ...dates, borrow_date: date })  } /> */}
        <DatePicker
          name="borrow_date"
          selected={
            datesForm.values.borrow_date
              ? new Date(datesForm.values.borrow_date)
              : null
          }
          onChange={(date) => datesForm.setFieldValue("borrow_date", date)}
        />
      </div>
      <div className="mb-2 block">
        <H5 label="Edit Return Date" />

        <DatePicker
          style={{ width: "100%" }}
          name="return_date"
          selected={
            datesForm.values.return_date
              ? new Date(datesForm.values.return_date)
              : null
          }
          onChange={(date) => datesForm.setFieldValue("return_date", date)}
        />
        {datesForm.errors.return_date && datesForm.touched.return_date && (
          <ErrorMessage message={datesForm.errors.return_date} />
        )}
      </div>
      <Button text="Submit" />
    </form>
  );
};

export default Editborrow_dates;
