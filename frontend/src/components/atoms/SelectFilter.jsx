import { Select } from "flowbite-react";

function SelectFilter({ options, name, value, change }) {
  return (
    <Select id={name} value={value} onChange={change} className="w-80">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export default SelectFilter;
