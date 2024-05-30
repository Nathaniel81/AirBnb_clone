import { Link } from "react-router-dom";
import { NavLogos } from "../../constants";
import UserNav from "./UserNav";
import SearchComponent from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-4">
        <Link to="/">
          <img 
            src={NavLogos.Desktop} 
            alt="Desktop Logo"
            className="w-12 hidden lg:block"
          />

          <img 
            src={NavLogos.Mobile} 
            alt="Mobile Logo"
            className="block lg:hidden w-24"
          />
        </Link>

        <SearchComponent />
        <UserNav />
      </div>
    </nav>
  );
}