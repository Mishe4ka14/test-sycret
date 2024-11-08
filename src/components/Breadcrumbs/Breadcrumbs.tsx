import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as styles from "./Breadcrumbs.module.css";

export const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbs = [];

  // Первый шаг: Выбор сертификата
  breadcrumbs.push(
    <li className={styles.crumb} key="home">
      <Link to="/">{"→"} Выбор сертификата</Link>
    </li>
  );

  // Второй шаг: Ввод данных (добавляем только если мы на странице /contact)
  if (location.pathname !== "/") {
    breadcrumbs.push(
      <li className={styles.crumb} key="contact">
        {" → "}
        <Link to="/contact">Ввод данных</Link>
      </li>
    );
  }

  // Третий шаг: Оплата (добавляем только если мы на странице /payment)
  if (location.pathname === "/payment") {
    breadcrumbs.push(
      <li className={styles.crumb} key="payment">
        {" → "}Оплата
      </li>
    );
  }

  return <ul className={styles.breadcrumbs}>{breadcrumbs}</ul>;
};
