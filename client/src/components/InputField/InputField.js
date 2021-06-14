function InputField({ onChange, label, required, warning, ...props }) {
    return (
      <div className="input-div">
        <label>
          <input
            placeholder=" "
            onChange={(e) => onChange(e, this)}
            {...props}
            required={required}
          ></input>
          {warning && <div style={{ color: "red" }}>{warning}</div>}
          <span>{label}</span>
        </label>
      </div>
    );
  }
  
  export default InputField;
  