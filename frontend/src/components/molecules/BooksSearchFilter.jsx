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
      status: "",
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      author: Yup.string(),
      status: Yup.string(),
    }),
    onSubmit: (values) => {
      const filters = {}
      if (values.title != "") {
        filters.title = values.title
      }
      if (values.author != "") {
        filters.author = values.author
      }
      if (values.status != "") {
        filters.status = values.status
      }
      dispatch(booksList(filters));
    },
  });
  const handleClearBooks = () => {
    searchFilter.resetForm();
    dispatch(booksList());
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
        search="author"
        name="author"
        value={searchFilter.values.author}
        change={searchFilter.handleChange}
      />
      <SelectFilter
        name="status"
        value={searchFilter.values.status}
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
      <Button className="bg-black" type="submit" onClick={handleClearBooks}>
       clear
      </Button>
    </form>
  );
}

export default BooksSearchFilter;
