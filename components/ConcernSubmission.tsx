import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Send, Loader } from "lucide-react";
import { getGpt, sendMessage } from "@/lib/utils";
import { IsSoundUrlContext } from "@/components/IsSoundUrlContext";

const ConcernSubmission = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [concern, setConcern] = useState("");
  const { isLoading, setIsLoading, messageResUrl, setMessageResUrl } =
    useContext(IsSoundUrlContext); // useContext を使用して soundUrl と setRadioUrl を取得

  const handleSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);

    event.preventDefault();
    // difyへ
    const response = await sendMessage(concern, name);
    if (response) {
      const { difyData, finalInputValue } = response;

      const filePath = await getGpt(difyData, finalInputValue);

      setMessageResUrl(filePath);
    }
    setIsLoading(false);
    // フォームをリセット
    setName("");
    setConcern("");
    setIsOpen(false); // ダイアログを閉じる
  };
  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-yellow-400">
          番組へのメッセージ
        </CardTitle>
        <CardDescription className="text-gray-400">
          ラジオで取り上げられるかもしれません。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-300">
              お名前（ニックネーム可）
            </Label>
            <Input
              id="name"
              className="w-full bg-gray-800 border-gray-700 text-white"
              placeholder="匿名希望"
              value={name}
              onChange={(e) => setName(e.target.value)} // 入力された値を name に設定
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="concern"
              className="text-sm font-medium text-gray-300"
            ></Label>
            <Textarea
              id="concern"
              className="w-full bg-gray-800 border-gray-700 text-white"
              placeholder="なんでもいいのでメッセージお待ちしています！"
              rows={4}
              value={concern}
              onChange={(e) => setConcern(e.target.value)} // 入力された値を concern に設定
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500"
          >
            {isLoading ? <Loader /> : <Send className="w-4 h-4 mr-2" />}

            {isLoading ? "トトカルチョに送信中・・" : "投稿する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConcernSubmission;
