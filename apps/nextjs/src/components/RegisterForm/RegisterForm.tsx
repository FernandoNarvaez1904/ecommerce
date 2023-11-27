import styles from "./RegisterForm.module.css";
import { useRouter } from "next/router";
function RegisterForm() {
  const router = useRouter();
  return (
    <>
      <form action="" method="post">
        <div className={styles.container}>
          <h1>Sign Up</h1>
          <hr />

          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <label htmlFor="psw">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />

          <label htmlFor="psw-repeat"> Repeat Password </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            required
          />
          <div className={styles.buttonDiv}>
            <button
              type="button"
              className={styles.cancelbtn}
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button type="submit" className={styles.signupbtn}>
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default RegisterForm;
