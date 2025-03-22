"use client";

import { InputContainer, type InputContainerProps } from "./InputContainer";

interface Props
  extends InputContainerProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  onChangeValue?: (value: string) => void;
}

export function TextInput({
  label,
  onChangeValue,
  description,
  value,
  disabled,
  ...props
}: Props) {
  return (
    <InputContainer label={label} description={description}>
      <div className="relative flex items-center">
        <input
          className="border-divider text-primary focus:border-primary disabled:hover:bg-content hover:bg-content-alt focus:bg-content-alt disabled:text-placeholder w-full rounded-sm border px-2 py-1 text-sm focus:outline-none"
          type="text"
          onChange={(e) => onChangeValue?.(e.target.value)}
          value={value}
          disabled={disabled}
          {...props}
        />
      </div>
    </InputContainer>
  );
}
