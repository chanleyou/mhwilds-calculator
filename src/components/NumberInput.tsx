"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { InputContainer, type InputContainerProps } from "./InputContainer";

interface Props
  extends InputContainerProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  onChangeValue?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  value: number;
}

export function NumberInput({
  label,
  onChangeValue,
  description,
  value,
  step = 1,
  min,
  max,
  disabled,
  readOnly,
  ...props
}: Props) {
  return (
    <InputContainer label={label} description={description}>
      <div className="relative flex items-center">
        <input
          className="border-divider text-primary focus:border-primary disabled:hover:bg-content hover:bg-content-alt focus:bg-content-alt disabled:text-placeholder w-full rounded-sm border px-2 py-1.5 text-sm focus:outline-none sm:py-1"
          type="number"
          onChange={(e) => onChangeValue?.(Number(e.target.value))}
          value={value}
          pattern="-?[0-9]+"
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />
        {!readOnly && (
          <div className="absolute right-0 flex">
            <button
              disabled={disabled || (min !== undefined && value <= min)}
              type="button"
              className="hover:text-accent h-full cursor-pointer p-1 disabled:pointer-events-none disabled:opacity-30"
              onClick={() => {
                if (!onChangeValue) return;
                const n = value - step;
                if (min !== undefined) onChangeValue(Math.max(min, n));
                else onChangeValue(n);
              }}
            >
              <MinusIcon size={16} />
            </button>
            <button
              disabled={disabled || (max !== undefined && value >= max)}
              type="button"
              className="hover:text-accent mr-0.5 h-full cursor-pointer p-1 disabled:pointer-events-none disabled:opacity-30"
              onClick={() => {
                if (!onChangeValue) return;
                const n = value + step;
                if (max !== undefined) onChangeValue(Math.min(max, n));
                else onChangeValue(n);
              }}
            >
              <PlusIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </InputContainer>
  );
}

export function NumberInputTwo({
  label,
  onChangeValue,
  description,
  value,
  step = 1,
  min,
  max,
  disabled,
  readOnly,
  ...props
}: Props) {
  return (
    <InputContainer description={description}>
      <div className="group text-secondary hover:text-primary focus-within:text-primary relative flex items-center">
        <input
          className="border-divider text-primary group-hover:border-primary focus:border-primary disabled:hover:bg-content group disabled:text-placeholder bg-content w-full rounded-xs border p-2 text-sm focus:outline-none"
          type="number"
          onChange={(e) => onChangeValue?.(Number(e.target.value))}
          value={value}
          pattern="-?[0-9]+"
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />
        <label className="bg-content absolute top-[-7.5px] left-1 z-1 px-1 text-xs text-inherit">
          {label}
        </label>
        {!readOnly && (
          <div className="absolute right-0 flex">
            <button
              disabled={disabled || (min !== undefined && value <= min)}
              type="button"
              className="hover:text-accent text-primary h-full cursor-pointer p-1 disabled:pointer-events-none disabled:opacity-30"
              onClick={() => {
                if (!onChangeValue) return;
                const n = value - step;
                if (min !== undefined) onChangeValue(Math.max(min, n));
                else onChangeValue(n);
              }}
            >
              <MinusIcon size={16} />
            </button>
            <button
              disabled={disabled || (max !== undefined && value >= max)}
              type="button"
              className="hover:text-accent text-primary mr-0.5 h-full cursor-pointer p-1 disabled:pointer-events-none disabled:opacity-30"
              onClick={() => {
                if (!onChangeValue) return;
                const n = value + step;
                if (max !== undefined) onChangeValue(Math.min(max, n));
                else onChangeValue(n);
              }}
            >
              <PlusIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </InputContainer>
  );
}
