import { TextInput } from "@tremor/react";
import { useEffect, useState } from "react";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

export function CustomTextInput({
  label,
  value,
  type,
  name,
  placeholder,
  handleInput,
  handleKeyDown,
  error,
  defaultChecked,
  id,
}) {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <TextInput
        type={type}
        name={name}
        error={!!error}
        errorMessage={error}
        id={id ? id : name}
        placeholder={placeholder}
        onChange={handleInput}
        value={value}
        onKeyDown={handleKeyDown}
        defaultChecked={defaultChecked}
      />
    </div>
  );
}

export function CustomMultiTextInput({
  label,
  values,
  type,
  name,
  placeholder,
  //handleInput,
  // handleKeyDown,
  error,
  id,
}) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState(values);

  const handleInput = (event) => {
    setValue(event.target.value);
    if (value && event.keyCode === 13) {
      setOptions((prevState) => [...new Set([...prevState, value])]);
      setValue("");
    }
  };

  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <TextInput
        value={value}
        type={type}
        name={name}
        error={!!error}
        errorMessage={error}
        id={id ? id : name}
        placeholder={placeholder}
        onChange={handleInput}
        onKeyDown={handleInput}
        icon={ArrowCircleRightIcon}
      />
      <div>
        {options.map((el, i) => (
          <span
            key={`${el} ${i}`}
            onClick={() => setOptions(options.filter((opt) => opt !== el))}
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  );
}
