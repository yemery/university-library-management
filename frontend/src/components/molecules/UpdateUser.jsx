import React from "react";
import { useFormik } from "formik";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import * as Yup from "yup";
import { updateUserPwd } from "../../features/users/usersThunks";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import H5 from "../atoms/H5";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.users.userID);

  const passwordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Required")
        .min(8, "Password is too short"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(updateUserPwd({ id: id, new_password: values.password }));
    },
  });

  return (
    <form onSubmit={passwordForm.handleSubmit}>
      <div className="space-y-6">
        <H5 label="Edit user password" />
        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter new password"
            value={passwordForm.values.password}
            onChange={passwordForm.handleChange}
            onBlur={passwordForm.handleBlur}
          />
          {passwordForm.touched.password && passwordForm.errors.password && (
            <ErrorMessage error={passwordForm.errors.password} />
          )}
        </div>

        <div>
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={passwordForm.values.confirmPassword}
            onChange={passwordForm.handleChange}
            onBlur={passwordForm.handleBlur}
          />
          {passwordForm.touched.confirmPassword &&
            passwordForm.errors.confirmPassword && (
              <ErrorMessage error={passwordForm.errors.confirmPassword} />
            )}
        </div>

        <div>
          <Button type="submit" color="success" text="Update Password" />
        </div>
      </div>
    </form>
  );
}
