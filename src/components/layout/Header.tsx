import Image from "next/image";
import logo from "@/assets/img/CapivaraLab-SF.png";

export function Header() {
  return (
    <header className="bg-transparent h-16 flex justify-start items-center p-5 sm:ml-10 sm:mt-5">
      <Image 
        src={logo} 
        alt="Logo Capivara Lab" 
        height={60} 
        priority 
        className="brightness-0 invert"
      />
    </header>
  );
}