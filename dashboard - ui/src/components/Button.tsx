"use client";
import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export enum APIStatus {
  Idle = "idle",
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

// Define possible button styles
type ButtonVariant = "primary" | "secondary" | "outlined" | "plain";

// Define properties the Button can accept
type Props = {
  loading?: APIStatus;
  width: "fit" | "full";
  CTA: string; // Call-to-action text for the button
  variant?: ButtonVariant; // Button style variant (optional)
  Icon?: React.ReactNode; // Optional icon (like SVG) for the button
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button.
 * A versatile button component that supports various styles and
 * can optionally include an icon.
 * @param {Props} loading?: Status;
 * @param {Props} width: 'fit' | 'full';
 * @param {Props} CTA: string; // Call-to-action text for the button
 * @param {Props} variant?: ButtonVariant; // Button style variant (optional)
 * @param {Props} Icon?: React.ReactNode; // Optional icon (like SVG) for the button
 * @returns {JSX.Element} - The rendered Button.
 **/

const Button: React.FC<Props> = ({
  CTA,
  variant = "primary",
  Icon,
  loading = APIStatus.Idle,
  width,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={loading === APIStatus.Pending} // Spread the rest of the properties onto the button
      className={classNames(
        `h-fit p-20  justify-center items-center flex rounded-md ${className}`,
        {
          "bg-primary-300 text-white hover:bg-primary-400":
            variant === "primary",
          "bg-red-400 text-white hover:bg-red-700": variant === "secondary",
          "bg-transparent border border-black text-black":
            variant === "outlined",
          "bg-transparent text-btn-text": variant === "plain",
          "w-full": width == "full",
          "w-fit": width === "fit",
          "active:scale-[0.99]": loading !== APIStatus.Pending,
          "cursor-not-allowed opacity-40": loading === APIStatus.Pending,
        }
      )}
    >
      {loading === APIStatus.Pending ? (
        <>Loading</>
      ) : (
        <>
          {/*  If an icon is provided, render it before the CTA */}
          {Icon !== null ? <>{Icon}</> : <></>}
          {CTA !== "" ? <p className="px-20  font-semibold"> {CTA} </p> : null}
        </>
      )}
    </button>
  );
};

export default Button;
