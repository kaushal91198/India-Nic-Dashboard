import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import FormInputProps from "../components/FormInput";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { signup } from "../redux/slices/authslice";
import Select from "react-select";
import { toast } from "react-toastify";
import Button from "../components/Button";

interface IFormInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: { value: string; label: string }; // Add other roles as needed
  gender: { value: string; label: string };
  country: string;
}

// Joi Validation Schema

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),

  password: Joi.string().min(6).required().label("Password"),

  firstname: Joi.string().min(5).max(255).required().label("First Name"),

  lastname: Joi.string().min(5).max(255).required().label("Last Name"),

  address: Joi.string().min(5).max(255).required().label("Address"),

  phoneNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/) // E.164 format
    .required()
    .label("Phone Number"),

  role: Joi.object({
    value: Joi.string().valid("admin", "user").required(),
    label: Joi.string().required(),
  })
    .required()
    .label("Role"),
  gender: Joi.object({
    value: Joi.string().valid("male", "female").required(),
    label: Joi.string().required(),
  }),

  country: Joi.string().min(2).max(100).required().label("Country"),
});

const LoginPage: React.FC = () => {
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const {
    setValue,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: joiResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log("Login data:", data);
    dispatch(
      signup({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        country: data.country,
        gender: data.gender.value,
        role: data.role.value,
        address: data.address,
        password: data.password,
        phoneNumber: data.phoneNumber,
      })
    ).then((res) => {
      if (signup.fulfilled.match(res)) {
        toast.success("successfully role created ");
        navigate("/");
      }
    });
    // Implement your login logic here
  };

  const loading = useAppSelector((state) => state.auth.signupStatus);

  return (
    <div className="min-h-screen flex items-center justify-center bg-baseline-400 p-40">
      <div className="w-full flex flex-col gap-80 max-w-md p-80 bg-[var(--baseline-100)]/80 backdrop-blur-md rounded-xl shadow-3xl">
        <h2 className="text-3xl font-bold mb-8 text-[var(--text-baseline-100)] text-center">
          Sign Up
        </h2>

        <form
          className="flex flex-col gap-150"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email Field */}
          <FormInputProps
            setValue={setValue}
            asterisk
            label="First Name"
            name="firstname"
            type="text"
            register={register}
            error={errors.firstname?.message}
          />
          <FormInputProps
            setValue={setValue}
            asterisk
            label="Last Name"
            name="lastname"
            type="text"
            register={register}
            error={errors.firstname?.message}
          />
          <FormInputProps
            setValue={setValue}
            asterisk
            label="Country"
            name="country"
            type="text"
            register={register}
            error={errors.country?.message}
          />
          <FormInputProps
            setValue={setValue}
            asterisk
            label="Address"
            name="address"
            type="text"
            register={register}
            error={errors.address?.message}
          />
          <FormInputProps
            setValue={setValue}
            asterisk
            label="Phone Number"
            name="phoneNumber"
            type="text"
            register={register}
            error={errors.phoneNumber?.message}
          />
          <FormInputProps
            setValue={setValue}
            asterisk
            label="Email"
            name="email"
            type="text"
            register={register}
            error={errors.email?.message}
          />
          <div className="flex gap-100 w-full justify-between">
            <div className="w-full">
              <label className="text-text-baseline-300">Gender</label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select {...field} options={genderOptions} />
                )}
              />
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="text-text-baseline-300">Role</label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select {...field} options={roleOptions} />
                )}
              />
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <FormInputProps
            asterisk
            setValue={setValue}
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
          <div className="text-text-baseline-200 flex justify-between font-semibold">
            <Link to={"/forgetpassword"}>Forget Password ?</Link>
            <Link to={"/"}> Already have an account?</Link>
          </div>
          <Button
            CTA="Signup"
            width="full"
            type="submit"
            variant="primary"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
