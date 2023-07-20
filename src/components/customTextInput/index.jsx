import { Badge, TextInput } from "@tremor/react";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";

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
        onChange={(event) => handleInput(event, "options")}
        onKeyDown={(event) => handleKeyDown(event, "options")}
        icon={ArrowCircleRightIcon}
      />
      {values.length > 0 && (
        <div className="flex flex-row overflow-auto flex-nowrap gap-2 pt-2">
          {values.map((value, i) => (
            <Badge
              key={`${value} ${i}`}
              onClick={() => handleOptions(name, value)}
              icon={XIcon}
              size="lg"
            >
              <span className="text-base">{value}</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
