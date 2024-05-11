import React from "react";
// import Button from "../../components/atoms/Button";
import { useState } from "react";
import { Button } from "flowbite-react";
// import AddBook from "../../components/molecules/AddBook";
import AddModel from "../../components/molecules/AddModel";
import AddBookForm from "../../components/molecules/AddBookForm";
import { booksSelectOptions } from "../../assets/filteringOptions";
import SelectFilter from "../../components/atoms/SelectFilter";
import SearchFilter from "../../components/atoms/SearchFilter";

function Books() {
  const [openModal, setOpenModal] = useState(false);

  const addBook = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <div className="flex gap-8 flex-wrap">
        {/* <Button action={addBook} text="add a book" /> */}
        <Button
          className="w-80 bg-black hover:bg-red-600 hover:opacity-75  text-white"
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
