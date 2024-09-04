import axios from "axios";
import { StoneType } from "../@types/types";

export const stonesUrl = `${import.meta.env.VITE_SERVER_URL}/api/stones`;

export const getStones = () => axios.get(stonesUrl);

export const editStone = (stoneId: string, stone: any, image?: string) => {
  let formData = new FormData();
  formData.append("stone", JSON.stringify(stone));
  image && formData.append("image", image);
  return axios.put(`${stonesUrl}/${stoneId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};

export const addStone = async (stone: StoneType, image: string) => {
  let formData = new FormData();
  formData.append("stone", JSON.stringify(stone));
  formData.append("image", image);
  return axios.post(stonesUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};

export const deleteStone = (stoneId: string) =>
  axios.delete(`${stonesUrl}/${stoneId}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
