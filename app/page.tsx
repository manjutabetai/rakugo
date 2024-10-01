import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-red-100 ">
        <div className="flex flex-col items-start  ">
          <div className="">お題をください</div>

          <div className="flex items-center">
            <Input className="mr-6" />
            <Button>Click me</Button>
          </div>
        </div>
      </div>
    </>
  );
}
