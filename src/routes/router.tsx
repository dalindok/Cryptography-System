import { Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import RSAPage from "../pages/RSAPage";
import CeaserPage from "../pages/CeaserPage";

const RouteNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/rsa" element={<RSAPage />} />
      <Route path="/ceaser" element={<CeaserPage />} />
    </Routes>
  );
};

export default RouteNavigation;
