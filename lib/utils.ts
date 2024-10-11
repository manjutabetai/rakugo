import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function  playSound(soundUrl: string ,speechSoundRef:any) {
  if (soundUrl && speechSoundRef) {
    speechSoundRef.current = new Howl({
      src: [soundUrl],
      html5: true,
        format: "mp3",
      onload: () => {
        console.log("音声ファイルが正常にロードされました");
        speechSoundRef.current?.play();
      },
      onloaderror: (id, error) => {
        console.error("音声のロード中にエラーが発生しました:", error);
      },
      onplayerror: (id, error) => {
        console.error("音声の再生中にエラーが発生しました:", error);
        speechSoundRef.current?.play(); // 自動的に再試行
      },
      onend: () => {
        console.log("音声の再生が終了しました");
      },
    });
  } else {
    console.error("再生する音声のURLが無効です");
  }
};