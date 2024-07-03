import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import H5 from "../atoms/H5";
import { Button } from "flowbite-react";
import ErrorMessage from "../atoms/ErrorMessage";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUsers, importUsers } from "../../features/users/usersThunks";

function ImportUsers({ close }) {
  const dispatch = useDispatch();
  const importForm = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("Required")
        // checking the file type
        .test(
          "fileType",
          "Invalid file type",
          (value) =>
            value &&
            [
              "text/csv", // for .csv
            ].includes(value.type)
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", values.file);
      const response = await dispatch(importUsers(formData));
      if (response?.error?.code === "ERR_BAD_REQUEST") {
        toast.error("Error while importing users");
      } else {
        dispatch(getUsers());
        
        response.payload.count == response.payload.length
          ? toast.success(
              `${response.payload.count} of ${response.payload.length} users imported seccessfully`
            )
          : toast.warning(
              `${response.payload.count} of ${response.payload.length} users imported , users already exist in the database`
            );
      }
      close();
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={importForm.handleSubmit}>
      <H5 label={"Import users"} />
      <div className="flex flex-col gap-4">
        <input
          type="file"
          name="file"
          onChange={(e) => {
            importForm.setFieldValue("file", e.currentTarget.files[0]);
          }}
        />
        {importForm.errors.file && importForm.touched.file && (
          <ErrorMessage message={importForm.errors.file} />
        )}

        <Button type="submit" className="bg-black">
          Import
        </Button>
      </div>
    </form>
  );
}

export default ImportUsers;
