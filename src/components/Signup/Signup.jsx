import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Signup = () => {
  const [signupSucces, setSignupSucces] = useState("");
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    console.log(name, email, password, terms)

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
    } else if(!terms) {
      setSignupError(
        "You must accept our terms!"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name
        })
        .then()
        .catch(error => console.log(error.message))

        console.log(result);
        setSignupSucces("User created successfully.");

        sendEmailVerification(result.user)
        .then(() => {
          alert("Please verify your email address.")
        })
        .catch(error => console.log(error.message))
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
            type="text"
            name="name"
            placeholder="Name"
            required
          />
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
          <div>
            <input type="checkbox" name="terms" id="terms"/>
            <label htmlFor="terms">Accept terms</label>
          </div>
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
