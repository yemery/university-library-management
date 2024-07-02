import { useDispatch, useSelector } from "react-redux";
import BarChartType from "../../components/charts/BarChartType";
import {
  mostBorrowedBooks,
  onwNonReturnedBorrows,
  ownBorrowedStatus,
  ownBorrowsStats,
} from "../../features/stats/statsThunks";
import { useEffect } from "react";
import PieChartType from "../../components/charts/PieChartType";
import CardStats from "../../components/atoms/CardStats";

const Dashboard = () => {
  const dispatch = useDispatch();
  const ownedStatsBorrowed = useSelector(
    (state) => state.stats.ownBorrowedBooks
  );
  const ownedBorrowedStatus = useSelector((state) => state.stats.myBorrows);
  const mostBorrowed = useSelector((state) => state.stats.mostBorrowedBooks);
  const nonReturnedBorrows = useSelector(
    (state) => state.stats.nonReturnedBorrows
  );

  useEffect(() => {
    dispatch(ownBorrowsStats());
    dispatch(ownBorrowedStatus());
    dispatch(mostBorrowedBooks());
    dispatch(onwNonReturnedBorrows());
  }, []);

  return (
    <div className="mx-auto p-4 max-w-screen-lg">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex justify-center">
          <PieChartType stat={ownedBorrowedStatus} />
        </div>
        <div className="flex justify-center">
          <CardStats stat={ownedStatsBorrowed} />
        </div>
        <div className="flex justify-center">
          <CardStats stat={nonReturnedBorrows} />
        </div>
        <div className="flex justify-center">
          <BarChartType stat={mostBorrowed} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
