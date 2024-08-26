import { createContext, useEffect, useState } from "react";
import { StoneType } from "../@types/types";
import { getStones } from "../services/stones";
import { useStones } from "../hooks/useStones";

export const StoneContext = createContext({
  stones: [{}] as StoneType[],
  stonesLoading: false,
  stonesError: null as string | null | undefined,
  refresh: () => {},
  getStoneByName: (name: string) => {
    return {} as StoneType;
  },
});

export const StoneContextProvider = ({ children }) => {
  const [stones, setStones] = useState<StoneType[]>([]);
  const [stonesLoading, setStonesLoading] = useState(false);
  const [stonesError, setStonesError] = useState<string | null>();

  let {
    stones: newStones,
    isLoading: newIsLoading,
    error: newError,
  } = useStones();
  useEffect(() => {
    setStones(newStones);
    setStonesLoading(newIsLoading);
    setStonesError(newError);
  }, [newStones, newIsLoading, newError]);

  const refresh = () => {
    setStonesError(null);
    setStonesLoading(true);
    getStones()
      .then((res) => {
        setStones(res.data);
        setStonesError(null);
      })
      .catch((e) => {
        setStonesError("Network error");
      })
      .finally(() => {
        setStonesLoading(false);
      });
  };

  const getStoneByName = (name: string) => {
    return (
      stones.find((stone) => stone.name === name) ?? {
        _id: "",
        name: "",
        zodiac: "",
        description: "",
        imageFileName: "",
      }
    );
  };

  return (
    <StoneContext.Provider
      value={{ stones, stonesLoading, stonesError, refresh, getStoneByName }}
    >
      {children}
    </StoneContext.Provider>
  );
};
