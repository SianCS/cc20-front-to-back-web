function FormInput({ name, register,errors,type="text" }) {
  return (
    <>
    <input
      className="border w-full rounded-md p-1 px-4"
      placeholder={name}
      type={type}
      {...register(name)}
      />
      <p>
        {
          errors[name] && <p className="text-red-700 text-sm">{errors[name].message}</p>
        }
      </p>
      </>
  );
}
export default FormInput;
