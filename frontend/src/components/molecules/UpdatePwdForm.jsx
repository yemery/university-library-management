import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../../components/atoms/ErrorMessage";

const UpdatePwdForm = () => {
  const passwordUpdate = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "", // Added new field for newPassword
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required("Required")
        .min(8, "Min 8 characters"),
      newPassword: Yup.string() // Validation for newPassword
        .required("Required")
        .min(8, "Min 8 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords does not match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form
      className="flex max-w-md flex-col gap-4 mx-auto"
      onSubmit={passwordUpdate.handleSubmit}
    >
      <h2 className="text-center text-2xl font-bold mb-4">Update Password</h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="currentPassword" value="Your current password" />
        </div>
        <TextInput
          id="currentPassword"
          type="password"
          name="currentPassword"
          placeholder="Current password"
          value={passwordUpdate.values.currentPassword}
          onChange={passwordUpdate.handleChange}
          onBlur={passwordUpdate.handleBlur}
        />
        {passwordUpdate.touched.currentPassword &&
          passwordUpdate.errors.currentPassword && (
            <ErrorMessage message={passwordUpdate.errors.currentPassword} />
          )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="newPassword" value="Your new password" />
        </div>
        <TextInput
          id="newPassword"
          type="password"
          name="newPassword"
          placeholder="New password"
          value={passwordUpdate.values.newPassword}
          onChange={passwordUpdate.handleChange}
          onBlur={passwordUpdate.handleBlur}
        />
        {passwordUpdate.touched.newPassword &&
          passwordUpdate.errors.newPassword && (
            <ErrorMessage message={passwordUpdate.errors.newPassword} />
          )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirmPassword" value="Confirm your new password" />
        </div>
        <TextInput
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={passwordUpdate.values.confirmPassword}
          onChange={passwordUpdate.handleChange}
          onBlur={passwordUpdate.handleBlur}
        />
        {passwordUpdate.touched.confirmPassword &&
          passwordUpdate.errors.confirmPassword && (
            <ErrorMessage message={passwordUpdate.errors.confirmPassword} />
          )}
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="bg-black">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UpdatePwdForm;
