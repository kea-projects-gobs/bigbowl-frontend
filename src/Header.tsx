import bigbowlicon from "./assets/bigbowlicon.png";
import { useNavigate, useLocation } from "react-router";
import { useBasket } from "./context/BasketProvider";

import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { useAuth } from "./context/AuthProvider";
import { Link } from "react-router-dom";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { basketCount } = useBasket();

  const auth = useAuth();

  const handleBasketClick = () => {
    if (location.pathname.startsWith("/sales")) {
      navigate("/sales/basket");
    } else if (location.pathname.startsWith("/booking")) {
      navigate("/booking/basket");
    }
  };

  const handleProfileClick = () => {
    if (!auth?.username) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      navigate("/user");
    }
  };

  const handleLogout = () => {
    auth?.signOut();
    navigate("/");
  };

  return (
    <header className="border-b-[1px] border-border border-solid w-full pb-4 ">
      <div className="flex items-center justify-end gap-4 px-2 py-2">
        <button
          className="flex gap-1 hover:opacity-50"
          onClick={handleProfileClick}
        >
          <PersonIcon className="w-4 h-4 cursor-pointer" />
          <p className="text-[12px] ">{auth?.username}</p>
        </button>
        {auth?.isLoggedIn() && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleLogout}>
                  <ExitIcon className="w-4 h-4 cursor-pointer hover:opacity-50" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log ud</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-center justify-between px-2">
        <div>
          <Link to="/">
            <img
              className="max-w-[10rem]"
              src={bigbowlicon}
              alt="bigbowlicon"
            />
          </Link>
        </div>
        <div className="relative">
          <svg
            className="block w-6 h-6 cursor-pointer hover:opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            onClick={handleBasketClick}
          >
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>
          {basketCount > 0 && (
            <span className="absolute bottom-4 left-4 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center text-[0.75rem]">
              {basketCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
