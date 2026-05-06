import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllNotifications from "../pages/AllNotifications";
import PriorityInbox from "../pages/PriorityInbox";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllNotifications />} />
        <Route path="/priority" element={<PriorityInbox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;