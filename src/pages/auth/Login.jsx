import React from "react";
import FormInput from "../../components/form/FormInput";
import { createAlert } from "../../utils/createAlert";
import { useForm } from "react-hook-form";
import Buttons from "../../components/form/Buttons";
import {yupResolver} from '@hookform/resolvers/yup'
import { loginSchema } from "../../utils/validator";
import { actionLogin } from "../../api/auth";

function Login() {
  // JS

  const { handleSubmit, register, formState,reset } = useForm({
    resolver:yupResolver(loginSchema)
  });
  const { isSubmitting, errors } = formState;
  // console.log(errors)
  const hdlSubmit = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const res = await actionLogin(value)

      console.log(res);
      createAlert("success", res.data.message);
      reset()
    } catch (error) {
      console.log(error);
      createAlert("info", error.response?.data?.message);
    }
  };

  return (
    <div className="flex w-full h-full justify-end">
      <div className="border w-64 p-4 m-4 rounded-md ">
        <h1 className="font-bold text-center mb-4">Login</h1>
        {/* Form */}
        <form onSubmit={handleSubmit(hdlSubmit)}>
          <div className="flex flex-col gap-4">
            <FormInput register={register} name="email" errors={errors} />
            <FormInput register={register} name="password" errors={errors} type="password"/>
          </div>

          <div className="flex justify-center mt-4">
            <Buttons label="Login" isSubmitting={isSubmitting} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
