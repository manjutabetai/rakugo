"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner"; // Spinnerコンポーネントを使用（適宜設定）

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // ローディング状態を管理

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
    } catch (error) {
      console.error(error);
      setResponse("エラーが発生しました"); // エラーメッセージを表示
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-red-100">
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
        </div>
        <div>TTS</div>
        <div className="flex items-center">
          <Input
            className="mr-6"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button disabled={loading}>{loading ? "通信中..." : "工事中"}</Button>
        </div>

        {/* ローディング中にインジケーターを表示 */}
        {loading && (
          <div className="mt-4">
            <Spinner className="w-6 h-6 mr-2" />
            通信中です。しばらくお待ちください...
          </div>
        )}

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
