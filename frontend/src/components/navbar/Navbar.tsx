import { Link } from "react-router-dom";
import { NavImages } from "../../constants";
import SearchBar from "./SearchBar";
import UserNav from "./UserNav";


const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between py-4">
        <Link to="/">
        <div className="flex justify-between items-center gap-3">
          <img
            src={NavImages.logo} 
            alt="Desktop Logo"
            className="w-12 h-12"
          />
          <img
            src={NavImages.logoName} 
            alt="Desktop Logo"
            className="w-32 h-9 hidden lg:block"
          />
        </div>
        </Link>
        
        <SearchBar />
        <UserNav />
      </div>
    </nav>
  );
}

export default Navbar
