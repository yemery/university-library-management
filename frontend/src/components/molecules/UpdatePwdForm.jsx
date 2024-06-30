import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../../components/atoms/ErrorMessage";
const UpdatePwdForm = () => {
  const passwordUpdate = useFormik({
    initialValues: {
      currentPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Required").min(8, "Min 8 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("currentPassword"), null], "Passwords does not match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={passwordUpdate.handleSubmit}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          name="currentPassword"
          placeholder="current password"
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
          <Label htmlFor="confirmation" value="Your password confirmation" />
        </div>
        <TextInput
          id="confirmation"
          type="password"
          name="confirmPassword"
          placeholder="password confirmation"
          value={passwordUpdate.values.confirmPassword}
          onChange={passwordUpdate.handleChange}
          onBlur={passwordUpdate.handleBlur}
        />
         {passwordUpdate.touched.confirmPassword &&
            passwordUpdate.errors.confirmPassword && (
              <ErrorMessage message={passwordUpdate.errors.confirmPassword} />
            )}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default UpdatePwdForm;
