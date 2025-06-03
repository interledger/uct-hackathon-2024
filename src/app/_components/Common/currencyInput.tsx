import { Input } from "@nextui-org/react";
import { useState } from "react";

type CurrencyInputProps = {
  value: string;
  onChange: (val: string) => void;
  startContent: string | undefined;
};

export default function CurrencyInput({
  value,
  onChange,
  startContent,
}: CurrencyInputProps) {
  const handleChange = (value: string) => {
    const raw = value.replace(/\D/g, ""); // strip non-digits
    const num = raw ? parseInt(raw, 10) : 0;
    const formatted = (num / 100).toFixed(2); // shift cents to dollars
    onChange(formatted);
  };

  return (
    <Input
      name="amount"
      type="text"
      inputMode="numeric"
      className="text-sm"
      startContent={startContent}
      label="amount"
      placeholder="Amount being sent"
      value={value}
      onValueChange={(value) => handleChange(value)}
      required
    />
  );
}
