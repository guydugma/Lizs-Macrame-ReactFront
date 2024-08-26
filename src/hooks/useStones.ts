import { useEffect, useState } from "react";
import { StoneType } from "../@types/types";
import { addStone, getStones } from "../services/stones";



export const useStones = () => {

  const [stones, setStones] = useState<StoneType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect( () => {
    setError(null);
    setIsLoading(true);
    getStones()
      .then((res) => {
        setStones(res.data);
        setError(null);
      })
      .catch((e) => {
        setError("Network error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { stones, isLoading, error };
};

export const useNewStone = (stone: StoneType, image:string) => { 
  const [newStone, setNewStone] = useState<StoneType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect( () => {
    setError(null);
    setIsLoading(true);
    addStone(stone, image)
      .then((res) => {
        setNewStone(res.data);
        setError(null);
      })
      .catch((e) => {
        setError("Network error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { newStone, isLoading, error };
}