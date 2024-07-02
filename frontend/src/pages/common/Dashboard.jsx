import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  booksAvailability,
  borrowsStatus,
  mostBorrowedBooks,
  mostBorrowingStudents,
} from "../../features/stats/statsThunks";
import BarChartType from "../../components/charts/BarChartType";
import PieChartType from "../../components/charts/PieChartType";
import { nonReturnedBorrows } from "../../features/stats/statsThunks";
import CardStats from "../../components/atoms/CardStats";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mostBorrowedBooks());
    dispatch(mostBorrowingStudents());
    dispatch(booksAvailability());
    dispatch(borrowsStatus());
    dispatch(nonReturnedBorrows());
  }, []);

  const mostBorrowed = useSelector((state) => state.stats.mostBorrowedBooks);
  const mostStudents = useSelector(
    (state) => state.stats.mostBorrowingStudents
  );
  const availabilityStat = useSelector(
    (state) => state.stats.booksAvailability
  );
  const borrowsStat = useSelector((state) => state.stats.borrowsStatus);
  const nonReturnedBooksStats = useSelector(
    (state) => state.stats.nonReturnedBooksStats
  );

  return (
    // <div className="flex flex-col items-center justify-center">
    //   <div className="flex items-center justify-center w-full">
    //     <BarChartType stat={mostBorrowed} />
    //     <BarChartType stat={mostStudents} />
    //     <CardStats stat={nonReturnedBooksStats} />
    //   </div>
    //   <div className="flex items-center justify-center gap-2 w-full">
    //     <PieChartType stat={availabilityStat} />
    //     <PieChartType stat={borrowsStat} />
    //   </div>
    // </div>

    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-4 w-11/12">
        <BarChartType stat={mostBorrowed} />
        <BarChartType stat={mostStudents} />
        <CardStats stat={nonReturnedBooksStats} />
      </div>
      <div className="flex items-center justify-center gap-4 w-full">
        <PieChartType stat={availabilityStat} />
        <PieChartType stat={borrowsStat} />
      </div>
    </div>
  );
}

export default Dashboard;
