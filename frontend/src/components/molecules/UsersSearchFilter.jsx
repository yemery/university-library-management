import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchFilter from "../atoms/SearchFilter";
import SelectFilter from "../atoms/SelectFilter";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../features/users/usersThunks";
import { usersSelectOptions } from "../../assets/filteringOptions";

function UsersSearchFilter() {
  const dispatch = useDispatch();

  const searchFilter = useFormik({
    initialValues: {
      user: "",
      role: "",
    },
    validationSchema: Yup.object({
      user: Yup.string(),
      role: Yup.string(),
    }),
    onSubmit: (values) => {
      const filters = {};
      if (values.user != "") {
        filters.user = values.user;
      }
      if (values.role != "") {
        filters.role = values.role;
      }
      dispatch(getUsers(filters));
    },
  });

  const handleClear = () => {
    searchFilter.resetForm();
    dispatch(getUsers());
  };

  return (
    <form className="flex gap-8" onSubmit={searchFilter.handleSubmit}>
      <SearchFilter
        search="User"
        name="user"
        value={searchFilter.values.user}
        change={searchFilter.handleChange}
      />
      <SelectFilter
        name="role"
        value={searchFilter.values.role}
        change={searchFilter.handleChange}
        options={usersSelectOptions}
      />
      <Button type="submit" className="bg-black text-white">
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
      <Button
        type="button"
        onClick={handleClear}
        className="bg-black text-white"
      >
        Clear
      </Button>
    </form>
  );
}

export default UsersSearchFilter;
