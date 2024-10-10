// pages/api/supabase-test.ts

import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import fs from "fs";

// Supabase のクライアントを作成
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Supabase ストレージ接続テスト用の API ハンドラー
 * 指定されたバケットのファイルリストを取得し、接続確認を行う
 */
export async function GET() {
  try {
    console.log('Supabase に接続しています...');
    // テスト用に接続を確認するバケット名
    const bucketName = "audio-bucket"; // ここを確認したいバケット名に変更してください

    // バケット内のファイルリストを取得
    // const { data, error } = await supabase.storage.from(bucketName).list();
    // console.log('Supabase の応答:', { data, error });
    const fileData = await fs.promises.readFile("public/rakugo/大阪_2024-10-06T02-13-19-054Z.mp3");

    const { data, error } = await supabase.storage
    .from(bucketName) // バケット名を指定
    .upload(`audio/test`, fileData, {
      contentType: 'audio/mpeg',
      cacheControl: '3600',
      upsert: true, // 同名ファイルがあった場合は上書き
    });
    if (error) {
      throw new Error(`Supabase Storage 接続エラー: ${error.message}`);
    }

    console.log('Supabase からデータを取得:', data);

    // 接続成功時のレスポンス
  
  } catch (error) {
    console.error('API ハンドラでエラー発生:', error);
    // エラー時のレスポンス
    return NextResponse.json(
      { message: `エラーが発生しました: ${error}` },
      { status: 500 }
    );
  }
}