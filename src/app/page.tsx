import FlagIdn from '@/assets/icons/FlagIdn';
import LogoKaterina from '@/assets/icons/LogoKaterina'

export default function Home() {
  return (
    <>
     <header className="flex items-center justify-between px-4">
        <span className="flex gap-x-2 items-center">
          <span className="text-color1">
            <LogoKaterina />
          </span>
          <span className="font-bold text-2xl">Katerina</span>
        </span>
        <span className="relative">
          <button
            className="flex gap-x-2 border border-gray1 rounded-full py-1 px-2"
          >
            <FlagIdn />
            <span className="">IDN</span>
          </button>
        </span>
      </header>
    </>
  );
}
