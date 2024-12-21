import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-8 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 4000+ experts in world class companies with our global community.</p>
            <Button className="lg asChild w-full sm:w-fit">
              <Link href='#events'></Link>
              Explore events
            </Button>
          </div>
          <Image 
          src='/assets/images/hero.png' 
          alt='hero' 
          width={500} 
          height={500} 
          className='max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] '/>
        </div>
      </section>
      <section id="events" className="wrapper gap-8 md:gap-12">
        <h2 className="h2-bold">Events</h2>
      </section>
    </>
  );
}
