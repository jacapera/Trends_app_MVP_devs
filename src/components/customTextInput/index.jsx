import { TextInput } from "@tremor/react";
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
  placeholder,
  type,
  name,
  error,
  id,
  handleInput,
  handleOptions,
  handleKeyDown,
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
        onKeyDown={handleKeyDown}
        icon={ArrowCircleRightIcon}
      />
      <div>
        {values.map((value, i) => (
          <span
            key={`${value} ${i}`}
            onClick={() => handleOptions(name, value)}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
