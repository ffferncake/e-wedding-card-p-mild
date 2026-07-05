"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const coverImage = "/cover/3DFA0F52-0221-43A9-84EC-D7D242D3C778.JPG";
const coverImages = [coverImage, "/cover/B976026F-3779-43D4-85BC-7292656C9AE8.JPG"];
const musicSrc = "/music/Christina%20Perri%20-%20A%20Thousand%20Years%20%28Piano%20Cover%20by%20Riyandi%20Kusuma%29.mp3";
const brideProfileImage = "/gallery/D736B716-76D3-421E-B514-0FEA56E3010E.JPG";
const groomProfileImage = "/gallery/C817D0BE-1E21-49CD-ADB5-867C98226DA5.JPG";
const storyImage = "/gallery/7BE8079C-D2B8-4FC4-BCF6-EE89864281AF.JPG";

const galleryImages = [
  "/gallery/CC14E2D6-725A-4C4B-8A40-016B7139DA32.JPG",
  "/gallery/48EDDBC1-6A8F-46D5-9A1C-1D498714838D.JPG",
  "/gallery/B058F275-939F-40E3-8A4E-A9E9F168A338.JPG",
  "/gallery/990DE3CE-C77E-402A-A214-E9E2365E56B3.JPG",
  "/gallery/033292CA-02E4-4045-965E-C1F490466A0C.JPG",
  "/gallery/C1A3B0D2-D635-4EF9-A2F1-7AAAC3005291.JPG"
];

const calendarDays = [
  ["", "", "", "", "", "", "1"],
  ["2", "3", "4", "5", "6", "7", "8"],
  ["9", "10", "11", "12", "13", "14", "15"],
  ["16", "17", "18", "19", "20", "21", "22"],
  ["23", "24", "25", "26", "27", "28", "29"],
  ["30", "31", "", "", "", "", ""]
];

const weddingDate = new Date("2026-08-08T18:00:00+07:00").getTime();

const initialCountdown = [
  { value: "--", label: "DAYS" },
  { value: "--", label: "HOUR" },
  { value: "--", label: "MIN" },
  { value: "--", label: "SEC" }
];

const floatingHearts = [
  { left: "13%", delay: "0s", duration: "7s" },
  { left: "28%", delay: "1.8s", duration: "8.2s" },
  { left: "47%", delay: "0.9s", duration: "6.8s" },
  { left: "66%", delay: "2.6s", duration: "7.6s" },
  { left: "82%", delay: "1.2s", duration: "8.8s" }
];

const sectionHearts = [
  { left: "8%", delay: "0s", duration: "8.5s" },
  { left: "37%", delay: "2.1s", duration: "9.2s" },
  { left: "72%", delay: "1s", duration: "7.8s" }
];

const mapUrl = "https://maps.app.goo.gl/2StoGfJFYCRz2BCF9?g_st=ic";
const rsvpUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfvenenL-CbPwiqEra0D-kYH84_xn-kGIgVAD1O4kXWzsTaJQ/viewform";

export default function Home() {
  const [shareText, setShareText] = useState("แชร์การ์ด");
  const [copyText, setCopyText] = useState("คัดลอก");
  const [countdown, setCountdown] = useState(initialCountdown);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const weddingUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  useEffect(() => {
    setCountdown(getCountdown());
    const interval = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentCoverIndex((index) => (index + 1) % coverImages.length);
    }, 4600);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal-section"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedGalleryIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedGalleryIndex(null);
      }

      if (event.key === "ArrowLeft") {
        showPreviousGalleryImage();
      }

      if (event.key === "ArrowRight") {
        showNextGalleryImage();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedGalleryIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    const tryPlay = () => {
      void audio
        .play()
        .then(() => {
          setIsMusicPlaying(true);
          window.removeEventListener("pointerdown", tryPlay);
          window.removeEventListener("keydown", tryPlay);
        })
        .catch(() => setIsMusicPlaying(false));
    };

    tryPlay();
    window.addEventListener("pointerdown", tryPlay, { once: true });
    window.addEventListener("keydown", tryPlay, { once: true });

    return () => {
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };
  }, []);

  async function handleShare() {
    const shareData = {
      title: "Mild & Petch Wedding",
      text: "ขอเรียนเชิญร่วมงานมงคลสมรส Mild & Petch",
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

  async function handleMusicToggle() {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        audio.volume = 0.45;
        await audio.play();
        setIsMusicPlaying(true);
        return;
      }

      audio.pause();
      setIsMusicPlaying(false);
    } catch {
      setIsMusicPlaying(false);
    }
  }

  async function handleCopyAccount() {
    try {
      await navigator.clipboard.writeText("006-1-15267-9");
      setCopyText("คัดลอกแล้ว");
    } catch {
      setCopyText("คัดลอกไม่ได้");
    }

    window.setTimeout(() => setCopyText("คัดลอก"), 2000);
  }

  function showPreviousGalleryImage() {
    setSelectedGalleryIndex((index) =>
      index === null ? galleryImages.length - 1 : (index - 1 + galleryImages.length) % galleryImages.length
    );
  }

  function showNextGalleryImage() {
    setSelectedGalleryIndex((index) => (index === null ? 0 : (index + 1) % galleryImages.length));
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="auto"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      />
      <div className="mx-auto w-full max-w-[430px] bg-[var(--paper)] shadow-[0_24px_90px_rgba(88,74,58,0.16)]">
        <section className="cover-section relative overflow-hidden">
          {coverImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Mild and Petch cover ${index + 1}`}
              fill
              priority={index === 0}
              className={`cover-slide object-cover object-center ${index === currentCoverIndex ? "is-active" : ""}`}
              sizes="430px"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/12 to-black/58" />
          <HeartField hearts={floatingHearts} variant="cover" />
          <div className="absolute left-6 right-6 top-7 flex items-start justify-between gap-4 text-white">
            <p className="font-script text-[1.65rem] leading-none">Mild & Petch</p>
          </div>
          <div className="cover-content absolute inset-x-0 bottom-0 px-7 text-center text-white">
            <h1 className="font-cover cover-title font-semibold leading-[0.78]">
              Our
              <span className="block">Wedding</span>
              <span className="block">Day</span>
            </h1>
            <p className="mt-8 text-[12px] font-semibold tracking-[0.16em]">
              08.08.2026 · SAT · 18:00
            </p>
            <p className="font-script mt-2 text-2xl leading-none text-white/90">
              Mild & Petch
            </p>
            <p className="mt-2 text-[11px] leading-5 text-white/80">
              ปาณิสรา วงศ์ศรีเผือก
              <span className="mx-1 text-[var(--heart)]">♥</span>
              ชานน ตระกูลนา
            </p>
          </div>
        </section>

        <Section kicker="Invitation" title="ขอเชิญร่วมงานแต่งของเรา" reveal={false}>
          <p className="mx-auto mt-6 max-w-[17rem] text-center text-sm leading-7 text-[var(--ink-soft)]">
            ด้วยความยินดี ปาณิสรา วงศ์ศรีเผือก และ ชานน ตระกูลนา
            ขอเรียนเชิญทุกท่านร่วมเป็นเกียรติ
            และร่วมแสดงความยินดีในวันมงคลสมรสของเรา
          </p>
          {/* <p className="mx-auto mt-6 max-w-[17rem] text-center text-sm leading-7 text-[var(--ink-soft)]">
            การมาถึงของทุกท่านคือของขวัญที่มีความหมายที่สุด
            และจะทำให้ช่วงเวลานี้งดงามในความทรงจำตลอดไป
          </p> */}
        </Section>

        <section className="reveal-section relative overflow-hidden border-b border-[var(--line)] px-6 py-14">
          <HeartField hearts={sectionHearts} />
          <div className="relative z-10">
            <div className="calendar-date">
              <p>2026.08.08</p>
              <span>วันเสาร์ เวลา 18:00 น.</span>
            </div>

            <div className="calendar-divider" />

            <div className="calendar">
              {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((day) => (
                <p key={day} className={day === "อา" ? "text-[var(--rose)]" : ""}>
                  {day}
                </p>
              ))}
              {calendarDays.flat().map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className={`${day === "8" ? "selected-day" : ""} ${index % 7 === 0 ? "sunday" : ""}`}
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="calendar-divider" />

            <div className="countdown-line">
              {countdown.map((item, index) => (
                <div key={item.label} className="countdown-part">
                  <p>{item.label}</p>
                  <span>{item.value}</span>
                  {index < countdown.length - 1 ? <b>:</b> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal-section relative overflow-hidden border-b border-[var(--line)] px-5 py-12">
          <HeartField hearts={sectionHearts} />
          <SectionHeading kicker="Gallery" title="Gallery" />
          <div className="relative z-10 mt-7 grid gap-2.5">
            <div className="gallery-feature">
              <GalleryPhoto
                src={galleryImages[0]}
                alt="แกลเลอรีงานแต่งภาพหลัก"
                className="gallery-main"
                sizes="280px"
                onClick={() => setSelectedGalleryIndex(0)}
              />
              <div className="gallery-side">
                {galleryImages.slice(1, 3).map((src, index) => (
                  <GalleryPhoto
                    key={src}
                    src={src}
                    alt={`แกลเลอรีงานแต่งภาพเล็กที่ ${index + 1}`}
                    className="gallery-small"
                    sizes="140px"
                    onClick={() => setSelectedGalleryIndex(index + 1)}
                  />
                ))}
              </div>
            </div>
            <div className="gallery-strip">
              {galleryImages.slice(3).map((src, index) => (
                <GalleryPhoto
                  key={src}
                  src={src}
                  alt={`แกลเลอรีงานแต่งภาพที่ ${index + 4}`}
                  className={index === 2 ? "gallery-wide" : "gallery-tile"}
                  sizes={index === 2 ? "430px" : "215px"}
                  onClick={() => setSelectedGalleryIndex(index + 3)}
                />
              ))}
            </div>
          </div>
        </section>

        <Section kicker="Profile" title="Mild & Petch">
          <div className="grid grid-cols-2 gap-4">
            <ProfileCard
              image={brideProfileImage}
              role="Bride"
              name="Mild"
              detail="ปาณิสรา วงศ์ศรีเผือก"
            />
            <ProfileCard
              image={groomProfileImage}
              role="Groom"
              name="Petch"
              detail="ชานน ตระกูลนา"
            />
          </div>
        </Section>

        <section className="reveal-section relative overflow-hidden border-b border-[var(--line)] px-5 py-12">
          <HeartField hearts={sectionHearts} />
          <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[5px] bg-neutral-100 shadow-[0_16px_34px_rgba(80,68,56,0.12)]">
            <Image src={storyImage} alt="เบื้องหลังของคู่บ่าวสาว" fill className="object-cover" sizes="430px" />
          </div>
        </section>

        <Section kicker="Wedding Info" title="รายละเอียดงาน">
          <div className="grid gap-4">
            <InfoRow label="วัน" value="วันเสาร์ที่ 8 สิงหาคม 2569" />
            <InfoRow label="เวลา" value="งานเริ่ม 6 โมงเย็น" />
            <InfoRow label="พิธี" value="พิธีฉลองมงคลสมรส และงานเลี้ยงรับรอง" />
            <InfoRow label="สถานที่" value="วิวาเช่ วัชรพล" />
          </div>
          <div className="mt-8 rounded-[6px] bg-[var(--wash)] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Schedule</p>
            <div className="mt-4 grid gap-3 text-sm text-neutral-700">
              <Schedule time="18:00" label="งานเริ่ม และถ่ายภาพร่วมกัน" />
              <Schedule time="18:30" label="พิธีฉลองมงคลสมรส" />
              <Schedule time="19:00" label="รับประทานอาหารและร่วมแสดงความยินดี" />
            </div>
          </div>
        </Section>

        <Section kicker="Account" title="ช่องทางแสดงความยินดี">
          <p className="text-center text-base font-semibold leading-8 text-neutral-700">
            ขอบพระคุณสำหรับคำอวยพร
            <span className="block">และความยินดีจากทุกท่าน</span>
          </p>
          <div className="account-card mt-8">
            <div className="account-bank">
              <Image src="/kbank_logo.jpg" alt="ธนาคารกสิกรไทย" width={50} height={50} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-700">ธนาคารกสิกรไทย</p>
              <p className="mt-1 text-lg font-semibold tracking-[0.08em] text-neutral-900">006-1-15267-9</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">ปาณิสรา วงศ์ศรีเผือก</p>
            </div>
            <button type="button" onClick={handleCopyAccount} className="account-copy">
              {copyText}
            </button>
          </div>
        </Section>

        <Section kicker="RSVP" title="ยืนยันการเข้าร่วมงาน">
          <p className="text-center text-sm leading-7 text-[var(--ink-soft)]">
            กรุณายืนยันการเข้าร่วมงาน
          </p>
          <a
            href={rsvpUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 block rounded-[4px] bg-[var(--button)] px-5 py-4 text-center text-sm font-semibold text-white"
          >
            Open RSVP Form
          </a>
        </Section>

        <section className="reveal-section relative overflow-hidden border-b border-[var(--line)]">
          <HeartField hearts={sectionHearts} />
          <div className="relative z-10 px-6 pb-6 pt-12">
            <SectionHeading kicker="Location" title="วิวาเช่ วัชรพล" />
            <p className="mt-5 text-center text-sm leading-7 text-[var(--ink-soft)]">
              สถานที่จัดงานแต่งงาน สามารถเปิดเส้นทางผ่าน Google Maps ได้โดยตรง
            </p>
          </div>
          <iframe
            title="แผนที่วิวาเช่ วัชรพล"
            src="https://www.google.com/maps?q=%E0%B8%A7%E0%B8%B4%E0%B8%A7%E0%B8%B2%E0%B9%80%E0%B8%8A%E0%B9%88%20%E0%B8%A7%E0%B8%B1%E0%B8%8A%E0%B8%A3%E0%B8%9E%E0%B8%A5&output=embed"
            className="h-72 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="relative z-10 px-6 py-6">
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[4px] bg-[var(--button)] px-5 py-4 text-center text-sm font-semibold text-white"
            >
              เปิด Google Maps
            </a>
          </div>
        </section>

        <Section kicker="Share" title="ส่งต่อคำเชิญ">
          <p className="text-center text-sm leading-7 text-[var(--ink-soft)]">
            แชร์การ์ดเชิญนี้ให้ครอบครัวและเพื่อน ๆ เพื่อร่วมเป็นส่วนหนึ่งในวันสำคัญของเรา
          </p>
          <button
            type="button"
            onClick={handleShare}
            className="mt-7 w-full rounded-[4px] bg-[var(--button)] px-5 py-4 text-sm font-semibold text-white"
          >
            {shareText}
          </button>
          <p className="font-script mt-10 text-center text-3xl leading-none text-[var(--accent)]">
            Mild & Petch
          </p>
          <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
            08.08.2026
          </p>
        </Section>
      </div>
      <button
        type="button"
        onClick={handleMusicToggle}
        className="music-toggle"
        aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={isMusicPlaying}
      >
        {isMusicPlaying ? <MusicIcon /> : <VolumeOffIcon />}
      </button>
      {selectedGalleryIndex !== null ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="ภาพแกลเลอรีขนาดใหญ่">
          <button
            type="button"
            className="gallery-lightbox-backdrop"
            aria-label="ปิดภาพแกลเลอรี"
            onClick={() => setSelectedGalleryIndex(null)}
          />
          <div className="gallery-lightbox-content">
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() => setSelectedGalleryIndex(null)}
              aria-label="ปิดภาพแกลเลอรี"
            >
              <XIcon />
            </button>
            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-prev"
              onClick={showPreviousGalleryImage}
              aria-label="ภาพก่อนหน้า"
            >
              <ChevronLeftIcon />
            </button>
            <div className="gallery-lightbox-frame">
              <Image
                src={galleryImages[selectedGalleryIndex]}
                alt={`แกลเลอรีงานแต่งภาพขนาดใหญ่ที่ ${selectedGalleryIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-next"
              onClick={showNextGalleryImage}
              aria-label="ภาพถัดไป"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function Section({
  kicker,
  title,
  children,
  reveal = true
}: Readonly<{
  kicker: string;
  title: string;
  children: React.ReactNode;
  reveal?: boolean;
}>) {
  return (
    <section
      className={`${reveal ? "reveal-section " : ""}relative overflow-hidden border-b border-[var(--line)] px-6 py-12`}
    >
      <HeartField hearts={sectionHearts} />
      <div className="relative z-10">
        <SectionHeading kicker={kicker} title={title} />
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function HeartField({
  hearts,
  variant = "section"
}: Readonly<{
  hearts: typeof floatingHearts;
  variant?: "cover" | "section";
}>) {
  return (
    <div className={`heart-field ${variant === "cover" ? "heart-field-cover" : ""}`} aria-hidden="true">
      {hearts.map((heart, index) => (
        <span
          key={`${heart.left}-${heart.delay}`}
          className="floating-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration
          }}
        >
          {index % 2 === 0 ? "♥" : "❤"}
        </span>
      ))}
    </div>
  );
}

function SectionHeading({ kicker, title }: Readonly<{ kicker: string; title: string }>) {
  return (
    <div className="relative z-10 text-center">
      <h2 className="font-display text-3xl font-semibold italic leading-tight text-[var(--accent)]">{kicker || title}</h2>
    </div>
  );
}

function GalleryPhoto({
  src,
  alt,
  className,
  sizes,
  onClick
}: Readonly<{
  src: string;
  alt: string;
  className: string;
  sizes: string;
  onClick: () => void;
}>) {
  return (
    <button type="button" className={`gallery-photo ${className}`} onClick={onClick}>
      <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
    </button>
  );
}

function ProfileCard({
  image,
  role,
  name,
  detail
}: Readonly<{
  image: string;
  role: string;
  name: string;
  detail: string;
}>) {
  return (
    <article className="text-center">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-neutral-100">
        <Image src={image} alt={`${role} ${name}`} fill className="object-cover" sizes="195px" />
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--rose)]">{role}</p>
      <h3 className="font-script mt-2 text-4xl leading-none text-neutral-800">{name}</h3>
      <p className="mt-3 text-sm font-medium text-neutral-700">{detail}</p>
    </article>
  );
}

function InfoRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="grid min-h-[4.6rem] grid-cols-[88px_1fr] items-center gap-4 border-b border-[var(--line)] py-4">
      <p className="text-sm font-semibold tracking-[0.34em] text-[var(--ink-soft)]">{label}</p>
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

function MusicIcon() {
  return (
    <svg
      aria-hidden="true"
      className="music-toggle-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      className="music-toggle-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M16 9a5 5 0 0 1 .95 2.29" />
      <path d="M19.36 5.64A9 9 0 0 1 21 12" />
      <path d="m2 2 20 20" />
      <path d="m7 7-.83.83H3v8.34h3.17L12 22v-9" />
      <path d="M12 2v5.17" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="gallery-lightbox-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="gallery-lightbox-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="gallery-lightbox-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function getCountdown() {
  const distance = Math.max(weddingDate - Date.now(), 0);
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance / 3_600_000) % 24);
  const minutes = Math.floor((distance / 60_000) % 60);
  const seconds = Math.floor((distance / 1_000) % 60);

  return [
    { value: String(days).padStart(2, "0"), label: "DAYS" },
    { value: String(hours).padStart(2, "0"), label: "HOUR" },
    { value: String(minutes).padStart(2, "0"), label: "MIN" },
    { value: String(seconds).padStart(2, "0"), label: "SEC" }
  ];
}
