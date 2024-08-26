import { useEffect, useState } from "react";
import auth from "../services/auth";
import { RegisterUser, decodedType } from "../@types/types";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
  const [user, setUser] = useState<RegisterUser>();
  

  useEffect(() => {
    const userPrevileges:decodedType=jwtDecode(localStorage.getItem("token")??"")
  
    auth
      .userDetails(userPrevileges._id ?? "no user id")
      .then((res) => {
          setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return { user };
} 

export const useUsers = () => {
  const [data, setData] = useState<RegisterUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    auth
      .getAllUsers()
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((e) => {
        setError("Network error");
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { data, isLoading, error };
}