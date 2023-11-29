import styles from "./LoginContent.module.css";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

const signInFormValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password cannot be empty"),
});

export type SignInFormSchema = Zod.infer<typeof signInFormValidator>;
function LoginContent() {
  const router = useRouter();
  const { register, handleSubmit, setError, formState } =
    useForm<SignInFormSchema>({
      resolver: zodResolver(signInFormValidator),
      mode: "onBlur",
    });
  const { signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (vals) => {
    if (!signIn) return;
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: vals.email,
        password: vals.password,
      });

      if (result?.status === "complete") {
        setIsLoading(false);
        setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError("root", { message: err.errors[0].message });
    }
  });
  return (
    <>
      <main className={styles.container}>
        <h1>Sign In</h1>
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
          <button disabled={isLoading}>Sign In</button>
        </form>

        <p>
          Dont have an account?{" "}
          <a onClick={() => router.push(`/register`)}>Register</a>
        </p>
      </main>
    </>
  );
}
export default LoginContent;
