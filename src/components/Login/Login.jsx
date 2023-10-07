import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";

const Login = () => {
    const [successMsg, setSuccessMsg] = useState(null);
    const userEmail = useRef(null)

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setSuccessMsg("");

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            if(result.user.emailVerified) {
              setSuccessMsg("Seccessfully logged in")
              console.log(result.user)
            } else {
              alert("Verify your email address")
            }
        })
        .catch(err => {
            console.log(err.message)
        })
    };

    const handleResetPassword = () => {
      const email = userEmail.current.value;
      if(!email) {
        console.log("Please add an email!")
        return;
      } else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        console.log("please provide valid email address")
        return;
      }

      sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Check you email for password change")
      })
      .catch(err => console.log(err.message))
    }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                ref={userEmail}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
              <label className="label">
                <a href="#" onClick={handleResetPassword}  className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Login" />
            </div>
            <p>{successMsg}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
