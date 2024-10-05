import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// OpenAI のクライアントインスタンスを作成
const openai = new OpenAI();
// 保存先の音声ファイルパスを設定
const speechFile = path.resolve("./public/rakugo/speech.mp3");

export async function POST(req: Request) {
  console.log("OpenAIに接続中...");

  try {
    // リクエストボディからプロンプトを取得
    const { prompt } = await req.json();

    // 音声生成処理
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: prompt,
    });

    // 音声生成が成功したら、ファイルに書き出す
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    console.log("音声ファイルを保存しました:", speechFile);

    // 成功した場合、生成したファイルのパスを返す
    return NextResponse.json({ result: `音声ファイルを生成しました: ${speechFile}` });
  } catch (error) {
    console.error("音声生成に失敗しました:", error);

    // エラーの詳細を返す
    return NextResponse.json(
      { error: `音声生成に失敗しました: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}