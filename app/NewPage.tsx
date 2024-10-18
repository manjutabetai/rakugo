import { Play, Volume2 } from "lucide-react";
import Image from "next/image";

export default function RadioStationHomepage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className=" p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/uso-radio.png"
              alt="usoradio logo"
              width={120}
              height={40}
            />
            <span className="text-sm">Fictional radio created by ai</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:underline">
              HOME
            </a>
            <a href="#" className="hover:underline">
              TIMETABLE
            </a>
            <a href="#" className="hover:underline">
              NEWS
            </a>
            <a href="#" className="hover:underline">
              EVENTS
            </a>
            <a href="#" className="hover:underline">
              DJs
            </a>
            <a href="#" className="hover:underline">
              STORE
            </a>
          </nav>
          <div className="flex items-center space-x-2">
            <a href="#" className="text-white hover:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div
          className="bg-gradient-to-r from-customYellow to-yellow-400 text-black rounded-lg p-6 mb-8"
          style={{ borderRadius: "10px" }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 pr-4">
              <div className="flex items-center mb-2">
                <span className="bg-red-500 text-xs font-bold px-2 py-1 rounded mr-2">
                  NOW ON AIR
                </span>
                <span className="text-sm">07:00-08:55</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Green Jacket Part 2</h2>
              <p className="text-sm mb-4">タケ小山</p>
              <p className="text-sm">
                あなたの街のプロゴルファー・タケ小山が発送する「Green
                Jacket」。日本のゴルフ情報はもちろんのこと、土曜の朝に聴いているアメリカのゴルフツアー情報など世界のゴルフ情報が手に取るように分かります。さらに、これからのゴルフ界を担う...
              </p>
            </div>
            <div className="md:w-1/3 mt-4 md:mt-0">
              <Image
                src="/placeholder.svg?height=200&width=350"
                alt="DJ Takeyama"
                width={350}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Listen Live
              </button>
              <Volume2 className="w-6 h-6" />
              <input type="range" className="w-24" />
            </div>
            <div className="flex space-x-2">
              <Image
                src="/placeholder.svg?height=30&width=80"
                alt="Sponsor 1"
                width={80}
                height={30}
              />
              <Image
                src="/placeholder.svg?height=30&width=80"
                alt="Sponsor 2"
                width={80}
                height={30}
              />
              <Image
                src="/placeholder.svg?height=30&width=80"
                alt="Sponsor 3"
                width={80}
                height={30}
              />
            </div>
          </div>
        </div>

        {/* Now Playing Ticker */}
        <div className="bg-black text-white p-2 mb-8 overflow-hidden">
          <p className="animate-marquee whitespace-nowrap">
            ALWAYS SOMETHING THERE TO REMIND ME / NEKED EYE
          </p>
        </div>

        {/* Program Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <Image
              src="/placeholder.svg?height=150&width=300"
              alt="Program 1"
              width={300}
              height={150}
              className="rounded-lg mb-2"
            />
            <h3 className="text-xl font-bold">Third Stone From The Sun</h3>
            <p className="text-sm">The First & Third Sunday 22:00 to 23:00</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Image
              src="/placeholder.svg?height=150&width=300"
              alt="Program 2"
              width={300}
              height={150}
              className="rounded-lg mb-2"
            />
            <h3 className="text-xl font-bold">レディオ デ チャカチー</h3>
            <p className="text-sm">The Second & Fourth Sunday 22:00 to 23:00</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Image
              src="/placeholder.svg?height=150&width=300"
              alt="Program 3"
              width={300}
              height={150}
              className="rounded-lg mb-2"
            />
            <h3 className="text-xl font-bold">HERE COMES THE MOON</h3>
            <p className="text-sm">Every Monday 22:00 to 23:00</p>
          </div>
        </div>
      </main>
    </div>
  );
}
