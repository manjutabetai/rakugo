"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import axios from "axios";

const PostFeed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/spabase"); // 非同期処理を待つ
        setPosts(response.data); // データ部分をセット
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
        <div className="grid  gap-10 sm:grid-cols-1 lg:grid-cols-4 ">
          {posts.map((post) => (
            <Card
              key={post.id}
              className=" bg-white overflow-hidden shadow-lg shadow-black border-2 border-black mb-4"
              style={{ borderRadius: "25px" }}
            >
              <div className="h-[150px] overflow-hidden ">
                <img
                  src="/bird.jpg"
                  alt={`Post ${post.id} image`}
                  className="w-full h-full object-cover border-b-2 border-black"
                />
              </div>
              <div className="p-8 h-[200px] overflow-y-auto bg-customWhite">
                <h2 className="mb-4 font-extrabold">title</h2>
                <p className=" text-sm">{post.input_value}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default PostFeed;
