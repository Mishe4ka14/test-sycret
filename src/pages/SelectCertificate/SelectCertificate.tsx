import { useEffect, useState } from "react";
import { fetchCertificates } from "../../utils/sertificate-api";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material"; // Импортируем SelectChangeEvent
import * as styles from "./SelectCertificate.module.css";

export const SelectCertificate = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function fetchCertificatesData() {
      try {
        const response = await fetchCertificates();
        console.log("Сертификаты получены:", response);
        setCertificates(response);
      } catch (error) {
        console.error("Ошибка при загрузке сертификатов:", error);
        setError("Не удалось загрузить сертификаты");
      } finally {
        setLoading(false);
      }
    }

    fetchCertificatesData();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const certificateId = event.target.value;
    setSelectedCertificate(certificateId);
    console.log(event.target.value.ID);
  };

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.titleContainer}>
          <h1>Sertificate Service</h1>
          <p>
            Добро пожаловать в Sertificate Service! <br />
            Тут вы можете найти сертификаты на любой вкус и по отличным ценам!
          </p>
        </div>
        <h2>Выберите сертификат</h2>
        <Select
          onChange={handleSelectChange}
          className={styles.select}
          value={selectedCertificate || ""}
        >
          <MenuItem value="" disabled>
            Выберите сертификат
          </MenuItem>
          {certificates.map((certificate) => (
            <MenuItem key={certificate.Id} value={certificate.Id}>
              {certificate.SUMMA} ₽
            </MenuItem>
          ))}
        </Select>

        {selectedCertificate && (
          <div>
            <h3>Детали сертификата</h3>
            <p>
              Название:{" "}
              {certificates.find((c) => c.Id === selectedCertificate)?.Name}
            </p>
            <p>
              Описание:{" "}
              {
                certificates.find((c) => c.Id === selectedCertificate)
                  ?.Description
              }
            </p>
            <p>
              Цена:{" "}
              {certificates.find((c) => c.Id === selectedCertificate)?.Price} ₽
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
