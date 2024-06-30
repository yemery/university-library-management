import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  borrowsList,
  studentBorrows,
} from "../../features/borrow/borrowThunks";
import { Button } from "flowbite-react";
import ModalContainer from "../../components/molecules/ModalContainer";
import BorrowsTable from "../../components/atoms/BorrowsTable";
import ShowBorrow from "../../components/molecules/ShowBorrow";
import EditBorrow from "../../components/molecules/EditBorrow";
import EditBorrowDates from "../../components/molecules/EditBorrowDates";
import BorrowsSearchFilter from "../../components/molecules/BorrowsSearchFilter";
import { Pagination } from "flowbite-react";

function Borrow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    role == "librarian" && dispatch(borrowsList({ page: currentPage }));

    role == "student" && dispatch(studentBorrows({ page: currentPage }));
  }, [currentPage]);

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleModal = (content) => {
    setOpenModal(true);
    setModalContent(content);
  };

  const contents = {
    showBorrow: <ShowBorrow role={role} />,
    editBorrow: <EditBorrow />,
    editBorrowDates: <EditBorrowDates />,
  };
  const totalPages = useSelector((state) => state.borrows.totalPages);

  const onPageChange = (page) => {
    setCurrentPage(page);
    // dispatch(booksList({ page: page }));
  };
  return (
    <div>
      <div className="flex flex-col gap-8">
       

        <BorrowsSearchFilter />
      </div>
      <BorrowsTable
        role={role}
        showModal={() => handleModal("showBorrow")}
        editModal={() => handleModal("editBorrow")}
        editModalDates={() => handleModal("editBorrowDates")}
      />
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
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
