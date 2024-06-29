import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { targetBook, targetBookID } from "../../features/book/bookSlice";

function BooksTable({ editModal, deleteModal, borrowModal, waitlistModal }) {
  const books = useSelector((state) => state.books.books);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const checkRole = () => {
    if (role === "librarian") {
      return true;
    }
    return false;
  };

  // librarian actions
  const handleEdit = (book) => {
    dispatch(targetBook(book));
    editModal();
  };

  const handleDelete = (id) => {
    dispatch(targetBookID(id));
    deleteModal();
  };

  // student actions
  const handleBorrow = (id) => {
    dispatch(targetBookID(id));
    borrowModal();
  };

  const handleWaitlist = (id) => {
    dispatch(targetBookID(id));
    waitlistModal();
  };

  return (
    <div className="mt-10">
      <Table striped>
        <TableHead>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Author</TableHeadCell>
          <TableHeadCell>Description</TableHeadCell>
          <TableHeadCell>Gender</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Actions</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {books.map((book) => (
            <TableRow
              key={book.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.title}
              </TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>{book.gender}</TableCell>
              <TableCell>
                {book.is_available ? "available" : "borrowed"}
              </TableCell>
              <TableCell>
                {checkRole() ? (
                  <div className="flex gap-4">
                    <MdModeEdit
                      className="cursor-pointer"
                      onClick={() => handleEdit(book)}
                    />
                    <FaTrashAlt
                      className="cursor-pointer"
                      onClick={() => handleDelete(book.id)}
                    />
                  </div>
                ) : book.is_available ? (
                  <Button
                    className="bg-black text-white"
                    onClick={() => handleBorrow(book.id)}
                  >
                    Borrow
                  </Button>
                ) : (
                  <Button
                    className="bg-black text-white"
                    onClick={() => handleWaitlist(book.id)}
                  >
                    Waitlist
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BooksTable;
