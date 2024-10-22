"use client";
import { createContext, useState, ReactNode } from "react";

interface IsSoundUrlContextType {
  radioUrl: string;
  messageResUrl: string;
  isPlaying: boolean;
  isLoading: boolean;
  isTuning: boolean;
  setRadioUrl: (url: string) => void;
  setMessageResUrl: (url: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsTuning: (isTuning: boolean) => void;
}
export const IsSoundUrlContext = createContext<IsSoundUrlContextType>({
  radioUrl: "",
  messageResUrl: "",
  isPlaying: false,
  isLoading: false,
  isTuning: false,
  setRadioUrl: () => {},
  setMessageResUrl: () => {},
  setIsPlaying: () => {},
  setIsLoading: () => {},
  setIsTuning: () => {},
});
export const IsSoundUrlProvider = ({ children }: { children: ReactNode }) => {
  const [radioUrl, setRadioUrl] = useState("");
  const [messageResUrl, setMessageResUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTuning, setIsTuning] = useState(false);

  return (
    <IsSoundUrlContext.Provider
      value={{
        radioUrl,
        messageResUrl,
        isPlaying,
        isLoading,
        isTuning,
        setRadioUrl,
        setMessageResUrl,
        setIsPlaying,
        setIsLoading,
        setIsTuning,
      }}
    >
      {children}
    </IsSoundUrlContext.Provider>
  );
};
