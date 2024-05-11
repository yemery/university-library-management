import { waitlistSelectOptions } from "../../assets/filteringOptions";
import GoBack from "../../components/atoms/GoBack";
import SearchFilter from "../../components/atoms/SearchFilter";
import SelectFilter from "../../components/atoms/SelectFilter";

const WaitingList = () => {
  return (
    <div className="flex flex-col gap-4">
      <GoBack/>
    
      <div className="flex gap-8 flex-wrap">
        <SelectFilter options={waitlistSelectOptions} />
        <SearchFilter/>
      </div>
    </div>
  );
};

export default WaitingList;
