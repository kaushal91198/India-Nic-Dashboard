"use client";
// eslint-disable-next-line no-redeclare
import { useState, ChangeEvent, useEffect, FocusEvent } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import classNames from "classnames";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React from "react";

type FormInputProps<TFieldValues extends FieldValues> = {
  error?: string;
  setValue?: any;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  type?: "text" | "password" | "number";
  asterisk: boolean;
  decimals?: number;
  value?: string; // Number of decimals to format
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const FormInput = <TFieldValues extends FieldValues>({
  error,
  label,
  placeholder,
  register,
  name,
  type = "text",
  asterisk,
  decimals = 2,
  setValue,
  className,
  disabled,
  value,
  ...restProps
}: FormInputProps<TFieldValues>): React.JSX.Element => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    setFocused(true);
    if (type === "number") {
      const plainValue = removeCommas(e.target.value);
      setValue(name, plainValue);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    setFocused(false);
    setFilled(e.target.value !== "");
    if (type === "number" && e.target.value.trim() !== "") {
      const formattedValue = formatNumber(e.target.value, decimals);
      e.target.value = formattedValue;
      setValue(`${name}`, formattedValue);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (type === "number") {
      // Ensure only valid numeric characters are entered
      const validInput = e.target.value.replace(/[^0-9.]/g, "");
      setValue(name, validInput);
    } else {
      setValue(name, e.target.value);
    }
  };

  const formatNumber = (input: string, decimals: number): string => {
    const number = parseFloat(input);
    if (!isNaN(number) && isFinite(number)) {
      if (decimals === 0) {
        // Return the number as is if decimals is 0
        return number.toString();
      } else {
        return number.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      }
    } else {
      return ""; // Return empty if the input is not a valid number
    }
  };

  const removeCommas = (input: string): string => {
    return input.replace(/,/g, "");
  };

  useEffect(() => {
    let val: any = document.getElementById(name);
    if (val.value !== "") {
      setFilled(true);
    }
  }, []);

  return (
    <div className="flex flex-col gap-50">
      <div
        className={classNames(
          "relative  transition-all duration-300 flex flex-col  rounded-[10px] bg-baseline-300 text-input-text w-full inputClass outline-hidden",
          className,
          {
            "border text-red-600": error,
            "border border-primary-focus h-[48px]":
              (focused || filled || value) && !error,
          }
        )}
      >
        <label
          htmlFor={name}
          className={classNames(
            "absolute left-30 text-[#909090] z-1 px-30 rounded-md text-sm transition-all top-1/2 -translate-y-1/2 duration-300 text-[13px] outline-hidden",
            {
              "text-xs -mt-70 top-0": focused || filled || value,
              "text-red-300": error,
            }
          )}
        >
          {label}
          {asterisk ? <span className="px-10 text-red-500">*</span> : null}
        </label>
        <input
          {...register(name, {
            onBlur: handleBlur,
            onChange: handleChange,
          })}
          id={name}
          onFocus={handleFocus}
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type === "number"
              ? "text"
              : type
          }
          placeholder={placeholder}
          disabled={disabled}
          className={classNames(
            "block text-input-text h-[40px] w-full bg-transparent px-60 z-relative text-text-baseline-200 text-[14px] rounded-md outline-hidden transition-all duration-300",
            {
              "pt-70 h-[48px]": focused || filled,
              "cursor-not-allowed": disabled,
            }
          )}
          {...restProps}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-90 flex text-text-baseline-400 items-center text-sm leading-5 z-50"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {error && <p className="text-start  text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
