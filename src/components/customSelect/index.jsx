import {
  MultiSelect,
  MultiSelectItem,
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
  value,
}) {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      <label htmlFor={name}>{label}</label>
      <SearchSelect
        name={name}
        placeholder={placeholder}
        onValueChange={(event) => handleSelectChange(event, name)}
        value={value}
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
  value,
}) {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      <label htmlFor={name}>{label}</label>
      <Select
        name={name}
        placeholder={placeholder}
        onValueChange={(event) => handleSelectChange(event, name)}
        value={value}
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

export function CustomSelectMultiple({
  handleSelectChange,
  options,
  error,
  name,
  label,
  placeholder,
  value,
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <MultiSelect
        name={name}
        placeholder={placeholder}
        onChange={(event) => handleSelectChange(event, name)}
        value={value}
      >
        {options.map((el, index) => (
          <MultiSelectItem key={`${index} ${el}`} value={el}>
            {el}
          </MultiSelectItem>
        ))}
        {value
          .filter((el) => !options.includes(el))
          ?.map((el, index) => (
            <MultiSelectItem key={`${index} ${el}`} value={el}>
              {el}
            </MultiSelectItem>
          ))}
      </MultiSelect>
      {error && <span>{error}</span>}
    </div>
  );
}
