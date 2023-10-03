import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Signup = () => {
  const [signupSucces, setSignupSucces] = useState("");
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setSignupSucces("");
    setSignupError("");

    if (password.length < 6) {
      setSignupError("Password can't be less than 6 charector.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setSignupError(
        "Password must contain at least one upper case charector."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSignupSucces("User created successfully.");
      })
      .catch((error) => {
        console.log(error, error.message);
        setSignupError(error.message);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleForm}
        className="max-w-md mx-auto p-4 rounded-md border my-10"
      >
        <legend className="font-bold text-center text-xl mb-4">
          Sign Up Form
        </legend>
        <div className="space-y-3">
          <input
            className="w-full py-2 px-4 rounded border"
            type="email"
            name="email"
            placeholder="Your email..."
            required
          />
          <input
            className="w-full py-2 px-4 rounded border"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer font-bold text-sm">Show Password</span>
          <input
            className="w-full py-2 px-4 rounded border bg-lime-900 text-white cursor-pointer"
            type="submit"
            value="Sign Up"
          />
        </div>
        {signupSucces && (
          <p className="text-center text-green-700 text-sm font-bold pt-3">
            {signupSucces}
          </p>
        )}
        {signupError && (
          <p className="text-center text-red-700 text-sm font-bold pt-3">
            {signupError}
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;
