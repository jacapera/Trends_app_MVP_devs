function getMaxDate() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}

export default function CustomInputDate({
  label,
  value,
  name,
  id,
  handleInput,
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="date"
        id={id ? id : name}
        name={name}
        value={value}
        onChange={handleInput}
        max={getMaxDate()} // Limita la fecha máxima a hoy
        required
      />
    </div>
  );
}
