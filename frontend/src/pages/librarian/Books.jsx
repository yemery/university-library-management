import React, { useEffect } from "react";
// import Button from "../../components/atoms/Button";
import { useState } from "react";
import { Button } from "flowbite-react";
// import AddBook from "../../components/molecules/AddBook";
import AddModel from "../../components/molecules/AddModel";
import AddBookForm from "../../components/molecules/AddBookForm";
import { booksSelectOptions } from "../../assets/filteringOptions";
import SelectFilter from "../../components/atoms/SelectFilter";
import SearchFilter from "../../components/atoms/SearchFilter";
import axios from "axios";
import api from "../../services/api";
function Books() {
  const [openModal, setOpenModal] = useState(false);

  const addBook = () => {
    setOpenModal(true);
  };

  // fetch this to test the api from the backend  

  // const fetchBooks = async () => {
  //   try {
  //     // const response = await axios.get(" http://127.0.0.1:8000/api/books/" , {
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODg3NDM1LCJpYXQiOjE3MTg4ODM4MzUsImp0aSI6IjQ5MDQxMzYyNTdjNTRjZmU4Y2M0OGQ1YTg0MDQ4Y2IyIiwidXNlcl9pZCI6Mn0.pozsdQPEqNIms_CG-B2cVQ8toJPzPb_FGITR9GFk7aQ`,
  //     //   },

  //      const response = await api.get("books/", {
  //       headers: {
  //         "Content-Type": "application/json",
  //        " Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODg3NDM1LCJpYXQiOjE3MTg4ODM4MzUsImp0aSI6IjQ5MDQxMzYyNTdjNTRjZmU4Y2M0OGQ1YTg0MDQ4Y2IyIiwidXNlcl9pZCI6Mn0.pozsdQPEqNIms_CG-B2cVQ8toJPzPb_FGITR9GFk7aQ`,
  //   }});
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  return (
    <div>
      <div className="flex gap-8 flex-wrap">
        {/* <Button action={addBook} text="add a book" /> */}
        <Button
          className="w-80 bg-black  hover:opacity-75 text-white"
          onClick={addBook}
        >
          Add Book
        </Button>

        {/* <form action="" method="post">
          <Select id="countries" required className="w-80">
            <option value="0">Borrowed</option>
            <option value="1">Available</option>
          </Select>
        </form> */}
        <SelectFilter options={booksSelectOptions}/>
        <SearchFilter />

  
      </div>
      <AddModel openModal={openModal} setOpenModal={() => setOpenModal(false)}>
        <AddBookForm />
      </AddModel>

      <table>

{/* reusable component with props for all tables*/}
 
      </table>
    </div>
  );
}

export default Books;
