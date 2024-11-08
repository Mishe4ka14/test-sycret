import { z } from "zod";

// cхемы валидации zod
export const PhoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Введите номер телефона")
    .refine(
      (val) => {
        // удаляем все нечисловые символы, кроме начального "+"
        const cleanedValue = val.startsWith("+")
          ? `+${val.slice(1).replace(/\D/g, "")}`
          : val.replace(/\D/g, "");

        return /^(?:\+7|8)\d{10}$/.test(cleanedValue);
      },
      {
        message: "Неверный формат телефона",
      }
    ),
});

export const EmailSchema = z.object({
  email: z.string().min(1, "Введите email").email("Неверный формат email"),
});

export const NameSchema = z.object({
  name: z.string().min(1, "Введите имя"),
});
