import React from "react";

import { createClient } from "@supabase/supabase-js";
import { Button } from "./ui/button";

const Header = () => {
  // 環境変数から Supabase の URL と API キーを取得
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  async function testSaveTextToDatabase() {
    try {
      // テスト用のプロンプトと音声ファイルの公開 URL
      const prompt = "これはテスト用のプロンプトです。";
      const audioUrl = "https://example.com/audio.mp3";

      // Supabase データベースにテキストデータ（プロンプト）を保存
      const { data: insertData, error: insertError } = await supabase
        .from("audio_data") // テーブル名を指定
        .insert({
          audio_url: audioUrl, // 音声ファイルの公開 URL
          prompt: prompt, // プロンプトのテキスト
        });

      if (insertError) {
        throw new Error(
          `Supabase データベースへの挿入エラー: ${insertError.message}`
        );
      }

      console.log(
        "テキストデータが Supabase データベースに保存されました: ",
        insertData
      );

      // テスト成功
      console.log("テスト成功: テキストデータがデータベースに保存されました。");
    } catch (error) {
      // エラーが発生した場合の処理
      console.error("エラーが発生しました: ", error);
    }
  }

  // テストコードを実行
  return (
    <header className="relative items-center px-12 py-8">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <img src="/logo.png" alt="Logo" className="h-20" /> {/* ロゴイメージ */}
        <nav className="flex gap-8 justify-start ">
          <Button onClick={testSaveTextToDatabase}>test</Button>
          <a href="#info" className=" font-bold">
            info
          </a>
          <a href="#generate" className=" font-bold">
            generate
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
