import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Navbar from "./Navbar";

const MobileNav = () => {
  return (
    <nav className="md:hidden block">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="bg-white flex flex-col gap-6">
          {/* Add a SheetTitle for accessibility */}
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>

          {/* Logo */}
          <Image 
            src="/assets/images/logo.svg" 
            alt="Evently" 
            width={128} 
            height={38} 
          />

          {/* Separator */}
          <Separator className="border-b-2" />

          {/* Navbar */}
          <Navbar />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
