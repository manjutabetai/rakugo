"use client";

import Blob from "./_blobs/Blob";
import { Canvas } from "@react-three/fiber";
import { createContext, Suspense, useState } from "react";
import InputArea from "./InputArea";
import ColorfulSpinner from "@/components/Loading";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import PostFeed from "@/components/PostFeed";
import RadioHeader from "@/components/RadioHeader";

interface IsPlayContextType {
  isPlay: boolean;
  soundUrl: string;
  isLoading: boolean;
  setIsPlay: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setSoundUrl: (value: string) => void;
}

export const IsPlayContext = createContext<IsPlayContextType>({
  isPlay: false,
  isLoading: false,
  soundUrl: "",
  setIsPlay: () => {},
  setSoundUrl: () => {},
  setIsLoading: () => {},
});

export default function Home() {
  const [isPlay, setIsPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [soundUrl, setSoundUrl] = useState("");

  return (
    <>
      <IsPlayContext.Provider
        value={{
          isPlay,
          setIsPlay,
          soundUrl,
          setSoundUrl,
          isLoading,
          setIsLoading,
        }}
      >
        <Header />
        <RadioHeader />

        <Suspense fallback={<ColorfulSpinner />}>
          {/* 上部 */}
          <section className="pt-20 pb-12">
            <div className="w-full px-22">
              <div className="max-w-screen-lg mx-auto flex justify-between w-full h-full">
                {/* h1 h2 */}
                <div className="flex flex-col items-center">
                  {/* h1 */}
                  <div>
                    <h1 className="text-5xl mb-12 leading-tight ">
                      「真面目に、でも笑いながら。パーソナリティが優しく答えるラジオ相談室」
                    </h1>
                  </div>
                  {/* パラグラフ */}
                  <div>
                    <p className="leading-relaxed font-bold my-0">
                      あなたがラジオに投稿したかのような感覚で、AIパーソナリティが楽しくお答えします。このサイトは架空の番組を楽しむためのフィクション体験です。
                    </p>
                  </div>
                </div>

                <InputArea />
              </div>
            </div>
          </section>
          <PostFeed />

          {/* {isLoading ? <></> : <InputArea />} */}
        </Suspense>
      </IsPlayContext.Provider>
    </>
  );
}

// const posts = [
//   {
//     id: 1,
//     image: "https://via.placeholder.com/200x150.png?text=Post+1",
//     content: "これは投稿1の内容です。",
//   },
//   {
//     id: 2,
//     image: "https://via.placeholder.com/200x150.png?text=Post+2",
//     content: "これは投稿2の内容です。",
//   },
//   {
//     id: 3,
//     image: "https://via.placeholder.com/200x150.png?text=Post+3",
//     content: "これは投稿3の内容です。",
//   },
//   {
//     id: 4,
//     image: "https://via.placeholder.com/200x150.png?text=Post+4",
//     content: "これは投稿4の内容です。",
//   },
//   {
//     id: 5,
//     image: "https://via.placeholder.com/200x150.png?text=Post+5",
//     content: "これは投稿5の内容です。",
//   },
//   {
//     id: 6,
//     image: "https://via.placeholder.com/200x150.png?text=Post+6",
//     content: "これは投稿6の内容です。",
//   },
//   {
//     id: 7,
//     image: "https://via.placeholder.com/200x150.png?text=Post+7",
//     content: "これは投稿7の内容です。",
//   },
//   {
//     id: 8,
//     image: "https://via.placeholder.com/200x150.png?text=Post+8",
//     content: "これは投稿8の内容です。",
//   },
// ];
