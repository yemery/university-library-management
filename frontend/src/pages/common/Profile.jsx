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
import ModalContainer from "../../components/molecules/ModalContainer";
import UpdatePwdForm from "../../components/molecules/UpdatePwdForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <H5 label={"User Information"} />

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
                  onClick={() => setOpenModal(true)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <ModalContainer
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
      >
        <UpdatePwdForm close = {()=> setOpenModal(false)} />
      </ModalContainer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Profile;
