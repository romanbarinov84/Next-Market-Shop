"use client";

import { initialFormData } from "@/src/Constance/RegFormData";
import { RegFormDataProps } from "@/src/types/regFormData";
import { createContext, ReactNode, useContext, useState } from "react";

type RegFormContextType = {
  regFormData: RegFormDataProps;
  setRegFormData: React.Dispatch<React.SetStateAction<RegFormDataProps>>;
  resetRegForm: () => void;
};

export const RegFormContext = createContext<RegFormContextType>({
  regFormData: initialFormData,
  setRegFormData: () => {},
  resetRegForm: () => {},
});

export const RegFormProvider = ({ children }: { children: ReactNode }) => {
  const [regFormData, setRegFormData] =
    useState<RegFormDataProps>(initialFormData);

  const resetRegForm = () => {
    setRegFormData(initialFormData);
  };

  return (
    <RegFormContext.Provider
      value={{ regFormData, setRegFormData, resetRegForm }}
    >
      {children}
    </RegFormContext.Provider>
  );
};

export const useRegFormContext = () => useContext(RegFormContext);