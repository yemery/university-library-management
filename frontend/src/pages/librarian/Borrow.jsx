import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { borrowSelectOptions } from "../../assets/filteringOptions";
import { useDispatch } from "react-redux";
import { borrowsList } from "../../features/borrow/borrowThunks";
import { Button, Select } from "flowbite-react";
import ModalContainer from "../../components/molecules/ModalContainer";
import SelectFilter from "../../components/atoms/SelectFilter";
import SearchFilter from "../../components/atoms/SearchFilter";
import BorrowsTable from "../../components/atoms/BorrowsTable";
import ShowBorrow from "../../components/molecules/ShowBorrow";
import EditBorrow from "../../components/molecules/EditBorrow";
import EditBorrowDates from "../../components/molecules/EditBorrowDates";

function Borrow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(borrowsList());
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleModal = (content) => {
    setOpenModal(true);
    setModalContent(content);
  };

  const contents = {
    showBorrow: <ShowBorrow />,
    editBorrow: <EditBorrow />,
    editBorrowDates: <EditBorrowDates />,
  };

  return (
    <div>
      <div className="flex gap-8 flex-wrap">
        {/* <Button
          className="w-80 bg-black hover:opacity-75  text-white"
          onClick={() => handleModal("addBook")}
        >
          Add borrow
        </Button> */}

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
        <BorrowsTable
          showModal ={()=>handleModal("showBorrow")}
          editModal={() => handleModal("editBorrow")}
          editModalDates={() => handleModal("editBorrowDates")}
        />

      <ModalContainer
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
      >
        {contents[modalContent]}
      </ModalContainer>
    </div>
  );
}

export default Borrow;
