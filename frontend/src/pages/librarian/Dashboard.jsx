import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { booksAvailability, borrowsStatus, mostBorrowedBooks, mostBorrowingStudents } from "../../features/stats/statsThunks";
import BarChartType from "../../components/charts/BarChartType";
import PieChartType from "../../components/charts/PieChartType";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mostBorrowedBooks());
    dispatch(mostBorrowingStudents());
    dispatch(booksAvailability());
    dispatch(borrowsStatus());
  }, []);

  const mostBorrowed = useSelector((state) => state.stats.mostBorrowedBooks);
  const mostStudents = useSelector((state) => state.stats.mostBorrowingStudents);
  const availabilityStat = useSelector((state) => state.stats.booksAvailability);
  const borrowsStat = useSelector((state) => state.stats.borrowsStatus);

  return (
    // <div className="grid grid-cols-2 gap-8 place-items-center justify-center">
    //   <BarChartType stat={mostBorrowed} />
    //   <BarChartType stat={mostStudents} />
    //   <PieChartType stat={availabilityStat} />
    //   <PieChartType stat={borrowsStat} />
    // </div>
    <div className="grid grid-cols-2 gap-2">
      <BarChartType stat={mostBorrowed} />
      <BarChartType stat={mostStudents} />
      <PieChartType stat={availabilityStat} />
      <PieChartType stat={borrowsStat} />
    </div>
  );
}

export default Dashboard;
