import { useState } from "react";
import InputWithLabel from "../../components/input-with-label";
import { useAuth } from "../../context/auth-context";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useAuth();

  const handleSignUp = async () => {
    const { error } = await signUp(email, password);
    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h2>Sign Up</h2>
            <p>Create your new account</p>
          </div>

          <div>
            <div>
              <InputWithLabel
                value={firstName}
                onChange={setFirstName}
                placeholder="First name"
                type="text"
              />

              <InputWithLabel
                value={lastName}
                onChange={setLastName}
                placeholder="Last name"
                type="text"
              />
            </div>

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

            <button onClick={handleSignUp}>Sign Up</button>

            <div>
              <div>
                Already have an account?
                <Link to="/sign-in">
                  <p>Sign in here</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
