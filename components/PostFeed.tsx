"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import InteractiveCards from "./InteractiveCard";
import { Post } from "@/types/Post";

const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // 再生中のid

  // 他の再生中のサウンドがあれば停止
  // id,Howlオブジェクトを持つオブジェクト

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/spabase"); // 非同期処理を待つ
        setPosts(response.data); // データ部分をセット
        // postsが更新されたときにHowlインスタンスを更新
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); // データ取得関数を呼び出す
  }, []);

  return (
    <>
      {/* 下部 */}
      <section
        className="py-20 px-32 bg-customYellow"
        // style={{ backgroundColor: "#ffd258" }}
      >
        <div className="flex flex-col justify-start mx-auto gap-1  items-center text-center px-40 mb-20">
          <h1 className="text-3xl mb-4 mx-auto leading-tight font-bold">
            「AIの応援、届いてます！」
            <br />
            悩みに対する音声アドバイス公開中
          </h1>

          <p className="leading-relaxed font-bold ">
            どんな悩みも一人じゃない。
          </p>
          <p className="leading-relaxed font-bold mt-0">
            AIがあなたの声を聴き、元気が出るアドバイスを音声でお届けします。公開されたアドバイスを聴いて、少しでも心が軽くなる瞬間を見つけてください。
          </p>
        </div>
        <InteractiveCards posts={posts} />
      </section>
    </>
  );
};

export default PostFeed;
