import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

// OpenAI のクライアントインスタンスを作成
const openai = new OpenAI();

// 環境変数から Supabase の URL と API キーを取得
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase クライアントを初期化
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 特殊文字を取り除く関数を定義
const sanitizeFilename = (filename: string) => filename.replace(/[\/\\?%*:|"<>]/g, "");

// POST リクエストを処理する関数
export async function POST(req: Request) {
  try {
    // リクエストボディからプロンプトを取得
    const { prompt, inputValue } = await req.json();
    console.log("gptに接続。。。: ", prompt);
   
    // OpenAI の音声生成 API を呼び出し
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: prompt.result,
    });
    // 生成された音声データをバッファに変換
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // 現在の日時をフォーマットし、ファイル名を作成（特殊文字を除去）
    const date = new Date().toISOString().replace(/[:.]/g, "-");
    // const sanitizedInputValue = sanitizeFilename(inputValue);
    // const filePath = `audio/${sanitizedInputValue}_${date}`;
    const filePath = `audio/${date}`;
    // Supabase ストレージにアップロード
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("audio-bucket") // バケット名を指定
      .upload(filePath, buffer, {
        contentType: "audio/mpeg",
        cacheControl: "3600",
        upsert: true, // 同名ファイルがあった場合は上書き
      });

    if (uploadError) {
      throw new Error(`Supabase アップロードエラー: ${uploadError.message}`);
    }

    console.log("ファイルが Supabase にアップロードされました: ", uploadData);

    // 公開 URL を取得
    const { data: publicUrlData, error: publicUrlError } = await supabase.storage
      .from("audio-bucket")
      .createSignedUrl(filePath,3000);

    if (publicUrlError) {
      throw new Error(`Supabase 公開 URL の取得に失敗: ${publicUrlError.message}`);
    }


    // 成功した場合、生成したファイルの公開 URL を返す
    return NextResponse.json(
      { result: "音声の公開 URL を取得しました", url: publicUrlData.signedUrl },
      { status: 200 }
    );
  } catch (error) {
    // エラーが発生した場合の処理
    console.error("エラーが発生しました: ", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}