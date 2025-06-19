import { object, ref, string } from "yup";

export const registerSchema = object({
  email: string().email("Email ไม่ถูกต้อง").required("Put your Email"),
  name: string().min(2, "Name ต้องมากกว่า2"),
  password: string().min(6, "Password ต้องมากกว่า 6"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Password not Match"
  ),
});

export const loginSchema = object({
  email: string().email("Email ไม่ถูกต้อง").required("Put your Email"),
  password: string().min(6, "Password ต้องมากกว่า 6"),
});