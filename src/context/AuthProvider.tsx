import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  authProvider,
  LoginRequest,
  LoginResponse,
  User,
} from "../security/authUtils";
import { jwtDecode } from "jwt-decode";
import getToken from "../security/authToken";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  username: string | null;
  signIn: (user: User) => Promise<LoginResponse>;
  signOut: () => Promise<void>;
  isLoggedIn: () => boolean;
  isLoggedInAs: (role: string[]) => boolean;
}

interface DecodedToken {
  exp: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

// let logoutTimer: number | null = null; // used to clear scheduled signout, if a new token is given e.g a new login
let logoutTimer: ReturnType<typeof setTimeout> | null = null;

export default function AuthProvider({ children }: { children: ReactNode }) {
  //We use this to distinguish between being logged in or not
  const initialUsername = localStorage.getItem("username") || null;
  const [username, setUsername] = useState<string | null>(initialUsername);
  const { toast } = useToast();

  const signIn = async (user_: LoginRequest) => {
    return authProvider.signIn(user_).then(user => {
      setUsername(user.username);
      localStorage.setItem("username", user.username);
      localStorage.setItem("roles", JSON.stringify(user.roles));
      localStorage.setItem("token", user.token);

      // Decode token to get expiration time
      const decoded: DecodedToken = jwtDecode(user.token);
      const expiresAt = new Date(decoded.exp * 1000); // Convert to milliseconds
      const timeout = expiresAt.getTime() - new Date().getTime(); // Time until expiration

      // Schedule logout just before the token expires (clears any previous scheduled logout)
      clearTimeout(logoutTimer!);
      logoutTimer = setTimeout(() => {
        // schedules the signout function to be called after the timeout
        signOut();
      }, timeout); // Timeout is set as the delay
      toast({
        title: "Logget ind",
        description: "Du er nu logget ind som " + user.username + ".",
        variant: "default",
        className: "bg-green-500 text-white",
      });

      return user;
    });
  };

  // Invalidate token in backend, and remove userinfo from localstorage
  const signOut = async () => {
    // Clear the logout timer on signout
    clearTimeout(logoutTimer!);
    // Proceed with client-side cleanup
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");

    // Clear basket items
    localStorage.removeItem("salesBasket");
    localStorage.removeItem("bookingBasket");

    toast({
      title: "Logget ud",
      description: "Du er nu logget ud.",
      variant: "default",
      className: "bg-green-500 text-white",
    });
  };

  // If certain actions require a user to have multiple specific roles - we might need to change/adjust this logic
  function isLoggedIn() {
    return username != null;
  }

  function isLoggedInAs(role: string[]) {
    const roles: Array<string> = JSON.parse(
      localStorage.getItem("roles") || "[]"
    );
    return roles?.some(r => role.includes(r)) || false;
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      const isExpired = new Date(decoded.exp * 1000) < new Date();
      if (isExpired) {
        signOut(); // Logout immediately, if the token is expired
      } else {
        const timeout =
          new Date(decoded.exp * 1000).getTime() - new Date().getTime();
        // Clear existing logout timer and schedule a new logout
        clearTimeout(logoutTimer!);
        logoutTimer = setTimeout(() => {
          signOut();
        }, timeout);
      }
    }
  }, []);

  const value = { username, isLoggedIn, isLoggedInAs, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
