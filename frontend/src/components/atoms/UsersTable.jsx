import React from "react";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { targetUserID } from "../../features/users/usersSlice";

function UsersTable({ editModal, deleteModal }) {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    dispatch(targetUserID(id));
    editModal();
  };

  const handleDelete = (id) => {
    dispatch(targetUserID(id));
    deleteModal();
  };
  return (
    <div className="mt-10">
      <Table striped>
        <TableHead>
          <TableHeadCell>First Name</TableHeadCell>
          <TableHeadCell>Last Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Role</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Actions</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.first_name}
              </TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.role == "librarian" ? (
                  <Badge color="success" className="w-fit">
                    Librarian
                  </Badge>
                ) : (
                  <Badge color="warning" className="w-fit">
                    Student
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <MdModeEdit
                    className="cursor-pointer"
                    onClick={() => handleEdit(user.id)}
                  />
                  <FaTrashAlt
                    className="cursor-pointer"
                    onClick={() => handleDelete(user.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UsersTable;
