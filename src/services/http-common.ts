import axios from "axios";
import { DataUser } from "../@types/DataUser";
import { DataPoint } from "../@types/DataPoint";

const api = axios.create({
  baseURL: `http://localhost:8081/api`,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

async function postSignUp(dataForm: DataUser) {
  await api
    .post("/users", dataForm, {
      headers: { "Content-Type": "application/json" },
    })
    .catch((erro) => {
      alert("Ocorreu um erro na API:\n" + erro);
      console.log(erro);
    });
}

async function postCreatePoint(dataPoint: DataPoint) {
  await api
    .post("/point", dataPoint, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response;
    })
    .catch((erro) => {
      alert("Ocorreu um erro na API:\n" + erro);
      console.log(erro);
    });
}

async function getAllListPoint() {
  return await api
    .get("/point", {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.data);
}

async function deletePoint(id: number) {
  return await api
    .post(`/point/${id}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.data);
}

async function postLogin(dataForm: DataUser) {
  try {
    const {
      data: { token },
    } = await api.post("/login", dataForm, {
      headers: { "Content-Type": "application/json" },
    });
    return { token };
  } catch (erro: unknown) {
    if (axios.isAxiosError(erro)) {
      switch (erro.response?.data) {
        case "Cannot find user":
          alert("Usuário não encontrado");
          break;
        case "Incorrect password":
          alert("Senha incorreta");
          break;
        default:
          alert("Ocorreu um erro na API:\n" + erro);
      }
    }
    console.log(erro);
  }
}
export { postSignUp, postLogin, postCreatePoint, getAllListPoint, deletePoint };
