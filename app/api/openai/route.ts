import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();
const speechFile = path.resolve("./public/rakugo/speech.mp3");


export async function POST(req: Request) {
  console.log('openaiに接続中...')
  try {
    const { prompt } = await req.json(); // リクエストボディからプロンプトを取得
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: prompt, // プロンプトを使って音声を生成
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    
    // 生成したファイルのパスを返す
    return NextResponse.json({ result: `音声ファイルを生成しました: ${speechFile}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '音声生成に失敗しました' }, { status: 500 });
  }
}