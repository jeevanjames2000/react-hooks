import React, { useEffect, useState } from "react";

export default function useLocalStorage(key, value, method) {
  const [sdata, setSData] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (method === "GET") {
      const GetLocalStorage = window.localStorage.getItem(key);
      setSData(GetLocalStorage);
      setMessage("Get data Successfull");
    } else if (method === "SET") {
      window.localStorage.setItem(key, JSON.stringify(value));
      setMessage("SET data Successfull");
    } else {
      window.localStorage.removeItem(key);
      setMessage("Remove data Successfull");
    }
  }, [key]);

  return { sdata, message };
}
