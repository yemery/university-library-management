import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import H5 from "../atoms/H5";
import { Button } from "flowbite-react";
import ErrorMessage from "../atoms/ErrorMessage";
import { usersSelectOptions } from "../../assets/filteringOptions";
import SelectFilter from "../atoms/SelectFilter";
import { toast } from "react-toastify";
import { exportUsers } from "../../features/users/usersThunks";

function ExportUsers({ close }) {
  const dispatch = useDispatch();
  const exportForm = useFormik({
    initialValues: {
      role: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(exportUsers({ role: values.role }));
      close();
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={exportForm.handleSubmit}>
      <H5 label={"Export users"} />
      <div className="flex flex-col gap-4">
        <SelectFilter
          name="role"
          value={exportForm.values.role}
          change={exportForm.handleChange}
          options={[...usersSelectOptions, { value: "all", label: "All" }]}
        />
        {exportForm.errors.role && exportForm.touched.role && (
          <ErrorMessage message={exportForm.errors.role} />
        )}
        <Button
          type="submit"
          className="w-80 bg-black  hover:opacity-75 text-white"
        >
          Export
        </Button>
      </div>
    </form>
  );
}

export default ExportUsers;
