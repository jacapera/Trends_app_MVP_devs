import { TextInput } from "@tremor/react";

export default function CustomTextInput({
  label,
  value,
  type,
  name,
  placeholder,
  handleInput,
  handleKeyDown,
  error,
  defaultChecked,
  id
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
