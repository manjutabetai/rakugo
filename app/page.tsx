"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Howl } from "howler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner"; // Spinnerコンポーネントを使用（適宜設定）

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(1); // 音量の状態
  const [isPlaying, setIsPlaying] = useState(false);

  const backSoundRef = useRef<Howl | null>(null); // 背景音の Howl インスタンスを useRef で管理
  const speechSoundRef = useRef<Howl | null>(null); // スピーチの Howl インスタンスを useRef で管理

  // テキストをDifyのAPIに送信する関数

  // テキストをDifyのAPIに送信する関数
  const handleClick = async () => {
    setLoading(true); // 通信開始時にローディングをオン
    setResponse(""); // 前回のレスポンスをクリア

    try {
      const res = await axios.post("/api/dify", { prompt: inputText });
      await getGpt(res.data.result);
      setResponse(res.data.result);
    } catch (error) {
      console.error("Error calling Dify API:", error);
      setResponse("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false); // 通信終了時にローディングをオフ
    }
  };
  const getGpt = async (text: string) => {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }), // 入力値を送信
      });
      const data = await response.json();
      setResponse(data.result); // レスポンスを表示

      speech();
    } catch (error) {
      console.error(error);
      setResponse("エラーが発生しました"); // エラーメッセージを表示
    }
  };

  // スピーチ音を再生する関数
  const speech = () => {
    // スピーチ用 Howl インスタンスの作成
    speechSoundRef.current = new Howl({
      src: ["/rakugo/speech.mp3"], // スピーチ音のファイルパス
      onload: () => {
        speechSoundRef.current?.play(); // ロード完了後に再生
      },
      onend: function () {
        backSoundRef.current?.stop();
      },
    });

    startBack(); // 背景音を再生開始
  };

  // https://dova-s.jp/bgm/download21236.html
  // 　使うなら使用許可をとる
  // 背景音を再生する関数
  const startBack = () => {
    backSoundRef.current = new Howl({
      src: ["/rakugo/Sunny_Smiles.mp3"], // 背景音のファイルパス
      onload: () => {
        backSoundRef.current?.play(); // 音声ファイルのロード完了後に再生
        setIsPlaying(true);
      },
      onend: () => setIsPlaying(false),
      volume: volume, // 初期音量設定
      loop: true,
    });
  };

  const stop = () => {
    if (speechSoundRef.current) {
      // 再生中か確認
      speechSoundRef.current.stop(); // 再生中であれば停止
      console.log("Stopped speech sound.");
    } else {
      console.log("Speech sound is not playing.");
    }

    if (backSoundRef.current && backSoundRef.current.playing()) {
      // 背景音も同様にチェック
      backSoundRef.current.stop();
      console.log("Stopped background sound.");
    }
  };

  // volume ステートが変わったときに音量を更新する
  useEffect(() => {
    if (backSoundRef.current) {
      backSoundRef.current.volume(volume); // 背景音の音量を更新
    }
    // if (speechSoundRef.current) {
    //   speechSoundRef.current.volume(volume); // スピーチ音の音量を更新
    // }
  }, [volume]); // volume が変わるたびに実行

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-red-100 px-10">
      <div className="flex flex-col items-start">
        <div>お題をください</div>
        <div className="flex items-center">
          <Input
            className="mr-6"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={handleClick} disabled={loading}>
            {loading ? "通信中..." : "Click me"}
          </Button>
          {isPlaying && (
            <Button className="ml-6" onClick={stop}>
              STOP
            </Button>
          )}
        </div>

        {/* ローディング中にインジケーターを表示 */}
        {loading && (
          <div className="mt-4">
            <Spinner className="w-6 h-6 mr-2" />
            通信中です。しばらくお待ちください...
          </div>
        )}
        {/* 音量調整 */}
        <div>
          <label htmlFor="volume">BGM:</label>
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>

        {/* 結果表示 */}
        {!loading && response && (
          <div className="mt-4 p-4 bg-white rounded-md shadow-md">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}
