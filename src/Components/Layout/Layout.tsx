import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Layout.scss';
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      
      <div className="content">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default Layout;
