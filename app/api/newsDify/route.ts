import {  NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEWS_DIFY_API_KEY; // 環境変数にAPIキーを設定する

export async function POST() {
  console.log('listenLiveを取得中...')

  try {
    // Dify APIに対してリクエストを送信
    const response = await axios.post(
      "https://api.dify.ai/v1/workflows/run",
      {
        inputs: { 'query': 'xxx' },
        response_mode: "blocking",
        user: "radio-app", // ユーザーIDを指定（任意の文字列でOK）
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );  

    // Dify APIからのレスポンスを返す
    const result = response.data.data.outputs.text || "No result found";
   

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error calling Dify API:", error);
    return NextResponse.json({ error: "Failed to fetch data from Dify API" });
  }
}