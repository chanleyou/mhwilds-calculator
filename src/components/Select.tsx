"use client";

import { InputContainer, type InputContainerProps } from "./InputContainer";

export interface SelectProps<T> extends InputContainerProps {
  options: T[];
  value?: T;
  labelFn?: (option: T) => string;
  keyFn?: (option: T) => string;
  onChangeValue: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  disabledOptions?: T[];
}

export function Select<T>({
  label,
  options,
  value,
  labelFn = (o) => String(o),
  keyFn = labelFn,
  description,
  onChangeValue,
  placeholder,
  disabledOptions,
  ...props
}: SelectProps<T>) {
  return (
    <InputContainer label={label} description={description}>
      <div className="relative">
        <select
          className="border-divider bg-content text-primary hover:bg-content-alt focus:border-primary disabled:hover:bg-content disabled:text-placeholder w-full rounded-sm border px-2 py-1.5 font-sans text-sm sm:py-1"
          value={value ? labelFn(value) : ""}
          onChange={(e) => {
            const { value } = e.target;
            const option = options.find((o) => value === labelFn(o));
            if (option) onChangeValue(option);
            else onChangeValue(options[0]);
          }}
          {...props}
        >
          {options.map((option) => (
            <option
              key={keyFn(option)}
              value={keyFn(option)}
              disabled={disabledOptions?.includes(option)}
            >
              {labelFn(option)}
            </option>
          ))}
        </select>
        {!value && placeholder && (
          <p className="text-placeholder pointer-events-none absolute top-1/2 left-2 w-[calc(100%-2rem)] -translate-y-1/2 truncate pl-[1px] text-sm">
            {placeholder}
          </p>
        )}
      </div>
    </InputContainer>
  );
}
