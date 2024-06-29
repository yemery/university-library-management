import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MdModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { targetBorrow, targetBorrowID } from "../../features/borrow/borrowSlice";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function BorrowsTable({ role, showModal, editModal,editModalDates }) {
  const borrows = useSelector((state) => state.borrows.borrows);
  const dispatch = useDispatch();

  const handleShow = (borrow) => {
    dispatch(targetBorrow(borrow));
    showModal();
  };

  const handleEdit = (id) => {
    dispatch(targetBorrowID(id));
    editModal();
  };

  const handleEditDates = (borrow) => {
    dispatch(targetBorrow(borrow));
    editModalDates();
  }

  return (
    <div className="mt-10">
      <Table striped>
        <TableHead>
          <TableHeadCell>Book title</TableHeadCell>
          <TableHeadCell>Borrowed by</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Borrow date</TableHeadCell>
          <TableHeadCell>Return date</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Actions</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {borrows.map((borrow) => (
            <TableRow
              key={borrow.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {borrow.book.title}
              </TableCell>
              <TableCell>
                {borrow.user.first_name} {borrow.user.last_name}
              </TableCell>
              <TableCell>{borrow.status}</TableCell>
              <TableCell>
                {borrow.borrow_date ? `${new Date(borrow.borrow_date).toLocaleDateString('en-GB')}` : "null"}
              </TableCell>
              <TableCell>
                {borrow.return_date ? `${new Date(borrow.return_date).toLocaleDateString('en-GB')}` : "null"}
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <MdOutlineRemoveRedEye
                    className="cursor-pointer"
                    onClick={() => handleShow(borrow)}
                  />

                  {role === "librarian" && (
                    <>
                    <MdModeEdit
                      className="cursor-pointer"
                      onClick={() => handleEditDates(borrow)}
                      />
                  <HiOutlineDotsHorizontal
                    className="cursor-pointer"
                    onClick={() => handleEdit(borrow.id)}
                  />
                    </>
                  )}
                  
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BorrowsTable;
