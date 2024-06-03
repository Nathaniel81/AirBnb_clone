import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

import { Link } from "react-router-dom";
import { 
  useDispatch,
  useSelector
} from "react-redux";
import { RootState } from "@/redux/store";
import { NavImages } from "@/constants";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useEffect } from "react";
import { addUser } from "@/redux/state";
import { AppDispatch } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";


const UserNav = () => {
  const user = useSelector((state: RootState) => state.userInfo);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/api/auth/login/';
  }

  const query = new URLSearchParams(location.search);
  const code = query.get('code');

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        try {
          const response = await axios.get(`/api/auth/callback?code=${code}`, {
            withCredentials: true,
          });
          const userData = response.data;
          dispatch(addUser(userData.user));
        } catch (error) {
          console.error('Error during authentication', error);
          toast({
            title: 'Something went wrong',
            variant: 'destructive',
          })
        }
        navigate('/');
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, [location, code, dispatch, navigate]);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src={
              user?.picture ??
              NavImages.user
            }
            alt="Image of the user"
            className="rounded-full h-8 w-8 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuItem asChild>
                <Link to="/create" className="w-full text-start">
                  Airbnb your Home
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/my-homes" className="w-full">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/favorites" className="w-full">
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/reservations" className="w-full">
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/" className="w-full">Logout</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <div onClick={() => handleLogin()} className="w-full">Sign In</div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
