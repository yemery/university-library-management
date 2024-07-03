import React from "react";
import H5 from "../atoms/H5";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import ErrorMessage from "../atoms/ErrorMessage";
import Input from "../atoms/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectFilter from "../atoms/SelectFilter";
import { addUser, getUsers } from "../../features/users/usersThunks";
import { usersSelectOptions } from "../../assets/filteringOptions";
import { toast } from "react-toastify";

function AddUser({ close }) {
  const dispatch = useDispatch();

  const addUserForm = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
      role: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password is too short"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords does not match")
        .required("Required"),
      role: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      dispatch(addUser(values));
      toast.success("User added successfully");
      dispatch(getUsers());
      close();
      addUserForm.resetForm();
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={addUserForm.handleSubmit}>
      <H5 label={"Add user"} />
      <div className="flex flex-col gap-2">
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          value={addUserForm.values.email}
          onChange={addUserForm.handleChange}
          onBlur={addUserForm.handleBlur}
          name="email"
        />
        {addUserForm.touched.email && addUserForm.errors.email && (
          <ErrorMessage message={addUserForm.errors.email} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Input
          label="First name"
          type="text"
          placeholder="First name"
          value={addUserForm.values.first_name}
          onChange={addUserForm.handleChange}
          onBlur={addUserForm.handleBlur}
          name="first_name"
        />
        {addUserForm.touched.first_name && addUserForm.errors.first_name && (
          <ErrorMessage message={addUserForm.errors.first_name} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label="Last name"
          type="text"
          placeholder="Last name"
          value={addUserForm.values.last_name}
          onChange={addUserForm.handleChange}
          onBlur={addUserForm.handleBlur}
          name="last_name"
        />
        {addUserForm.touched.last_name && addUserForm.errors.last_name && (
          <ErrorMessage message={addUserForm.errors.last_name} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          value={addUserForm.values.password}
          onChange={addUserForm.handleChange}
          onBlur={addUserForm.handleBlur}
          name="password"
        />
        {addUserForm.touched.password && addUserForm.errors.password && (
          <ErrorMessage message={addUserForm.errors.password} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Input
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          value={addUserForm.values.confirm_password}
          onChange={addUserForm.handleChange}
          onBlur={addUserForm.handleBlur}
          name="confirm_password"
        />
        {addUserForm.touched.confirm_password &&
          addUserForm.errors.confirm_password && (
            <ErrorMessage message={addUserForm.errors.confirm_password} />
          )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          role
        </label>

        <SelectFilter
          name="role"
          value={addUserForm.values.role}
          change={addUserForm.handleChange}
          options={usersSelectOptions}
        />

        {addUserForm.touched.role && addUserForm.errors.role && (
          <ErrorMessage message={addUserForm.errors.role} />
        )}
      </div>

      <Button type="submit" className="bg-black">
        Add User
      </Button>
    </form>
  );
}

export default AddUser;
