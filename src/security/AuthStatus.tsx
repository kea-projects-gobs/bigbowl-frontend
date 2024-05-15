import { useAuth } from "./AuthProvider";
import { NavLink, Link } from "react-router-dom";

interface AuthStatusProps {
  closeMenu?: () => void;
}

export default function AuthStatus({ closeMenu }: AuthStatusProps) {
    const auth = useAuth();
  
    if (!auth?.isLoggedIn()) {
       return (
         <li>
           <NavLink to="/login" onClick={closeMenu}>Log ind</NavLink>
         </li>
       );
     } else {
       return (
         <li>
           <Link to="/logout" onClick={closeMenu}>Log ud ({auth.username}) </Link>
         </li>
       );
     }
   }
