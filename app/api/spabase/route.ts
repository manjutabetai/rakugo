import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 環境変数から Supabase の URL と API キーを取得
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase クライアントを初期化
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function GET() {
  console.log('Get spabase ')
  try {
    // Supabase データベースからテキストデータを取得
    const { data: textData, error: selectError } = await supabase
      .from("audio_data") // テーブル名を指定
      .select("*") // 全てのカラムを取得
      .order("created_at", { ascending: false }) // 作成日時で降順にソート
      .limit(20); // 取得件数を20件に制限

    if (selectError) {
      throw new Error(`Supabase データベースからの取得エラー: ${selectError.message}`);
    }

    console.log('spabase res' + textData)

    // 取得したテキストデータをクライアントに返す
    return NextResponse.json(textData, { status: 200 });
  } catch (error) {
    // エラーが発生した場合の処理
    console.error("エラーが発生しました: ", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}