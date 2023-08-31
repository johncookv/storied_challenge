import { useState } from "react";

import "./App.css";
import DropdownSelect from "./components/DropdownSelect";

const options = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "pink", label: "Pink" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleChange = (selectedValue) => {
    if (isOpen) {
      setValue(selectedValue === value ? null : selectedValue);
    }
    setIsOpen(!isOpen);
  };

  return (
    <DropdownSelect
      label="Select a color"
      options={options}
      value={value}
      open={isOpen}
      onChange={handleChange}
      isSearchable
    />
  );
}

export default App;
