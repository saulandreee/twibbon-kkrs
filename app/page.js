import ImageCrop from "@/components/ImageCrop";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
          <li>Foto dengan frame twibbonnya dapat di preview.</li>
          <ol className="list-disc pl-2.5 text-sm text-pink-500">
            <li>Jika butuh perubahan, kamu bisa menggerakan frame crop pada poin 2 dan akan langsung di update pada frame nomor 3.</li>
            <li>Jika ingin mengganti foto kamu, bisa langsung kamu klik input pada nomor 1!</li>
          </ol>
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

      <div className="grid gap-4 max-w-[600px] mx-auto">
        <h2>Gas coba pilih mau bikin twibbon mana</h2>
        <Button
          size="lg"
          asChild
        >
          <Link href={"cpns-kemenham"}>CPNS KemenHAM</Link>
        </Button>
        <Button
          variant="ghost"
          asChild
        >
          <Link href={"kkrs"}>KKRS 2024</Link>
        </Button>
      </div>
    </main>
  );
}
