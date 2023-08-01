export default function CustomRadioInput({
  name,
  label,
  id,
  value,
  defaultChecked,
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        defaultChecked={defaultChecked}
      />
    </div>
  );
}
