import {
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";

export function SearchCustomSelect({
  handleSelectChange,
  options,
  error,
  name,
  label,
  placeholder,
}) {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      <label htmlFor={name}>{label}</label>
      <SearchSelect
        name={name}
        placeholder={placeholder}
        onValueChange={(event) => handleSelectChange(event, name)}
      >
        {options.map((el) => (
          <SearchSelectItem key={el.value} value={el.label}>
            {el.label}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      {error && <span>{error}</span>}
    </div>
  );
}

export function CustomSelect({
  handleSelectChange,
  options,
  error,
  name,
  label,
  placeholder,
}) {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      <label htmlFor={name}>{label}</label>
      <Select
        name={name}
        placeholder={placeholder}
        onValueChange={(event) => handleSelectChange(event, name)}
      >
        {options.map((el, index) => (
          <SelectItem key={`${index} ${el}`} value={el}>
            {el}
          </SelectItem>
        ))}
      </Select>
      {error && <span>{error}</span>}
    </div>
  );
}

export function CustomSelectMultiple() {
  return;
}
