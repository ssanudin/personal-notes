import { useState } from "react";

const useInputError = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onCheckValue = (newVal) => {
    setValue((prevValue) => ({ ...prevValue, ...newVal }));
  };

  const reset = () => {
    setValue((prevValue) => {
      const newVal = {};

      for (let v in prevValue) {
        newVal[v] = "";
      }

      return { ...newVal };
    });
  };

  const is = () => {
    for (let v in value) {
      if (value[v]) {
        return true;
      }
    }

    return false;
  };

  return [value, onCheckValue, { is, reset }];
};

export default useInputError;
