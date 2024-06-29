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
    // <div className='flex flex-col justify-around gap-8'>
    //     <div className='flex flex-col items-center'>
    //         <h2 class="text-xl font-medium text-gray-900 text-center">borrow information</h2>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>borrow ID:</span> {borrow.id}</p>
    //     </div>

    //     <div className='flex flex-col items-center'>
    //     <h3 class="text-xl font-medium text-gray-900  text-center">book information</h3>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>Book ID: </span>{borrow.book.id}</p>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>Title: </span>{borrow.book.title}</p>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>Author: </span>{borrow.book.author}</p>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>Description: </span>{borrow.book.description}</p>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>Gender: </span>{borrow.book.gender}</p>
    //     </div>

    //     <div className='flex flex-col items-center'>
    //         <h3 class="text-xl font-medium text-gray-900  text-center">student information</h3>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>student ID: </span>{borrow.user.id}</p>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>first name: </span>{borrow.user.first_name}</p>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>last name: </span>{borrow.user.last_name}</p>
    //         <p className='flex justify-between w-3/4'><span className='font-semibold'>email: </span>{borrow.user.email}</p>
    //     </div>
    // </div>
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
