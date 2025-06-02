import ImageCrop from "@/components/ImageCrop";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home({ params }) {
  console.log(params.slug);
  return (
    <main className="px-4">
      <div className="mb-16 max-w-[600px] mx-auto border-slate-950 p-6 rounded-lg bg-slate-700">
        <h1 className="text-4xl mb-6 font-bold text-center">EZIEST Twibbon of Your Life!</h1>
        <h1 className="text-xl font-bold mb-4">Haloo man man! Cara bikin twibbonnya sangat mudah niih!</h1>
        <ol className="list-decimal pl-8 text-lg mb-4">
          <li>Pilih foto yang kamu mau masukan ke twibbon</li>
          <li>Crop bagian yang ingin digunakan</li>
          {/* <li>Klik lanjutkan</li> */}
          <li>Preview foto dengan frame twibbonnya dapat di nomor 3</li>
          <li>Klik download untuk menyimpan foto kamu!</li>
        </ol>

        <p>
          created by{" "}
          <Link
            className="text-amber-400"
            href="https://instagram.com/saulandreee"
          >
            @saulandreee
          </Link>
        </p>
        {/* <h2 className="text-lg font-bold">Yukk dukung KKRS dengan pakai twibbon di semua medsos kamuu!</h2> */}
      </div>
      <div className="max-w-[1080px] mx-auto">
        <Separator className="h-2" />
        <ImageCrop
          slug={params.slug}
          className
        />
      </div>
    </main>
  );
}
