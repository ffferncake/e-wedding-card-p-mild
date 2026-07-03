"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const coverImage = "/cover/B976026F-3779-43D4-85BC-7292656C9AE8.JPG";

const galleryImages = [
  "/gallery/CC14E2D6-725A-4C4B-8A40-016B7139DA32.JPG",
  "/gallery/48EDDBC1-6A8F-46D5-9A1C-1D498714838D.JPG",
  "/gallery/B058F275-939F-40E3-8A4E-A9E9F168A338.JPG",
  "/gallery/990DE3CE-C77E-402A-A214-E9E2365E56B3.JPG",
  "/gallery/C1A3B0D2-D635-4EF9-A2F1-7AAAC3005291.JPG",
  "/gallery/7BE8079C-D2B8-4FC4-BCF6-EE89864281AF.JPG",
  "/gallery/3DFA0F52-0221-43A9-84EC-D7D242D3C778.JPG",
  "/gallery/D736B716-76D3-421E-B514-0FEA56E3010E.JPG",
  "/gallery/C817D0BE-1E21-49CD-ADB5-867C98226DA5.JPG",
  "/gallery/033292CA-02E4-4045-965E-C1F490466A0C.JPG"
];

const fontOptions = [
  { label: "Noto Serif Thai", value: "font-serif-thai" },
  { label: "Pridi", value: "font-pridi" },
  { label: "Anuphan", value: "font-anuphan" },
  { label: "Sarabun", value: "font-sarabun" }
];

const mapUrl = "https://maps.app.goo.gl/2StoGfJFYCRz2BCF9?g_st=ic";

export default function Home() {
  const [fontClass, setFontClass] = useState(fontOptions[0].value);
  const [shareText, setShareText] = useState("แชร์การ์ด");

  const weddingUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  async function handleShare() {
    const shareData = {
      title: "Panisara & Chanon Wedding",
      text: "ขอเรียนเชิญร่วมงานมงคลสมรส ปาณิสรา และ ชานน",
      url: weddingUrl || window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setShareText("คัดลอกลิงก์แล้ว");
    } catch {
      setShareText("เปิดเมนูแชร์ไม่ได้");
    }

    window.setTimeout(() => setShareText("แชร์การ์ด"), 2200);
  }

  return (
    <main className={`${fontClass} min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
      <div className="mx-auto w-full max-w-[430px] bg-[var(--paper)] shadow-[0_0_80px_rgba(37,37,37,0.14)]">
        <section className="relative min-h-screen overflow-hidden border-b border-[var(--line)]">
          <Image
            src={coverImage}
            alt="ปาณิสรา และ ชานน"
            fill
            priority
            className="object-cover"
            sizes="430px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/8 to-black/55" />
          <div className="absolute left-5 top-5 right-5 flex items-start justify-between gap-4 text-white">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em]">E-Wedding Card</p>
              <p className="mt-1 text-xs opacity-85">Type 1 / Basic</p>
            </div>
            <label className="grid justify-items-end gap-1 text-[10px] uppercase tracking-[0.18em]">
              Font
              <select
                value={fontClass}
                onChange={(event) => setFontClass(event.target.value)}
                className="w-24 rounded-none border border-white/40 bg-white/20 px-2 py-1 text-[11px] tracking-normal text-white backdrop-blur"
                aria-label="เลือกฟอนต์"
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value} className="text-neutral-900">
                    {font.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="absolute inset-x-0 bottom-0 px-6 pb-9 text-white">
            <p className="text-sm tracking-[0.2em]">08 / 08 / 2569</p>
            <h1 className="magazine-title mt-3 text-[3.55rem] font-semibold leading-[0.95]">
              ปาณิสรา
              <span className="block text-[2.8rem] font-light">ชานน</span>
            </h1>
            <div className="mt-5 h-px w-full bg-white/55" />
            <p className="mt-4 text-sm leading-7 text-white/90">
              ขอเรียนเชิญร่วมเป็นเกียรติและร่วมแสดงความยินดีในวันมงคลสมรสของเรา
            </p>
          </div>
        </section>

        <Section number="01" kicker="Invitation" title="คำเชิญจากใจ">
          <p className="text-[1.35rem] leading-10 text-neutral-800">
            ด้วยความยินดี ปาณิสรา วงศ์ศรีเผือก และ ชานน ตระกูลนาแต่ง
            ขอเรียนเชิญท่านร่วมเป็นส่วนหนึ่งในวันสำคัญของเรา
          </p>
          <p className="mt-6 text-sm leading-7 text-[var(--ink-soft)]">
            การมาถึงของทุกท่านคือของขวัญที่มีความหมายที่สุด
            และจะทำให้ช่วงเวลานี้งดงามในความทรงจำตลอดไป
          </p>
        </Section>

        <Section number="02" kicker="Wedding Info" title="รายละเอียดงาน">
          <div className="grid gap-4">
            <InfoRow label="วัน" value="วันเสาร์ที่ 8 สิงหาคม 2569" />
            <InfoRow label="เวลา" value="เริ่มต้อนรับแขก 17:30 น." />
            <InfoRow label="พิธี" value="พิธีฉลองมงคลสมรส และงานเลี้ยงรับรอง" />
            <InfoRow label="สถานที่" value="วิวาเช่ วัชรพล" />
          </div>
          <div className="mt-8 border-y border-[var(--line)] py-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Schedule</p>
            <div className="mt-4 grid gap-3 text-sm text-neutral-700">
              <Schedule time="17:30" label="ลงทะเบียนและถ่ายภาพร่วมกัน" />
              <Schedule time="18:30" label="พิธีฉลองมงคลสมรส" />
              <Schedule time="19:00" label="รับประทานอาหารและร่วมแสดงความยินดี" />
            </div>
          </div>
        </Section>

        <section className="border-b border-[var(--line)] px-4 py-12">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">03 Gallery</p>
              <h2 className="mt-2 text-4xl font-semibold">ภาพความทรงจำ</h2>
            </div>
            <p className="text-right text-xs text-[var(--ink-soft)]">{galleryImages.length} Photos</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((src, index) => (
              <div
                key={src}
                className={`relative overflow-hidden bg-neutral-100 ${
                  index === 4 ? "col-span-2 aspect-[3/2]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={src}
                  alt={`แกลเลอรีงานแต่งภาพที่ ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes={index === 4 ? "430px" : "215px"}
                />
              </div>
            ))}
          </div>
        </section>

        <Section number="04" kicker="Behind The Scene" title="เรื่องราวของเรา">
          <div className="relative mb-7 aspect-[4/5] overflow-hidden bg-neutral-100">
            <Image
              src={galleryImages[5]}
              alt="เบื้องหลังของคู่บ่าวสาว"
              fill
              className="object-cover"
              sizes="430px"
            />
          </div>
          <p className="text-base leading-8 text-neutral-700">
            จากบทสนทนาธรรมดา กลายเป็นความผูกพันที่ค่อย ๆ ชัดเจนขึ้นในทุกวัน
            เราเก็บรายละเอียดเล็ก ๆ ระหว่างทางไว้เป็นความทรงจำ
            และอยากแบ่งปันวันสำคัญนี้กับคนที่รักเรา
          </p>
        </Section>

        <Section number="05" kicker="Account" title="ร่วมแสดงความยินดี">
          <div className="border border-[var(--line)] bg-[#f9f9f5] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--rose)]">Gift Account</p>
            <p className="mt-4 text-2xl font-semibold">บัญชีสำหรับของขวัญ</p>
            <div className="mt-5 grid gap-3 text-sm leading-7 text-neutral-700">
              <p>ธนาคาร: ระบุชื่อธนาคาร</p>
              <p>ชื่อบัญชี: ปาณิสรา / ชานน</p>
              <p>เลขบัญชี: xxx-x-xxxxx-x</p>
            </div>
          </div>
        </Section>

        <section className="border-b border-[var(--line)]">
          <div className="px-6 pb-6 pt-12">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">06 Location</p>
            <h2 className="mt-2 text-4xl font-semibold">วิวาเช่ วัชรพล</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
              สถานที่จัดงานแต่งงาน สามารถเปิดเส้นทางผ่าน Google Maps ได้โดยตรง
            </p>
          </div>
          <iframe
            title="แผนที่วิวาเช่ วัชรพล"
            src="https://www.google.com/maps?q=%E0%B8%A7%E0%B8%B4%E0%B8%A7%E0%B8%B2%E0%B9%80%E0%B8%8A%E0%B9%88%20%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%9E%E0%B8%A5&output=embed"
            className="h-72 w-full border-0 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="px-6 py-6">
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="block border border-neutral-900 px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.16em]"
            >
              เปิด Google Maps
            </a>
          </div>
        </section>

        <Section number="07" kicker="Share" title="ส่งต่อคำเชิญ">
          <p className="text-sm leading-7 text-[var(--ink-soft)]">
            แชร์การ์ดเชิญนี้ให้ครอบครัวและเพื่อน ๆ เพื่อร่วมเป็นส่วนหนึ่งในวันสำคัญของเรา
          </p>
          <button
            type="button"
            onClick={handleShare}
            className="mt-7 w-full bg-neutral-900 px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white"
          >
            {shareText}
          </button>
          <p className="mt-10 text-center text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]">
            Panisara & Chanon / 08.08.2569
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({
  number,
  kicker,
  title,
  children
}: Readonly<{
  number: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="relative border-b border-[var(--line)] px-6 py-12">
      <span className="vertical-label absolute right-3 top-12 text-[10px] uppercase tracking-[0.3em] text-neutral-300">
        {number}
      </span>
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">{kicker}</p>
      <h2 className="mt-2 pr-7 text-4xl font-semibold leading-tight">{title}</h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-4 border-b border-[var(--line)] pb-4">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-soft)]">{label}</p>
      <p className="text-base font-medium leading-7">{value}</p>
    </div>
  );
}

function Schedule({ time, label }: Readonly<{ time: string; label: string }>) {
  return (
    <div className="grid grid-cols-[58px_1fr] gap-4">
      <p className="font-semibold text-neutral-900">{time}</p>
      <p>{label}</p>
    </div>
  );
}
