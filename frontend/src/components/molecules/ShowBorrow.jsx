import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

function ShowBorrow({role}) {
  const borrow = useSelector((state) => state.borrows.borrow);

  return (
    // later adding container for layout and styling to not repeat the same code
    <div className="">
      <div className=" space-y-4">
        <h5 className="font-semibold text-sm">Borrow information</h5>
        <Table>
          <TableHead>
            <TableHeadCell>Borrow ID</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>{borrow.id}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="space-y-4">
        <h5 className="font-semibold text-sm">Book information</h5>
        <Table>
          <TableHead>
            <TableHeadCell>Book ID</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Author</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Gender</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>{borrow.book.id}</TableCell>
              <TableCell>{borrow.book.title}</TableCell>
              <TableCell>{borrow.book.author}</TableCell>
              <TableCell>{borrow.book.description}</TableCell>
              <TableCell>{borrow.book.gender}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
       {role === "librarian" && (
        <div className="space-y-4">
        <h5 className="font-semibold text-sm">Student information</h5>
        <Table>
          <TableHead>
            <TableHeadCell>student ID</TableHeadCell>
            <TableHeadCell>first name</TableHeadCell>
            <TableHeadCell>last name</TableHeadCell>
            <TableHeadCell>email</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>{borrow.user.id}</TableCell>
              <TableCell>{borrow.user.first_name}</TableCell>
              <TableCell>{borrow.user.last_name}</TableCell>
              <TableCell>{borrow.user.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
       
      </div>
       )}
      </div>
      
    </div>
  );
}

export default ShowBorrow;
