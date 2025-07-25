import { useState } from "react";
import InputWithLabel from "../../components/input-with-label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const handleSignIn = async () => {
    const { data, error } = await signIn(email, password);
    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
      navigate("/");
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h2>Sign In</h2>
            <p>Access your account</p>
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

            <button className="cursor-pointer" onClick={handleSignIn}>
              Sign In
            </button>

            <div className="">
              <div>
                Don't have an account?{" "}
                <Link to="/sign-up">
                  <p className="cursor-pointer">Sign up here</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
