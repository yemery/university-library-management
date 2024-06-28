import React from 'react'
import { useSelector } from 'react-redux'

function ShowBorrow() {
    const borrow = useSelector((state) => state.borrows.borrow)

  return (
    <div className='flex flex-col justify-around gap-8'>
        <div className='flex flex-col items-center'>
            <h2 class="text-xl font-medium text-gray-900 text-center">borrow information</h2>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>borrow ID:</span> {borrow.id}</p>
        </div>

        <div className='flex flex-col items-center'>
        <h3 class="text-xl font-medium text-gray-900  text-center">book information</h3>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>Book ID: </span>{borrow.book.id}</p>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>Title: </span>{borrow.book.title}</p>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>Author: </span>{borrow.book.author}</p>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>Description: </span>{borrow.book.description}</p>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>Gender: </span>{borrow.book.gender}</p>
        </div>

        <div className='flex flex-col items-center'>
            <h3 class="text-xl font-medium text-gray-900  text-center">student information</h3>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>student ID: </span>{borrow.user.id}</p>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>first name: </span>{borrow.user.first_name}</p>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>last name: </span>{borrow.user.last_name}</p>
            <p className='flex justify-between w-3/4'><span className='font-semibold'>email: </span>{borrow.user.email}</p>
        </div>
    </div>
  )
}

export default ShowBorrow;