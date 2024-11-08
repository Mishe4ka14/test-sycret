import { useState } from "react";
import Button from "../../components/Button/Button";
import * as styles from "./PaymentPlaceholder.module.css";
import { useNavigate } from "react-router-dom";
export const PaymentPlaceholder = () => {
  const navigate = useNavigate();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleExit = () => {
    localStorage.removeItem("selectedCertificate");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("comment");
    navigate("/");
  };

  return (
    <div className={styles.page}>
      <p className={styles.text}>Оплата...</p>
      <Button label="Выход" size="small" onClick={handleExit} />
    </div>
  );
};
