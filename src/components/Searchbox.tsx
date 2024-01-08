import { useState } from "react";
import { Search, GeoAltFill } from "react-bootstrap-icons";

interface Props {
  onSearch: (value: string) => void;
}

const Searchbox = ({ onSearch }: Props) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <div className="search-box">
        <GeoAltFill size={30} />
        <input
          type="search"
          placeholder="Enter city name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="button"
          id="search-btn"
          onClick={() => onSearch(inputValue)}
        >
          <Search size={15} />
        </button>
      </div>
    </>
  );
};

export default Searchbox;
