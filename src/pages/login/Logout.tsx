import { useEffect } from "react";
import { useAuth } from "../../security/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wrap the logout operation in a useEffect to avoid updating state during rendering
    if (auth) {
      auth.signOut().then(() => {
        navigate("/login"); // Redirect after logging out / we can change this to other stuff if we'd like
      });
    }
  }, [auth, navigate]); // Dependencies array ensures this effect runs only when auth or navigate changes

  // Render a loading indicator while the logout process completes (for example of slow servers)
  return <div>Logging out...</div>;
}
