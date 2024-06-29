import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchFilter from "../atoms/SearchFilter";
import SelectFilter from "../atoms/SelectFilter";
import { booksSelectOptions } from "../../assets/filteringOptions";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { booksList } from "../../features/book/bookThunks";
function BooksSearchFilter() {
  const dispatch = useDispatch();

  const searchFilter = useFormik({
    initialValues: {
      title: "",
      author: "",
      statusFilter: "",
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      author: Yup.string(),
      statusFilter: Yup.string(),
    }),
    onSubmit: (values) => {
      // check at least one field should be filled
      if (
        values.title !== "" ||
        values.author !== "" ||
        values.statusFilter !== ""
      ) {
        if (values.statusFilter) {
          // if statusFilter is 1, then its value is true (available), else false (borrowed
          values.statusFilter = values.statusFilter == "1";
        }

        console.log(values);
        dispatch(booksList({title:"vv"}));
        // console.log(dispatch(booksList(values)));
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
        name="authorsearch"
        value={searchFilter.values.authorsearch}
        change={searchFilter.handleChange}
      />
      <SelectFilter
        name="statusFilter"
        value={searchFilter.values.statusFilter}
        change={searchFilter.handleChange}
        options={booksSelectOptions}
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

export default BooksSearchFilter;
