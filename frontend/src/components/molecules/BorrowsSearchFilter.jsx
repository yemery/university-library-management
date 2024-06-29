import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchFilter from "../atoms/SearchFilter";
import SelectFilter from "../atoms/SelectFilter";
import { borrowSelectOptions } from "../../assets/filteringOptions";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { borrowsList } from "../../features/borrow/borrowThunks";

function BorrowsSearchFilter() {
  const dispatch = useDispatch();
  const searchFilter = useFormik({
    initialValues: {
      title: "",
      user: "",
      status: "",
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      user: Yup.string(),
      status: Yup.string(),
    }),
    onSubmit: (values) => {
      const filters = {}
      if (values.title != "") {
        filters.title = values.title
      }
      if (values.user != "") {
        filters.user = values.user
      }
      if (values.status != "") {
        filters.status = values.status
      }
      dispatch(borrowsList(filters));
    },
  });
  
  const handleClear = () => {
    searchFilter.resetForm();
    dispatch(borrowsList());
  }
  return (
    <form className="flex gap-8" onSubmit={searchFilter.handleSubmit}>
      <SearchFilter
        search="title"
        name="title"
        value={searchFilter.values.title}
        change={searchFilter.handleChange}
      />
      <SearchFilter
        search="user"
        name="user"
        value={searchFilter.values.user}
        change={searchFilter.handleChange}
      />
      <SelectFilter
        name="status"
        value={searchFilter.values.status}
        change={searchFilter.handleChange}
        options={borrowSelectOptions}
      />
      <Button className="bg-black" type="submit">
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </Button>
      <Button className="bg-black" type="submit" onClick={handleClear}>
       clear
      </Button>
    </form>
  );
}

export default BorrowsSearchFilter;
