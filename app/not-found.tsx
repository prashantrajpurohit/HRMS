"use client"
import { Button } from '@/ui/button';
import Image from 'next/image';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center text-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-1">Page Not Found :{"("}</h1>
          <p className="text-muted-foreground mb-4">
            Oops! 😖 The requested URL was not found on this server.
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        <Image src={"/images/pages/404.png"} alt="error-illustration" className="mt-8 h-[400px] md:h-[450px] lg:h-[500px] lg:mt-10"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%',height:"65vh" }}
        />

      </div>
      {/* <FooterIllustrations /> */}
    </div>
  );
}