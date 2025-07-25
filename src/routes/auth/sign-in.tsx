import { useState } from "react";
import InputWithLabel from "../../components/input-with-label";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-2 text-sm text-gray-600">Access your account</p>
          </div>

          <div className="space-y-6">
            <InputWithLabel
              value={email}
              onChange={setEmail}
              placeholder="Email address"
              type="email"
            />

            <InputWithLabel
              value={password}
              onChange={setPassword}
              placeholder="Password"
              type="password"
            />

            <button
              className="uk-btn uk-btn-default hover:bg-blue-300 cursor-pointer flex justify-center items-center w-full"
              onClick={handleSignIn}
            >
              Sign In
            </button>

            <div className="text-center space-y-2">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign up here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
