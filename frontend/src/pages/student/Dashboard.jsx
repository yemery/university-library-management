import BarChartType from "../../components/charts/BarChartType";

const Dashboard = () => {
  const dispatch = useDispatch();
  const ownedStatsBorrowed = useSelector(state => state.stats.ownBorrowedBooks);
  const ownedBorrowedStatus = useSelector(state => state.stats.myBorrows);
  const mostBorrowed = useSelector((state) => state.stats.mostBorrowedBooks);
  const nonReturnedBorrows = useSelector((state) => state.stats.nonReturnedBorrows);

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