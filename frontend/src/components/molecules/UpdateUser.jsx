import React from "react";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../atoms/Input";
import H5 from "../atoms/H5";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
import { updateUserPwd } from "../../features/users/usersThunks";

const  UpdateUser = () =>{
  const dispatch = useDispatch();
  // prb to from <here to get id of user
  const userID= useSelector((state) => state.users.userID);

  const passwordForm = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      new_password: Yup.string().required("Required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords does not match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // console.log("submitting password form")
      dispatch(updateUserPwd({id:userID, ...values}));
    },
  });
  

  return (
    <form className="flex  flex-col gap-4" onSubmit={passwordForm.handleSubmit}>
      <div>
        <H5 label={"Update Password"} />
        <TextInput
          id="new_password"
          type="password"
          name="new_password"
          placeholder="New password"
          value={passwordForm.values.new_password}
          onChange={passwordForm.handleChange}
          onBlur={passwordForm.handleBlur}
        />
        {passwordForm.touched.new_password &&
          passwordForm.errors.new_password && (
            <ErrorMessage message={passwordForm.errors.new_password} />
          )}

      </div>
      <div>
        <TextInput
          id="confirm_password"
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
          value={passwordForm.values.confirm_password}
          onChange={passwordForm.handleChange}
          onBlur={passwordForm.handleBlur}
          />

        {passwordForm.touched.confirm_password &&
          passwordForm.errors.confirm_password && (
            <ErrorMessage message={passwordForm.errors.confirm_password} />
          )}
      </div>
           <Button type="submit" className="bg-black">Update Password</Button>  

    </form>
  );
}

export default UpdateUser;