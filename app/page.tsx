"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");
  const [inputValue, setInputValue] = useState(""); // 入力値を管理する状態

  const getData = async () => {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }), // 入力値を送信
      });
      const data = await response.json();
      setResponse(data.result); // レスポンスを表示
    } catch (error) {
      console.error(error);
      setResponse("エラーが発生しました"); // エラーメッセージを表示
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-red-100 ">
        <div className="flex flex-col items-start  ">
          <div className="">お題をください</div>
          <div className="flex items-center">
            <Input
              className="mr-6"
              value={inputValue} // 入力値をバインド
              onChange={(e) => setInputValue(e.target.value)} // 入力変更時に状態を更新
            />
            <Button onClick={getData}>Click me</Button>
          </div>
          <div>{response}</div> {/* レスポンスを表示 */}
        </div>
      </div>
    </>
  );
}
