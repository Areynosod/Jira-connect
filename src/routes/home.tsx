import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

function Home() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };
  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Home;
