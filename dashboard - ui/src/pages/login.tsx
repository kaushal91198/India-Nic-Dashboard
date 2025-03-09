import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import FormInput from "../components/FormInput";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { login } from "../redux/slices/authslice";
import { toast } from "react-toastify";

interface IFormInputs {
  email: string;
  password: string;
}

// Joi Validation Schema
const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});

const LoginPage: React.FC = () => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: joiResolver(schema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log("Login data:", data);
    dispatch(login({ email: data.email, password: data.password })).then(
      (res) => {
        if (login.fulfilled.match(res)) {
          toast.success("Login Successfully");
          localStorage.setItem("sessionid", res.payload.sessionId);
          res.payload.role === "user"
            ? navigate("/user-dashboard")
            : navigate("/admin-dashboard");
        }
      }
    );
  };

  const loading = useAppSelector((state) => state.auth.loginStatus);

  return (
    <div className="min-h-screen flex items-center justify-center bg-baseline-400 p-40">
      <div className="w-full flex flex-col gap-80 max-w-md p-80 bg-[var(--baseline-100)]/80 backdrop-blur-md rounded-xl shadow-3xl">
        <h2 className="text-3xl font-bold mb-8 text-[var(--text-baseline-100)] text-center">
          Log In
        </h2>

        <form
          className="flex flex-col gap-150"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email Field */}
          <FormInput
            setValue={setValue}
            asterisk
            label="Email"
            name="email"
            type="text"
            register={register}
            error={errors.email?.message}
          />

          {/* Password Field */}
          <FormInput
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
            <Link to={"/register"}> dont have an account?</Link>
          </div>
          <Button
            CTA="Login"
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
