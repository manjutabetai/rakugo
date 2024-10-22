import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getNews = async () => {
  try {
    const difyRes = await fetch("/api/newsDify", {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "news_difyを実行中" }),
    });

    if (!difyRes.ok) {
      // サーバーがレスポンスコードを返した場合
      alert(`サーバーエラー: ${difyRes.statusText}`);
      return null;
    }

    const difyData = await difyRes.json();
    console.log(difyData.result)

    if (
      difyData.result === "No result found" ||
      difyData.result === "error" ||
      !difyData.result
    ) {
      // APIが期待する結果を返さない場合
      alert("ニュース原稿の取得に失敗しました。もう一度再生ボタンを押してください。"+ difyData.result);
      return null;
    }

    // 正常にデータが取得できた場合
    return difyData;

  } catch (error) {
    // ネットワークエラーなどのキャッチ
    console.error("Error calling Dify API:", error);
    alert("通信エラーが発生しました。ネットワークを確認してください。");
    return null;
  } finally {
    // 必要ならば何かの後処理
  }
};

export const sendMessage = async (

  inputValue:string,
  name:string)=>{

  var finalInputValue;


  if (name) {

   finalInputValue =
      `"ラジオネーム「${name}」さんの投稿です。"` + inputValue;
  } else {
    finalInputValue = `"投稿者の名前は「匿名ちゃん」さんです。"` + inputValue;
  }

  console.log("final input value: " + finalInputValue);

  try {
    const difyRes = await fetch("/api/dify", {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: finalInputValue }),
    });
    const difyData = await difyRes.json();
    if (difyData.result !== "No result found") {
      return {difyData,finalInputValue}
    } else {
      alert("電波の調子が悪いみたいです。。。もう一度お願いします。");
      return null
    }
   
  } catch (error) {
    console.error("Error calling Dify API:", error);
    return null;
    
  } finally {
    
  }
}




export const getGpt = async (
  prompt: string,
  finalInputValue: string,
  
) => {
  try {
    const response = await fetch("/api/openai", {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        finalInputValue: finalInputValue,
      }),
    });

    if (!response.ok) {
      console.error(
        `openAi と接続エラー: ${response.status} - ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    const filePath = data.url;
    return filePath;
  } catch (error) {
    console.error(error);
    return null;
  }
};