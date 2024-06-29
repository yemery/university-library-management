import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { borrowsList } from "../../features/borrow/borrowThunks";
import { Button } from "flowbite-react";
import ModalContainer from "../../components/molecules/ModalContainer";
import BorrowsTable from "../../components/atoms/BorrowsTable";
import ShowBorrow from "../../components/molecules/ShowBorrow";
import EditBorrow from "../../components/molecules/EditBorrow";
import EditBorrowDates from "../../components/molecules/EditBorrowDates";
import BorrowsSearchFilter from "../../components/molecules/BorrowsSearchFilter";

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
      <div className="flex flex-col gap-8">
        <Button
          className="w-80 bg-black  hover:opacity-75 text-white"
          onClick={() => {
            navigate("waiting-list");
          }}
        >
          waiting list
        </Button>

        <BorrowsSearchFilter />
      </div>
      <BorrowsTable
        showModal={() => handleModal("showBorrow")}
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
