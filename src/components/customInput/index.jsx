export default function CustomInput({
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
      <input
        type={type}
        name={name}
        id={id ? id : name}
        placeholder={placeholder}
        onChange={handleInput}
        value={value}
        onKeyDown={handleKeyDown}
        defaultChecked={defaultChecked}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
