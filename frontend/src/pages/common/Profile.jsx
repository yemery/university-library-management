import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import Button from "../../components/atoms/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { MdPassword } from "react-icons/md";
import H5 from "../../components/atoms/H5";
import { useState } from "react";
const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);
  const [modalForm, setModalForm] = useState(null);
  const handleModal = (content) => {
    setOpenModal(true);
    setModalForm(content);
  };
  // const userInfo = {
  //   "first name": user.first_name,
  //   "last name": user.last_name,
  //   email: user.email,
  // };
  // // pay attention for naming in redux & api resonse cus we'll use keys in labels

  // const passwordUpdate = useFormik({
  //   initialValues: {
  //     newPassword: "",
  //     confirmPassword: "",
  //   },
  //   validationSchema: Yup.object({
  //     newPassword: Yup.string().required("Required").min(8, "Min 8 characters"),
  //     confirmPassword: Yup.string()
  //       .oneOf([Yup.ref("newPassword"), null], "Passwords does not match")
  //       .required("Required"),
  //   }),
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

  return (
    <div className="flex flex-col gap-4">
      <H5 label={"User Information"} />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(userInfo).map(([key, value]) => {
          return (
            <div key={value} className="flex flex-col">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {key}
              </label>
              <input
                type="text"
                id="base-input"
                value={value}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          );
        })}
      </div> */}
      {/* <div className="text-xl font-semibold">update password</div>
      <form
        className="flex flex-col gap-4"
        onSubmit={passwordUpdate.handleSubmit}
      >
        <div className="space-y-1">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            label="new password"
            type="password"
            name="newPassword"
            value={passwordUpdate.values.newPassword}
            onChange={passwordUpdate.handleChange}
            onBlur={passwordUpdate.handleBlur}
          />
          {passwordUpdate.touched.newPassword &&
            passwordUpdate.errors.newPassword && (
              <ErrorMessage message={passwordUpdate.errors.newPassword} />
            )}
        </div>

        <div className="space-y-1">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            label="confirm password"
            type="password"
            name="confirmPassword"
            value={passwordUpdate.values.confirmPassword}
            onChange={passwordUpdate.handleChange}
            onBlur={passwordUpdate.handleBlur}
          />
          {passwordUpdate.touched.confirmPassword &&
            passwordUpdate.errors.confirmPassword && (
              <ErrorMessage message={passwordUpdate.errors.confirmPassword} />
            )}
        </div>
        <div className="flex justify-center items-center">
          <Button text="Submit" />
        </div>
      </form> */}
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>First Name</TableHeadCell>
            <TableHeadCell>Last Name</TableHeadCell>
            <TableHeadCell>Email Address</TableHeadCell>
            <TableHeadCell>Role </TableHeadCell>

            <TableHeadCell>Update Password</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <MdPassword
                  className="cursor-pointer"
                  onClick={() => handleModal()}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Profile;
