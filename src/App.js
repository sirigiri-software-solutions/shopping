import React from "react";
import { ToastContainer } from "react-toastify";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Vendor from "./Vendor";
import Home from "./Home";
import Customer from "./Customer";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/customer" element={<Customer />} />

      </Routes>
    </Router>
  );
}
export default App;


// new way
// import React from "react";
// import { ToastContainer } from "react-toastify";
// import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Vendor from "./Vendor";
// import Home from "./Home";
// import Customer from "./Customer";
// import ProtectedRoute from "./ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/vendor"
//           element={<Vendor />}
//         />
//       </Routes>
//     </Router>
//   );
// }
// export default App;

// const App = () => {
//   return (
//     <BrowserRouter>
//       <DataProvider>
//         <ToastContainer />
//         <Routes>
//           <Route index element={<Login />} />
//           <Route path="/mainPage" element={
//             <ProtectedRoute>
//               <MainPage />
//             </ProtectedRoute>} />
//           <Route path="/signUp" element={<SignUp />} />
//         </Routes>
//       </DataProvider>
//     </BrowserRouter>
//   )
// }
