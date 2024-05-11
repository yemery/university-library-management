import { Select } from "flowbite-react";

function SelectFilter({ options, name }) {
  return (
    <form action="" method="post">
      <Select id={name} required className="w-80">
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </Select>
    </form>
  );
}

export default SelectFilter;
