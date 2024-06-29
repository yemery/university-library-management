import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { borrowsList, studentBorrows } from "../../features/borrow/borrowThunks";
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
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    role == "librarian" && dispatch(borrowsList());

    role == "student" && dispatch(studentBorrows());
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleModal = (content) => {
    setOpenModal(true);
    setModalContent(content);
  };

  const contents = {
    showBorrow: <ShowBorrow role={role} />,
    editBorrow: <EditBorrow/>,
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
        role={role}
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
