"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";

export default function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setIsOpen(true);
      localStorage.setItem("hasSeenWelcome", "true");
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400 flex items-center">
            <Radio className="w-6 h-6 mr-2" />
            Fm Uso へようこそ！
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            架空のラジオ局の世界へようこそ
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Fm Uso
            は、AIによって作られた架空のラジオ局です。ここでは、あなたの悩みや質問をAIパーソナリティに投稿し、独自の視点で回答を得ることができます。
          </p>
          <p>
            リアルな放送局の雰囲気を楽しみながら、AIとの対話を通じて新しい発見や気づきを得られるかもしれません。
          </p>
          <p className="font-semibold text-yellow-400">
            さあ、あなたの「悩み事を投稿」ボタンをクリックして、AIパーソナリティとの対話を始めましょう！
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
          >
            <Radio className="w-4 h-4 mr-2" />
            放送を聴く
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
