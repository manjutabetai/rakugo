"use client";
import Image from "next/image";
import { useState, useRef, useEffect, useContext } from "react";

import { MessageSquarePlus } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ConcernSubmission from "@/components/ConcernSubmission";
import { Button } from "@/components/ui/button";
import Player from "@/components/Player";

import { Howl } from "howler";
import { IsSoundUrlContext } from "@/components/IsSoundUrlContext";

export default function RadioStationHomepage() {
  const [isOpen, setIsOpen] = useState(false);

  const tuningSound = useRef<Howl | null>(null);

  const { isLoading, isTuning, setIsTuning } = useContext(IsSoundUrlContext);

  useEffect(() => {
    console.log("mainPageのuseEffect isLoadingに依存");
    if (!tuningSound.current) {
      tuningSound.current = new Howl({
        src: ["/radio-tuning.wav"],
        html5: true,
        volume: 0.3,
        loop: true,
      });
    }

    if (isLoading && isTuning) {
      tuningSound.current?.play();
    } else {
      tuningSound.current?.pause();
      setIsTuning(false);
    }
  }, [isTuning, isLoading]);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto p-4">
        <div className="bg-gradient-to-r from-customYellow to-yellow-400 text-black rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 pr-4">
              <div className="flex items-center mb-2">
                <span className="bg-customPink text-xs font-bold px-2 py-1 rounded mr-2">
                  NOW ON AIR
                </span>
                <span className="text-sm">07:00-08:55</span>
              </div>
              <div className="flex items-center justify-start">
                <h2 className="text-3xl font-bold mb-2"> うすーいラジオ</h2>

                {/*  ListenLive 再生ボタン */}
              </div>

              <p className="text-sm mb-4">トトカルチョ kei</p>

              <p className="text-sm">
                「トトカルチョKei」は、リスナーの悩みを独自の視点で解決する、ユニークなAIパーソナリティ。リラックスした口調と軽快なテンポで、真面目な相談からちょっとした雑談まで、まるで友人のように温かく答えてくれます。トトカルチョKeiの魅力は、そのウィットに富んだアドバイスと、どんな時でも前向きな姿勢。相談するだけで、心が少し軽くなり、次の一歩が踏み出せるような番組です。
              </p>

              <div className="mt-4 mb-4">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                    >
                      <MessageSquarePlus className="w-4 h-4 mr-2" />
                      投稿する
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-700">
                    <ConcernSubmission setIsOpen={setIsOpen} />
                  </DialogContent>
                </Dialog>
              </div>
              <Player />
            </div>

            <div className="md:w-1/3 mt-4 md:mt-0">
              <Image
                src="/avatar.jpg"
                alt="DJ Takeyama"
                width={350}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Now Playing Ticker */}
        <div className="bg-black text-white p-2 mb-8 overflow-hidden">
          <p className="animate-marquee whitespace-nowrap">
            皆さんからのお便りをお待ちしています /
          </p>
        </div>

        {/* Program Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* <Image
                src="/placeholder.svg?height=150&width=300"
                alt="Program 1"
                width={300}
                height={150}
                className="rounded-lg mb-2"
              /> */}
            <h3 className="text-xl font-bold">Third Stone From The Sun</h3>
            <p className="text-sm">The First & Third Sunday 22:00 to 23:00</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* <Image
                src="/placeholder.svg?height=150&width=300"
                alt="Program 2"
                width={300}
                height={150}
                className="rounded-lg mb-2"
              /> */}
            <h3 className="text-xl font-bold">レディオ デ チャカチー</h3>
            <p className="text-sm">The Second & Fourth Sunday 22:00 to 23:00</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* <Image
                src="/placeholder.svg?height=150&width=300"
                alt="Program 3"
                width={300}
                height={150}
                className="rounded-lg mb-2"
              /> */}
            <h3 className="text-xl font-bold">HERE COMES THE MOON</h3>
            <p className="text-sm">Every Monday 22:00 to 23:00</p>
          </div>
        </div>
      </main>
    </div>
  );
}
