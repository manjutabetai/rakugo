"use client";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import { IsSoundUrlContext } from "@/components/IsSoundUrlContext";
import { getNews, getGpt } from "@/lib/utils";

export default function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    radioUrl,
    setRadioUrl,
    isLoading,
    setIsLoading,
    isPlaying,
    setIsPlaying,
    messageResUrl,
    setMessageResUrl,
    setIsTuning,
  } = useContext(IsSoundUrlContext);

  useEffect(() => {
    setIsOpen(true);
    const listenHandle = async () => {
      setIsLoading(true);
      try {
        // difyから
        const newsData = await getNews();
        console.log("newsData::" + newsData);
        // gptから
        const filePath = await getGpt(newsData, "newData");
        console.log(filePath);

        if (filePath) {
          setRadioUrl(filePath);
          console.log(radioUrl);
        }
      } catch (error) {
        console.error("Error ニュース台本の取得に失敗しました。:", error);
      } finally {
        setIsLoading(false);
      }
    };
    listenHandle();
  }, []);

  const listenRadio = () => {
    const clickSound = new Howl({
      src: ["/click-sound.mp3"],
      html5: true,
      volume: 1,
    });
    clickSound.play();
    setIsTuning(true);

    setTimeout(() => {
      setIsOpen(false); // 3秒後にダイアログを閉じる
    }, 3000);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400 flex items-center">
            <Radio className="w-6 h-6 mr-2" />
            Fm Uso へようこそ！
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            架空のラジオ局の世界へようこそ
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>Fm Uso は、AIによって作られた架空のラジオ局です。</p>
          <p>
            リアルな放送局の雰囲気を楽しみながら、ぜひ放送中のラジオにメッセージを送ってください。
          </p>
          <p className="font-semibold text-yellow-400">
            さあ,ボタンをクリックして、AIが作成したラジオを聞きましょう
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              listenRadio();
            }}
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
          >
            <Radio className="w-4 h-4 mr-2" />
            放送を聴く
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
