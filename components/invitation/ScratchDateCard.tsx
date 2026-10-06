"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle, Calendar, Clock } from "lucide-react";

export default function ScratchDateCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawingRef = useRef(false);
  const hasCelebratedRef = useRef(false);

  const [isMounted, setIsMounted] = useState(false);

  // Live countdown to Dec 12, 2026 8:00 PM IST
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsMounted(true);
    const target = new Date("2026-12-12T20:00:00+05:30").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentPixels = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] < 128) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / (totalPixels / 4)) * 100);
      setScratchPercent(percent);

      if (percent > 30 && !hasCelebratedRef.current) {
        hasCelebratedRef.current = true;
        setIsRevealed(true);
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.62 },
          colors: ["#dfba73", "#fbe8b5", "#d4af37", "#b8243e", "#ffffff"],
        });
      }
    } catch {
      // ignore context security if any
    }
  }, [isRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Luxury antique gold leaf metallic gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#d8b467");
    gradient.addColorStop(0.2, "#fae4b5");
    gradient.addColorStop(0.45, "#a8843c");
    gradient.addColorStop(0.7, "#edd399");
    gradient.addColorStop(1, "#c99e4b");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle ornate patterned stippling
    ctx.fillStyle = "rgba(40, 10, 5, 0.08)";
    for (let x = 8; x < width; x += 14) {
      for (let y = 8; y < height; y += 14) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Dual concentric gold foil border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = "rgba(184, 141, 56, 0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // Text instructions stamped on foil
    ctx.fillStyle = "#2e1204";
    ctx.font = "bold 13px Cinzel, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", width / 2, height / 2 - 12);

    ctx.font = "italic 12px Cormorant Garamond, serif";
    ctx.fillStyle = "#4a2108";
    ctx.fillText("the sacred celebration dates", width / 2, height / 2 + 12);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const handleRevealAll = () => {
    setIsRevealed(true);
    hasCelebratedRef.current = true;
    confetti({
      particleCount: 95,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#dfba73", "#fbe8b5", "#d4af37", "#b8243e", "#ffffff"],
    });
  };

  const handleCalendar = () => {
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Dawat-e-Walima: Mohammad Farhan Khan & Arshiya Anees"
    )}&dates=20261212T143000Z/20261212T183000Z&details=${encodeURIComponent(
      "Dawat-e-Walima of Mohammad Farhan Khan & Arshiya Anees. Hosted by Mr. & Mrs. Late Haji Mohammad Shahzade Khan."
    )}&location=${encodeURIComponent("Shivam Palace, Keshavpuram, Kanpur")}`;
    window.open(calendarUrl, "_blank");
  };

  return (
    <section className="relative w-full py-16 px-5 flex flex-col items-center text-center overflow-hidden theme-pearl-white border-t border-[#dfba73]/35">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[#dfba73]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="inline-flex items-center gap-2 mb-2">
        <Sparkles className="w-3 h-3 text-[#5c1222]" />
        <p className="font-cinzel text-[10px] tracking-[0.3em] text-[#5c1222] uppercase font-bold">
          A SACRED MOMENT IN TIME
        </p>
        <Sparkles className="w-3 h-3 text-[#5c1222]" />
      </div>

      <h2 className="font-pinyon text-4xl sm:text-5xl text-[#380812] font-bold mb-6 drop-shadow-[0_1px_3px_rgba(92,18,34,0.15)]">
        Scratch to Reveal
      </h2>

      {/* Luxury Scratch Card Frame */}
      <div className="relative w-full max-w-[370px] min-h-[250px] rounded-3xl p-1 bg-gradient-to-b from-[#dfba73] via-[#b88d38] to-[#dfba73] shadow-[0_16px_45px_rgba(92,18,34,0.15),0_2px_10px_rgba(223,186,115,0.3)] border border-[#dfba73]/60">
        <div className="relative w-full min-h-[246px] rounded-[22px] overflow-hidden bg-[#380812] flex flex-col items-center justify-center p-4">
          {/* Underneath Revealed Content - Light Maroon Royal Card */}
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center select-none bg-[radial-gradient(circle_at_center,_#5c1222_0%,_#380812_70%,_#24050d_100%)]">
            <span className="font-cinzel text-[10px] tracking-[0.3em] text-[#dfba73] uppercase font-bold mb-1">
              DAWAT-E-WALIMA &amp; CELEBRATIONS
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-gradient tracking-wide mb-1 drop-shadow-[0_2px_12px_rgba(223,186,115,0.4)]">
              12 DECEMBER 2026
            </h3>
            <p className="font-cormorant text-sm italic text-[#faf2e4] mb-3">
              Shivam Palace • Keshavpuram, Kanpur
            </p>

            {/* Live Countdown Timer Grid */}
            <div className="w-full grid grid-cols-4 gap-1.5 max-w-[280px] my-1 py-2 px-2.5 rounded-xl bg-black/45 border border-[#dfba73]/40 shadow-inner">
              <div className="flex flex-col items-center">
                <span className="font-cinzel text-base font-bold text-gold-gradient leading-none">
                  {isMounted ? timeLeft.days : "0"}
                </span>
                <span className="text-[8px] font-cinzel text-[#e0cfb0] uppercase tracking-wider mt-0.5">
                  Days
                </span>
              </div>
              <div className="flex flex-col items-center border-l border-[#dfba73]/30">
                <span className="font-cinzel text-base font-bold text-gold-gradient leading-none">
                  {isMounted ? timeLeft.hours : "0"}
                </span>
                <span className="text-[8px] font-cinzel text-[#e0cfb0] uppercase tracking-wider mt-0.5">
                  Hours
                </span>
              </div>
              <div className="flex flex-col items-center border-l border-[#dfba73]/30">
                <span className="font-cinzel text-base font-bold text-gold-gradient leading-none">
                  {isMounted ? timeLeft.minutes : "0"}
                </span>
                <span className="text-[8px] font-cinzel text-[#e0cfb0] uppercase tracking-wider mt-0.5">
                  Mins
                </span>
              </div>
              <div className="flex flex-col items-center border-l border-[#dfba73]/30">
                <span className="font-cinzel text-base font-bold text-gold-gradient leading-none">
                  {isMounted ? timeLeft.seconds : "0"}
                </span>
                <span className="text-[8px] font-cinzel text-[#e0cfb0] uppercase tracking-wider mt-0.5">
                  Secs
                </span>
              </div>
            </div>

            {/* Quick Add to Calendar when revealed */}
            {isRevealed && (
              <button
                onClick={handleCalendar}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfba73]/25 hover:bg-[#dfba73]/35 border border-[#dfba73]/60 text-[#dfba73] text-[10px] font-cinzel tracking-wider uppercase transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Calendar className="w-3 h-3" />
                <span>Save to Google Calendar</span>
              </button>
            )}
          </div>

          {/* Canvas Scratch Foil Layer */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none transition-opacity duration-700 rounded-[22px] ${
              isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />
        </div>
      </div>

      {/* Manual Action & Feedback */}
      <div className="mt-5 flex flex-col items-center gap-2">
        {!isRevealed ? (
          <button
            onClick={handleRevealAll}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#dfba73] text-gold-gradient text-[11px] font-cinzel tracking-widest uppercase bg-gradient-to-r from-[#4a0d1b] to-[#6a1628] hover:from-[#5c1222] hover:to-[#7c1d33] transition-all cursor-pointer shadow-md active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfba73]" />
            <span>Tap to Reveal All</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#fbf7f0] border border-[#dfba73]/60 shadow-xs">
            <CheckCircle className="w-4 h-4 text-[#5c1222]" />
            <p className="text-xs font-cormorant italic text-[#5c1222] font-semibold">
              Dates revealed • We look forward to celebrating with you!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
