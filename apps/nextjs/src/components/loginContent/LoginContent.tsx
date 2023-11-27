import styles from "./LoginContent.module.css";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useRouter } from "next/router";
function LoginContent() {
  const router = useRouter();
  return (
    <>
      <main className={styles.container}>
        <h1> Sign In</h1>
        <form action="" method="post">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            required
          />
          <label htmlFor="psw">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />
        </form>
        <button>Sign In</button>
        <p>
          Dont have an account?{" "}
          <a onClick={() => router.push(`/register`)}>Register</a>
        </p>
      </main>
    </>
  );
}
export default LoginContent;
