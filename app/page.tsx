"use client";

import Blob from "./_blobs/Blob";
import { Canvas } from "@react-three/fiber";
import { createContext, Suspense, useState } from "react";
import InputArea from "./InputArea";
import Loading from "@/components/Loading";
import ColorfulSpinner from "@/components/Loading";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";

interface IsPlayContextType {
  isPlay: boolean;
  soundUrl: string;
  isLoading: boolean;
  // speechSoundRef: Howl | null;
  setIsPlay: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setSoundUrl: (value: string) => void;
}

export const IsPlayContext = createContext<IsPlayContextType>({
  isPlay: false,
  isLoading: false,
  soundUrl: "",
  // speechSoundRef: null,
  setIsPlay: () => {},
  setSoundUrl: () => {},
  setIsLoading: () => {},
});

export default function Home() {
  const [isPlay, setIsPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [soundUrl, setSoundUrl] = useState("");
  // const [speechSoundRef, setSpeechSoundRef] = useState<Howl | null>(null);

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
        <Suspense fallback={<ColorfulSpinner />}>
          {/* 上部 */}
          <section className="pt-20 pb-12">
            <div className="w-full px-22">
              <div className="max-w-screen-lg mx-auto flex justify-between w-full">
                {/* h1 h2 */}
                <div className="flex flex-col items-center">
                  <div>
                    <h1 className="text-5xl mb-12 leading-tight ">
                      あなたの失敗大丈夫！AIが心に寄り添い、元気をお届け！
                    </h1>
                  </div>
                  <div>
                    <p className="leading-relaxed font-bold my-0">
                      落ち込んだ時や悩んだ時、誰かに話したくてもなかなか相談できないことってありますよね。そんな時は、私たちのAIにお任せ！あなたの失敗談や悩みを聞いて、ちょっと元気が出るようなアドバイスや励ましの言葉を音声でお届けします。いつでも、どこでも、気軽に話せるあなた専用の応援団です！
                    </p>
                  </div>
                </div>

                <InputArea />
                {/* <Canvas
                  className="absolute"
                  camera={{
                    position: [0, 0, 10],
                    fov: 75,
                  }}
                > */}

                {/* <directionalLight
                    position={[1, 1, 1]}
                    intensity={2}
                    castShadow
                  />
                  <ambientLight intensity={0.5} />
                  <Blob />
                </Canvas> */}
              </div>
            </div>
          </section>

          {/* {isLoading ? <></> : <InputArea />} */}

          {/* 下部 */}
          <section
            className="py-20 bg-customYellow"
            // style={{ backgroundColor: "#ffd258" }}
          >
            <div className="flex flex-col justify-start mx-auto gap-4  items-center text-center px-40 mb-20">
              <h1 className="text-3xl mb-4 mx-auto leading-tight font-bold">
                「AIの応援、届いてます！」
                <br />
                —悩みに対する音声アドバイス公開中
              </h1>

              <p className="leading-relaxed font-bold ">
                「どんな悩みも、一人じゃない。AIがあなたの声を聴き、元気が出るアドバイスを音声でお届けします。公開されたアドバイスを聴いて、少しでも心が軽くなる瞬間を見つけてください。」
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="w-[200px] h-[300px] bg-[#ffd43b] bg-opacity-80 rounded-lg overflow-hidden shadow-lg shadow-gray-400"
                >
                  <div className="h-[150px] overflow-hidden">
                    <img
                      src="/bird.jpg"
                      alt={`Post ${post.id} image`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 h-[150px] overflow-y-auto">
                    <p className="text-[#212529] text-sm">{post.content}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </Suspense>
      </IsPlayContext.Provider>
    </>
  );
}

const posts = [
  {
    id: 1,
    image: "https://via.placeholder.com/200x150.png?text=Post+1",
    content: "これは投稿1の内容です。",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200x150.png?text=Post+2",
    content: "これは投稿2の内容です。",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/200x150.png?text=Post+3",
    content: "これは投稿3の内容です。",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/200x150.png?text=Post+4",
    content: "これは投稿4の内容です。",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/200x150.png?text=Post+5",
    content: "これは投稿5の内容です。",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/200x150.png?text=Post+6",
    content: "これは投稿6の内容です。",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/200x150.png?text=Post+7",
    content: "これは投稿7の内容です。",
  },
  {
    id: 8,
    image: "https://via.placeholder.com/200x150.png?text=Post+8",
    content: "これは投稿8の内容です。",
  },
];
