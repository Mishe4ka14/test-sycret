import { ICertificate } from "../types/types";

const URL_API: string = "https://sycret.ru/service/api/api";
const API_KEY: string = "011ba11bdcad4fa396660c2ec447ef14";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchCertificates = async (): Promise<ICertificate[]> => {
  const methodName = "OSGetGoodList";

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

export const sendCertificateData = async (
  selectedCertificate: ICertificate,
  name: string,
  phone: string,
  email: string,
  message?: string
) => {
  const apiKey = "011ba11bdcad4fa396660c2ec447ef14";
  const methodName = "OSSale";

  if (!selectedCertificate) {
    console.error("Сертификат не выбран.");
    return;
  }

  // параметры для запроса
  const params = new URLSearchParams({
    ApiKey: apiKey,
    MethodName: methodName,
    Id: selectedCertificate.ID.toString(),
    TableName: selectedCertificate.TABLENAME,
    PrimaryKey: selectedCertificate.PRIMARYKEY,
    Price: selectedCertificate.PRICE.toString(),
    Summa: selectedCertificate.SUMMA.toString(),
    ClientName: name,
    Phone: phone,
    Email: email,
    PaymentTypeId: "2",
    UseDelivery: "0",
    IsGift: "0",
    MsgText: message || "",
    PName: "",
    PPhone: "",
  });

  const urlWithParams = `https://sycret.ru/service/api/api?${params.toString()}`;
  console.log(urlWithParams);
  try {
    console.log("Запрос URL:", urlWithParams);

    const response = await fetch(urlWithParams, {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Сертификат успешно сохранен на сервере", data);
      return data;
    } else {
      console.error("Ошибка при отправке данных на сервер:", data);
      throw new Error("Ошибка при отправке данных на сервер");
    }
  } catch (error) {
    console.error("Ошибка при запросе к серверу:", error);
    throw error;
  }
};
