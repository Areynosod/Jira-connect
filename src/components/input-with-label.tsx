import React from "react";

interface InputWithLabelProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  error?: string;
}

export default function InputWithLabel({
  label,
  value,
  onChange,
  placeholder,
  type,
  error,
}: InputWithLabelProps) {
  return (
    <div className="my-2">
      {label && <label>{label}</label>}
      <input
        type={type}
        className="uk-form-xs uk-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
