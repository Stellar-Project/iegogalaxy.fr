"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, ReactElement, useState } from "react";

export const Champs = ({
  value,
  label,
  icon,
  type,
}: {
  value: string;
  label: string;
  icon?: ReactElement;
  type?: string;
}) => {
  const [val, setVal] = useState(value);

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <Label className="capitalize" htmlFor={`${label}Input`}>
          {label}
        </Label>
        {icon && icon}
      </div>
      <Input
        name={label}
        id={`${label}Input`}
        value={val}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setVal(e.target.value);
        }}
        type={type}
      />
    </>
  );
};
