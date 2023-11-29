import styles from "./RegisterForm.module.css";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";

const signUpFormValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormSchema = Zod.infer<typeof signUpFormValidator>;

function RegisterForm() {
  const router = useRouter();

  const { register, handleSubmit, setError, formState } =
    useForm<SignUpFormSchema>({
      resolver: zodResolver(signUpFormValidator),
      mode: "onBlur",
    });
  const { signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (vals) => {
    if (!signUp) return;
    setIsLoading(true);

    try {
      const result = await signUp.create({
        emailAddress: vals.email,
        password: vals.password,
      });

      if (result?.status === "missing_requirements") {
        alert("mising");
      }

      if (result?.status === "complete") {
        setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError("root", { message: err.errors[0].message });
    }
    setIsLoading(false);
  });

  return (
    <main className={styles.container}>
      <h1>Sign Up</h1>
      <hr />
      {formState.errors.root && (
        <p className={styles.errorMsg}>{formState.errors.root?.message}</p>
      )}

      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          required
          {...register("email")}
        />
        <label htmlFor="psw">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          required
          {...register("password")}
        />
        {/* <div className={styles.buttonDiv}> */}
        <button
          type={"submit"}
          className={styles.signupbtn}
          disabled={isLoading}
        >
          Sign Up
        </button>
        {/* <button onClick={() => router.push(`/login`)}> Cancel </button>
        </div> */}
      </form>

      <p>
        have an account? <a onClick={() => router.push(`/login`)}>Log in</a>
      </p>
    </main>
  );
}
export default RegisterForm;
