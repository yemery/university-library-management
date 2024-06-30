import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../features/auth/authThunks";

const UpdatePwdForm = () => {
  const dispatch = useDispatch();

  const passwordUpdate = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("Required"),
      // .min(8, "Min 8 characters"), commented just for testing
      new_password: Yup.string().required("Required"),
      // .min(8, "Min 8 characters"), commented just for testing
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords does not match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(updatePassword(values));
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
          <Label htmlFor="old_password" value="Your current password" />
        </div>
        <TextInput
          id="old_password"
          type="password"
          name="old_password"
          placeholder="Current password"
          value={passwordUpdate.values.old_password}
          onChange={passwordUpdate.handleChange}
          onBlur={passwordUpdate.handleBlur}
        />
        {passwordUpdate.touched.old_password &&
          passwordUpdate.errors.old_password && (
            <ErrorMessage message={passwordUpdate.errors.old_password} />
          )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="new_password" value="Your new password" />
        </div>
        <TextInput
          id="new_password"
          type="password"
          name="new_password"
          placeholder="New password"
          value={passwordUpdate.values.new_password}
          onChange={passwordUpdate.handleChange}
          onBlur={passwordUpdate.handleBlur}
        />
        {passwordUpdate.touched.new_password &&
          passwordUpdate.errors.new_password && (
            <ErrorMessage message={passwordUpdate.errors.new_password} />
          )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirm_password" value="Confirm your new password" />
        </div>
        <TextInput
          id="confirm_password"
          type="password"
          name="confirm_password"
          placeholder="Confirm new password"
          value={passwordUpdate.values.confirm_password}
          onChange={passwordUpdate.handleChange}
          onBlur={passwordUpdate.handleBlur}
        />
        {passwordUpdate.touched.confirm_password &&
          passwordUpdate.errors.confirm_password && (
            <ErrorMessage message={passwordUpdate.errors.confirm_password} />
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
