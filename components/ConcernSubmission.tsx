import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle, Send } from "lucide-react";

export default function Component() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically send the data to your backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-yellow-400">
          悩み事を投稿
        </CardTitle>
        <CardDescription className="text-gray-400">
          あなたの悩みを共有してください。ラジオで取り上げられるかもしれません。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="program"
              className="text-sm font-medium text-gray-300"
            >
              番組を選択
            </Label>
            <Select>
              <SelectTrigger
                id="program"
                className="w-full bg-gray-800 border-gray-700 text-white"
              >
                <SelectValue placeholder="番組を選択してください" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="ai-part-2">AI part 2</SelectItem>
                <SelectItem value="third-stone">
                  Third Stone From The Sun
                </SelectItem>
                <SelectItem value="radio-de-chakachi">
                  レディオ デ チャカチー
                </SelectItem>
                <SelectItem value="here-comes-the-moon">
                  HERE COMES THE MOON
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-300">
              お名前（ニックネーム可）
            </Label>
            <Input
              id="name"
              className="w-full bg-gray-800 border-gray-700 text-white"
              placeholder="匿名希望"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="concern"
              className="text-sm font-medium text-gray-300"
            >
              悩み事
            </Label>
            <Textarea
              id="concern"
              className="w-full bg-gray-800 border-gray-700 text-white"
              placeholder="あなたの悩みを詳しく教えてください"
              rows={4}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500"
          >
            <Send className="w-4 h-4 mr-2" />
            投稿する
          </Button>
        </form>
        {submitted && (
          <div className="mt-4 p-2 bg-green-800 text-green-100 rounded flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            投稿が完了しました。ありがとうございます！
          </div>
        )}
      </CardContent>
    </Card>
  );
}
