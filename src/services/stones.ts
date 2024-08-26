import axios from "axios";
import { StoneType } from "../@types/types";

export const stonesUrl = `${import.meta.env.VITE_SERVER_URL}/api/stones`;

export const getStones = () => axios.get(stonesUrl);

export const editStone = (stoneId: string, image: string, stone: any) => {
  let formData = new FormData();
  console.log(stone);
  formData.append("stone", JSON.stringify(stone));
  formData.append("image", image);
  return axios.put(`${stonesUrl}/${stoneId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
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
    },
  });
};

export const deleteStone = (stoneId: string) =>
  axios.delete(`${stonesUrl}/${stoneId}`);
