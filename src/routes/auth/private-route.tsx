import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(session);
  return <div>{session ? <>{children}</> : <Navigate to="/sign-in" />}</div>;
};

export default PrivateRoute;
