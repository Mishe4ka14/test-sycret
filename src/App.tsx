import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SelectCertificate } from "./pages/SelectCertificate/SelectCertificate";
// import ContactForm from "./pages/ContactForm/ContactForm";
// import PaymentPlaceholder from "./pages/PaymentPlaceholder/PaymentPlaceholder";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">{"→"} Выбор сертификата</Link>
          </li>
          {/* <li>
            <Link to="/contact">
              {"→"} Ввод данных
            </Link>
          </li>
          <li>
            <Link to="/payment">
              {"→"} Оплата
            </Link>
          </li> */}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SelectCertificate />} />
        {/* <Route path="/contact" element={<ContactForm />} /> */}
        {/* <Route path="/payment" element={<PaymentPlaceholder />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
