import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";


const RootLayout = () => {
  return (
    <div className='mx-auto px-5 lg:px-[5%]'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
