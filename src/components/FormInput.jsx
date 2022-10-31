const FormInput = ({
  label,
  id,
  type,
  placeholder,
  autoComplete,
  state,
  setState,
}) => {
  return (
    <div className="my-5">
      <label
        htmlFor={id}
        className="text-gray-600 block text-xl font-bold w-max"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full mt-3 p-3 border rounded-lg shadow-inner bg-gray-50"
        value={state}
        onChange={(event) => setState(event.target.value)}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default FormInput;
