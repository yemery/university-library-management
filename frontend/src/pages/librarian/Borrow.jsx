import { Button, Select } from "flowbite-react";
import React, { useState } from "react";
import ModalContainer from "../../components/molecules/ModalContainer";
import { useNavigate } from "react-router-dom";
import SelectFilter from "../../components/atoms/SelectFilter";
import { borrowSelectOptions } from "../../assets/filteringOptions";
import SearchFilter from "../../components/atoms/SearchFilter";

function Borrow() {
  const [openModal, setOpenModal] = useState(false);

  const addBorrow = () => {
    setOpenModal(true);
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-8 flex-wrap">
        <Button
          className="w-80 bg-black hover:opacity-75  text-white"
          onClick={addBorrow}
        >
          Add borrow
        </Button>

        <Button
          className="bg-black"
          onClick={() => {
            navigate("waiting-list");
          }}
        >
          waiting list
        </Button>

        {/* <form action="" method="post">
          <Select id="countries" required className="w-80">
            <option value="waiting">Waiting</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">Delivered</option>
          </Select>
        </form> */}
        <SelectFilter options={borrowSelectOptions} />
        <SearchFilter />
      </div>

      <ModalContainer openModal={openModal} setOpenModal={() => setOpenModal(false)}>
        test
      </ModalContainer>
    </div>
  );
}

export default Borrow;
