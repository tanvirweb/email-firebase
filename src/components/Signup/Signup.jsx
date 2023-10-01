const Signup = () => {
    const handleForm = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password)
    }

    return (
        <div>
            <form onSubmit={handleForm} className="max-w-md mx-auto p-4 rounded-md border my-10">
                <legend className="font-bold text-center text-xl mb-4">Sign Up Form</legend>
                <div className="space-y-3">
                    <input className="w-full py-2 px-4 rounded border" type="email" name="email" placeholder="Your email..." />
                    <input className="w-full py-2 px-4 rounded border" type="password" name="password" placeholder="Password" />
                    <input className="w-full py-2 px-4 rounded border bg-lime-900 text-white cursor-pointer" type="submit" value="Sign Up" />
                </div>
            </form>
        </div>
    );
};

export default Signup;