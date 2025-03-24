import React from "react";

type Props = {
  value?: boolean;
  onChangeValue: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Checkbox({ value, onChangeValue, label, disabled }: Props) {
  return (
    <div
      className="text-alt my-2 flex cursor-pointer items-center gap-1 text-sm select-none hover:opacity-80 active:opacity-60"
      onClick={() => onChangeValue(!value)}
    >
      <input
        type="checkbox"
        checked={value}
        className="accent-info h-4 w-4"
        onChange={(e) => onChangeValue(e.target.checked)}
        disabled={disabled}
      />
      {label && (
        <label className="flex cursor-pointer place-items-center">
          {label}
        </label>
      )}
    </div>
  );
}
