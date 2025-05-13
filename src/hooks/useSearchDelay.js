import { useEffect, useState } from "react";

export const useSearchDelay = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(inputValue.trim());
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return { handleChange, searchValue };
};
