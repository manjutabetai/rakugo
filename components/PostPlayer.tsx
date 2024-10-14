// import { Play, Pause, Trash } from "lucide-react";
// import { useContext, useEffect, useState } from "react";
// import { IsPlayContext } from "@/app/page";
// import { Howl, Howler } from "howler";

// type Props ={
//   soundUrl:string;

// }
// const PostPlayer = ({soundUrl}:Props) => {
//   const [speechSoundRef, setSpeechSoundRef] = useState<Howl | null>(null);

//   // 音声ファイルの削除
//   const handleDelete = () => {
//     console.log("音声ファイルが削除されました");
//   };

//   useEffect(() => {
//     if (soundUrl) {
//       const newSound = new Howl({
//         src: [soundUrl],
//         html5: true,
//         format: "mp3",
//         onload: () => {
//           console.log("音声ファイルが正常にロードされました");
//           // newSound.play(); //自動プレイ
//         },
//         onloaderror: (id, error) => {
//           console.error("音声のロード中にエラーが発生しました:", error);
//         },
//         onplayerror: (id, error) => {
//           console.error("音声の再生中にエラーが発生しました:", error);
//           newSound.play(); // 自動的に再試行
//         },
//         onend: () => {
//           console.log("音声の再生が終了しました");
//           setIsPlay(false);
//         },
//       });
//       setSpeechSoundRef(newSound);
//     }
//   }, [soundUrl]);

//   const handleClick = () => {
//     if (soundUrl && speechSoundRef) {
//       if (speechSoundRef.playing()) {
//         speechSoundRef.pause();
//         setIsPlay(false);
//       } else {
//         speechSoundRef.play();
//         setIsPlay(true);
//       }
//     } else {
//       console.error("Howlでエラーが出ました");
//     }
//   };

//   return (
//     <div
//       className="flex items-center justify-between bg-customWhite rounded-full p-2 w-40 mx-auto mt-8"
//       style={{
//         boxShadow: "inset 7px 7px 14px #c7c7c7, inset -7px -7px 14px #f8f8f8",
//       }}
//     >
//       {/* 再生・一時停止ボタン */}
//       <button
//         onClick={handleClick}
//         className="button p-2 rounded-full hover:shadow-inset transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-customYellow"
//         aria-label={isPlay ? "一時停止" : "再生"}
//       >
//         {isPlay ? (
//           <Pause
//             size={24}
//             strokeWidth={2}
//             className="text-[#c7c7c7] hover:text-customYellow"
//           />
//         ) : (
//           <Play
//             size={24}
//             strokeWidth={2}
//             className="text-[#c7c7c7] hover:text-customYellow"
//           />
//         )}
//       </button>

//       <div className="h-8 w-px bg-gray-300"></div>

//       {/* 削除ボタン */}
//       <button
//         onClick={handleDelete}
//         className="button p-2 rounded-full"
//         aria-label="削除"
//       >
//         <Trash
//           size={24}
//           strokeWidth={2}
//           className="text-[#c7c7c7] hover:text-customYellow"
//         />
//       </button>
//     </div>
//   );
// };

// export default PostPlayer;
