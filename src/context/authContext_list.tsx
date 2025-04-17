import React, { createContext, useContext } from "react";

export const AuthContextList = createContext({});

export const AuthProviderList = (props: any) => {
  const openModal = () => {
    console.log("openModal");
  };

  return (
    <AuthContextList.Provider value={{ openModal }}>
      {props.children}
    </AuthContextList.Provider>
  );
};

export const useAuthList = () => useContext(AuthContextList);
