import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SelectCertificate } from "./pages/SelectCertificate/SelectCertificate";
import ContactForm from "./pages/ContactForm/ContactForm";
import { Breadcrumbs } from "./components/Breadcrumbs/Breadcrumbs";
import { PaymentPlaceholder } from "./pages/PaymentPlaceholder/PaymentPlaceholder";

function App() {
  return (
    <Router>
      <nav>
        <Breadcrumbs />
      </nav>
      <Routes>
        <Route path="/" element={<SelectCertificate />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/payment" element={<PaymentPlaceholder />} />
      </Routes>
    </Router>
  );
}

export default App;
