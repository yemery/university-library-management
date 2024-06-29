import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchFilter from "../atoms/SearchFilter";
import SelectFilter from "../atoms/SelectFilter";
import { borrowSelectOptions } from "../../assets/filteringOptions";
import { Button } from "flowbite-react";

function BorrowsSearchFilter() {
  const searchFilter = useFormik({
    initialValues: {
      titlesearch: "",
      studentSearch: "",
      statusFilter: "",
    },
    validationSchema: Yup.object({
      titlesearch: Yup.string(),
      studentSearch: Yup.string(),
      statusFilter: Yup.string(),
    }),
    onSubmit: (values) => {
      // check at least one field should be filled
      if (
        values.titlesearch !== "" ||
        values.studentSearch !== "" ||
        values.statusFilter !== ""
      ) {
        console.log(values);
        // dispatch(searchFilterBorrows(values))
      }
    },
  });
  return (
    <form className="flex gap-8" onSubmit={searchFilter.handleSubmit}>
      <SearchFilter
        search="title"
        name="titlesearch"
        value={searchFilter.values.titlesearch}
        change={searchFilter.handleChange}
      />
      <SearchFilter
        search="author"
        name="studentSearch"
        value={searchFilter.values.studentSearch}
        change={searchFilter.handleChange}
      />
      <SelectFilter
        name="statusFilter"
        value={searchFilter.values.statusFilter}
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
    </form>
  );
}

export default BorrowsSearchFilter;
