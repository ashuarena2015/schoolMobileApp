"use client";

import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./services/store";

const Auth: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    const response = await dispatch({
      type: "apiRequest",
      payload: {
        url: `http://localhost:3001/api/user/login`,
        method: "POST",
        onSuccess: "getLoginDetails",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "getLoginDetails",
        body: {
          userInfo: {
            email: "admin@gmail.com",
            password: '123456',
          }
        }
      },
    }) as unknown as { isAuth: boolean };
  };

  useEffect(() => {
      fetchData();
  }, []);

  return <></>;
};

export default Auth;
