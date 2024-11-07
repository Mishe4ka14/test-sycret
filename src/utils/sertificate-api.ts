import { ICertificate } from "../types/types";

const URL_API: string = "https://sycret.ru/service/api/api";
const API_KEY: string = "011ba11bdcad4fa396660c2ec447ef14";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchCertificates = async (): Promise<ICertificate[]> => {
  const methodName = "OSGetGoodList";

  // Строим параметры для запроса
  const params = new URLSearchParams({
    ApiKey: API_KEY,
    MethodName: methodName,
  });

  const urlWithParams = `${URL_API}?${params.toString()}`;

  try {
    console.log("Запрос URL:", urlWithParams);

    const response = await fetch(urlWithParams, {
      method: "GET",
    });

    const data = await checkResponse<{
      result: number;
      resultdescription: string;
      data: ICertificate[];
    }>(response);

    console.log("Ответ от сервера:", data);

    if (data.result === 0) {
      return data.data;
    } else {
      throw new Error(data.resultdescription);
    }
  } catch (error) {
    console.error("Ошибка при получении сертификатов:", error);
    throw error;
  }
};
