import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import * as styles from "./ContactForm.module.css";
import { PhoneSchema, EmailSchema, NameSchema } from "./ContactForm.shema";
import { SafeParseReturnType } from "zod";
import { ICertificate } from "../../types/types";
import { sendCertificateData } from "../../utils/sertificate-api";

export const ContactForm = () => {
  const navigate = useNavigate();

  // Загружаем сохраненные данные из localStorage при монтировании компонента
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [comment, setComment] = useState(localStorage.getItem("comment") || "");
  const [selectedCertificate, setSelectedCertificate] =
    useState<ICertificate | null>(
      JSON.parse(localStorage.getItem("selectedCertificate") || "null")
    );
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Функция для валидации поля и обновления ошибки
  const validateField = (field: string, value: string) => {
    let validationResult:
      | SafeParseReturnType<{ name: string }, { name: string }>
      | SafeParseReturnType<{ phone: string }, { phone: string }>
      | SafeParseReturnType<{ email: string }, { email: string }>;

    if (field === "name")
      validationResult = NameSchema.safeParse({ name: value });
    if (field === "phone")
      validationResult = PhoneSchema.safeParse({ phone: value });
    if (field === "email")
      validationResult = EmailSchema.safeParse({ email: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validationResult.success
        ? ""
        : validationResult.error.errors[0].message,
    }));
  };

  const handleBack = () => {
    localStorage.removeItem("selectedCertificate");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("comment");
    navigate("/");
  };

  const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameValid = NameSchema.safeParse({ name }).success;
    const phoneValid = PhoneSchema.safeParse({ phone }).success;
    const emailValid = EmailSchema.safeParse({ email }).success;

    if (nameValid && phoneValid && emailValid) {
      console.log(selectedCertificate);
      try {
        const response = await sendCertificateData(
          selectedCertificate!,
          name,
          phone,
          email,
          comment
        );
        console.log("Данные успешно отправлены!", response);
        navigate("/payment");
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        alert("Произошла ошибка при отправке данных. Попробуйте снова.");
      }
    } else {
      validateField("name", name);
      validateField("phone", phone);
      validateField("email", email);
      console.log("Форма заполнена некорректно");
    }
  };

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("phone", phone);
  }, [phone]);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem("comment", comment);
  }, [comment]);

  return (
    <div className={styles.page}>
      {selectedCertificate ? (
        <>
          <p className={styles.text}>
            Для покупки сертификата на {selectedCertificate.SUMMA} заполните
            пожалуйста форму
          </p>
          <form className={styles.form} onSubmit={handlePay}>
            <h3>Введите контактные данные</h3>
            <TextField
              label="Имя"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateField("name", e.target.value);
              }}
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              label="Телефон"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validateField("phone", e.target.value);
              }}
              error={!!errors.phone}
              helperText={errors.phone}
            />

            <TextField
              label="Почта"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Комментарий"
              variant="standard"
              fullWidth
              margin="normal"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Комментарий"
            />

            <div className={styles.buttonContainer}>
              <Button label="Назад" size="small" onClick={handleBack} />
              <Button label="Оплатить" size="small" />
            </div>
          </form>
        </>
      ) : (
        <div>
          <p className={styles.errorMessageBlock}>
            Ничего не выбрано! <br />
            Пожалуйста вернитесь на предыдущий шаг и выберите сертификат.
          </p>
          <Button label="Назад" size="small" onClick={handleBack} />
        </div>
      )}
    </div>
  );
};

export default ContactForm;
