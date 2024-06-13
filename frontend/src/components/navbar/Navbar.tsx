import { Link } from "react-router-dom";
import { NavImages } from "../../constants";
import SearchBar from "./SearchBar";
import UserNav from "./UserNav";


const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between py-4">
        <Link to="/">
          <img
            src={NavImages.Logo} 
            alt="Desktop Logo"
            className="w-32 hidden lg:block"
          />

          <img 
            src={NavImages.Logo} 
            alt="Mobile Logo"
            className="block lg:hidden w-24"
          />
        </Link>
        
        <SearchBar />
        <UserNav />
      </div>
    </nav>
  );
}

export default Navbar
