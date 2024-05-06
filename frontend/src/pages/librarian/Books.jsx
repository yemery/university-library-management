import React, { useEffect } from "react";
import Button from '../../components/atoms/Button'
import { useState } from "react";
// import { Button } from "flowbite-react";
import AddBook from "../../components/molecules/AddBook";

function Books() {
  const [openModal, setOpenModal] = useState(false);

  const addBook = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <div className="flex gap-8">
        <Button action={addBook} text="add a book"/>
      </div>
      {/* <Button onClick={addBook}>Toggle modal</Button> */}
      <AddBook openModal={openModal} setOpenModal={() => setOpenModal(false)}/>
      <table></table>
    </div>
  );
}

export default Books;
