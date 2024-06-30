import React, { useEffect } from "react";
import BarChartType from "../../components/charts/BarChartType";
import { useDispatch, useSelector } from "react-redux";
import { mostBorrowedBooks } from "../../features/stats/statsThunks";

function Dashboard() {
  const mostBorrowed = useSelector((state) => state.stats.mostBorrowedBooks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mostBorrowedBooks());
  }, []);

  return (
    <div className="">
      <BarChartType stat={mostBorrowed} />
    </div>
  );
}

export default Dashboard;
