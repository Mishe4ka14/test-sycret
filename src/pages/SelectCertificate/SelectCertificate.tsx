import { useEffect, useState } from "react";
import { fetchCertificates } from "../../utils/sertificate-api";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import * as styles from "./SelectCertificate.module.css";
import { ICertificate } from "../../types/types";
import CustomButton from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export const SelectCertificate = () => {
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] =
    useState<ICertificate | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCertificatesData() {
      try {
        const response = await fetchCertificates();
        setCertificates(response);
      } catch (error) {
        setError("Не удалось загрузить сертификаты :(");
      } finally {
        setLoading(false);
      }
    }

    fetchCertificatesData();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const selectedCert =
      certificates.find((cert) => cert.ID === selectedId) || null;
    setSelectedCertificate(selectedCert);
    localStorage.setItem("selectedCertificate", JSON.stringify(selectedCert));
    console.log(localStorage.getItem("selectedCertificate"));
  };

  const handleClickBtn = () => {
    navigate("/contact");
  };

  return (
    <div className={styles.page}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Sertificate Service</h1>
        <p className={styles.subtitle}>
          Добро пожаловать в Sertificate Service! <br />
          Тут вы можете найти сертификаты на любой вкус и по отличным ценам!
        </p>
      </div>
      <h2>Доступные сертификаты</h2>
      {loading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Select
          onChange={handleSelectChange}
          className={styles.select}
          value={selectedCertificate?.ID || ""}
          displayEmpty
          renderValue={(value) => {
            if (!value) {
              return <span>Выберите сертификат</span>;
            }
            return certificates.find((c) => c.ID === value)?.PRICE + " ₽";
          }}
        >
          {certificates.map((certificate, index) => (
            <MenuItem key={index} value={certificate.ID}>
              {certificate.PRICE} ₽
            </MenuItem>
          ))}
        </Select>
      )}

      {selectedCertificate && (
        <>
          <p className={styles.textSumma}>
            Для Вас: <br />
            <span className={styles.specialPrice}>специальная цена -</span>{" "}
            {selectedCertificate.SUMMA}
            {"₽"}
          </p>
          <CustomButton onClick={handleClickBtn} label="Купить" size="large" />
        </>
      )}
    </div>
  );
};
