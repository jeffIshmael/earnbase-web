"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─── Stat Counter Hook ────────────────────────────────────────────────────────
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, prefix = "", suffix = "", started }: {
  value: number; label: string; prefix?: string; suffix?: string; started: boolean;
}) {
  const count = useCounter(value, 1800, started);
  return (
    <div className="border-4 border-black bg-[#FCFF52] shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-2xl p-6 flex flex-col gap-1">
      <span className="font-black text-4xl md:text-5xl text-[#1A0329] tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm font-bold text-[#4E632A] uppercase tracking-widest">{label}</span>
    </div>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="shrink-0 bg-[#FCFF52] border border-black rounded px-2 py-0.5 text-[9px] font-black text-black uppercase tracking-wide hover:bg-white transition-all active:scale-95"
    >
      {copied ? "✓" : "Copy"}
    </button>
  );
}

// ─── Terminal Panel (Agent mode) ──────────────────────────────────────────────
function TerminalPanel() {
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisibleStep(1), 600);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    {
      comment: "# Step 1: Install the skill",
      command: "npx skills add jeffIshmael/earnbase-skills",
      badge: "STEP 1",
      badgeBg: "bg-[#FCFF52]",
    },
    {
      comment: "# Step 2: Install dependencies (run once from the skill directory)",
      command: "cd .agents/skills/earnbase-agent-tasks && npm install",
      badge: "STEP 2",
      badgeBg: "bg-[#B2EBA1]",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="bg-[#1A0329] border-4 border-black rounded-2xl shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">

        {/* macOS traffic lights */}
        <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-white/10 bg-black/30">
          <span className="w-3 h-3 rounded-full bg-[#E70532] border border-black/40" />
          <span className="w-3 h-3 rounded-full bg-[#F29E5F] border border-black/40" />
          <span className="w-3 h-3 rounded-full bg-[#329F3B] border border-black/40" />
          <span className="ml-3 text-white/30 text-[10px] font-mono tracking-widest uppercase">terminal — earnbase</span>
        </div>

        {/* Commands */}
        <div className="p-5 space-y-5 font-mono text-sm">

          {/* Intro line */}
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span className="text-[#329F3B]">●</span>
            <span>Last login: {new Date().toDateString()}</span>
          </div>

          {steps.map((s, i) => (
            <div
              key={i}
              className={`space-y-2 transition-all duration-500 ${i <= visibleStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
            >
              {/* Comment line */}
              <div className="text-white/40 text-xs">{s.comment}</div>

              {/* Command row */}
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-[#FCFF52] shrink-0">$</span>
                <code className="text-white text-xs leading-relaxed flex-1 break-all">{s.command}</code>
                <CopyBtn text={s.command} />
              </div>

              {/* Badge */}
              <div className="flex items-center gap-2">
                <span className={`${s.badgeBg} border border-black rounded px-2 py-0.5 text-[9px] font-black text-black uppercase`}>
                  {s.badge}
                </span>
                {i === 0 && <span className="text-white/30 text-[10px]">Works with Claude Code, Cursor, Antigravity + 39 more agents</span>}
                {i === 1 && <span className="text-white/30 text-[10px]">Installs viem + tsx dependencies</span>}
              </div>
            </div>
          ))}

          {/* Then use block */}
          <div className={`transition-all duration-700 delay-300 ${visibleStep >= 1 ? "opacity-100" : "opacity-0"}`}>
            <div className="border-t border-white/10 pt-4">
              <div className="text-white/30 text-xs mb-2"># Then in your agent:</div>
              <div className="bg-black/40 border border-white/10 rounded-xl px-4 py-3">
                <code className="text-[#FCFF52] text-xs leading-loose block whitespace-pre">{`import { EarnbaseSkill } from
  '.agents/skills/earnbase-agent-tasks';

const earnbase = new EarnbaseSkill();
await earnbase.getTaskQuote(taskSpecs);`}</code>
              </div>
              <a
                href="https://github.com/jeffIshmael/earnbase-skills"
                className="inline-flex items-center gap-1 mt-3 text-[#FCFF52] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
              >
                Full docs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Human Panel (Human mode) ──────────────────────────────────────────────────
function HumanPanel() {
  return (
    <div className="w-full max-w-lg mx-auto mt-6 space-y-3">
      <p className="text-white/50 text-xs font-black uppercase tracking-widest text-center mb-4">
        Choose where to give feedback
      </p>
      <a
        href="https://farcaster.xyz/miniapps/te_I8X6QteFo/earnbase"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-4 w-full bg-[#FCFF52] text-[#1A0329] border-4 border-black px-6 py-4 rounded-xl font-black shadow-[5px_5px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🟣</span>
          <div className="text-left">
            <div className="text-sm uppercase tracking-wide">Launch on Farcaster</div>
            <div className="text-xs font-normal opacity-60">Open as a Farcaster Mini App</div>
          </div>
        </div>
        <span className="text-lg">→</span>
      </a>

      <a
        href="https://earnbase.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-4 w-full bg-[#1A0329] text-[#FCFF52] border-4 border-black px-6 py-4 rounded-xl font-black shadow-[5px_5px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌐</span>
          <div className="text-left">
            <div className="text-sm uppercase tracking-wide">Launch Web App</div>
            <div className="text-xs font-normal opacity-60 text-white/40">Open in your browser</div>
          </div>
        </div>
        <span className="text-lg">→</span>
      </a>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1A0329]/95 backdrop-blur border-b-4 border-black" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={36} height={36} className="rounded-full border-2 border-black" />
          <span className="font-black text-xl text-white tracking-tight">Earnbase</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["For Humans", "For Agents", "How It Works", "Stats"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-bold text-white/70 hover:text-[#FCFF52] transition-colors">
              {item}
            </a>
          ))}
        </div>
        <a href="https://earnbase.vercel.app"
          className="bg-[#FCFF52] text-[#1A0329] border-2 border-black px-4 py-2 rounded-xl font-bold text-sm shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
          Launch App →
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [activeTab, setActiveTab] = useState<"agent" | "human">("agent");

  return (
    <section className="min-h-screen bg-[#1A0329]/80 flex flex-col items-center justify-center pt-24 pb-20 px-6 relative overflow-hidden text-center">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "linear-gradient(#FCFF52 1px, transparent 1px), linear-gradient(90deg, #FCFF52 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Floating chips */}
      <div className="absolute top-96 right-8 md:right-24 rotate-6 bg-[#B2EBA1]/60 border-2 border-black px-3 py-1 rounded-lg shadow-[3px_3px_0_0_rgba(0,0,0,1)] text-xs font-black text-[#1A0329] hidden md:block">
        ERC-8004 ✦
      </div>
      <div className="absolute top-48 left-8 md:left-24 -rotate-3 bg-[#B2EBA1] border-2 border-black px-3 py-1 rounded-lg shadow-[3px_3px_0_0_rgba(0,0,0,1)] text-xs font-black text-[#1A0329] hidden md:block">
        Celo Network ✦
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 bg-[#FCFF52]/10 border border-[#FCFF52]/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#B2EBA1] animate-pulse" />
          <span className="text-[#FCFF52] text-xs font-bold tracking-widest uppercase">Live on Celo</span>
        </div>

        {/* Headline — centered */}
        <h1 className="text-[clamp(52px,9vw,120px)] font-black text-white leading-[0.9] tracking-tight mb-5">
          Human<br />
          <span className="text-[#FCFF52]">Feedback</span><br />
          as a Service.
        </h1>

        <p className="text-[#E6E3D5] text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Earnbase connects AI agents that need real human judgment with people who earn USDC for providing it.
          On-chain. Transparent. Powered by Celo.
        </p>

        {/* ── Tab switcher ── */}
        <div className="flex items-center bg-black/40 border-4 border-black rounded-2xl p-1.5 gap-1.5 mb-2">
          <button
            onClick={() => setActiveTab("agent")}
            className={`px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all active:scale-95 ${activeTab === "agent"
              ? "bg-[#FCFF52] text-[#1A0329] shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
              : "text-white/50 hover:text-white"
              }`}
          >
            🤖 I'm an Agent
          </button>
          <button
            onClick={() => setActiveTab("human")}
            className={`px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all active:scale-95 ${activeTab === "human"
              ? "bg-[#FCFF52] text-[#1A0329] shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
              : "text-white/50 hover:text-white"
              }`}
          >
            🧑 I'm a Human
          </button>
        </div>

        {/* ── Panels ── */}
        <div className="w-full">
          {activeTab === "agent" && <TerminalPanel key="agent" />}
          {activeTab === "human" && <HumanPanel key="human" />}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs font-bold tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  );
}

// ─── What Is Earnbase ─────────────────────────────────────────────────────────
function WhatIsEarnbase() {
  return (
    <section id="how-it-works" className="bg-[#FBF6F1] py-24 px-6 border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-black text-[#4E632A] tracking-widest uppercase mb-4 block">The Platform</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A0329] leading-tight mb-6">
              We changed<br />the game.
            </h2>
            <p className="text-[#1A0329]/70 text-base leading-relaxed mb-4">
              Earnbase started as a simple task-reward platform — humans completing micro-tasks and claiming USDC on Celo. But we saw a bigger opportunity.
            </p>
            <p className="text-[#1A0329]/70 text-base leading-relaxed mb-4">
              Today, Earnbase is the infrastructure layer for <strong className="text-[#1A0329]">AI agent ↔ human collaboration</strong>. We operate an ERC-8004 on-chain agent that receives feedback requests from other AI agents, publishes them as tasks to our human workforce, and returns verified results on-chain.
            </p>
            <p className="text-[#1A0329]/70 text-base leading-relaxed">
              Every interaction — task, rating, reward — is recorded transparently on the Celo blockchain. No black boxes. No middlemen.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { step: "01", title: "Agent sends request", desc: "An AI agent calls our ERC-8004 agent with a task spec and USDC payment via X402.", color: "bg-[#FCFF52]" },
              { step: "02", title: "Humans complete the task", desc: "Real people on Earnbase receive, complete, and submit their feedback or labels.", color: "bg-[#B2EBA1]" },
              { step: "03", title: "Results returned on-chain", desc: "The agent receives verified results via IPFS, with an on-chain completion event.", color: "bg-[#8AC0F9]" },
              { step: "04", title: "Rewards distributed", desc: "Human workers claim their USDC rewards. The loop closes.", color: "bg-[#F29E5F]" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <div className={`${item.color} border-2 border-black rounded-lg w-10 h-10 flex items-center justify-center shrink-0 font-black text-xs text-[#1A0329]`}>
                  {item.step}
                </div>
                <div>
                  <p className="font-black text-[#1A0329] text-sm">{item.title}</p>
                  <p className="text-[#1A0329]/60 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── For Humans ───────────────────────────────────────────────────────────────
function ForHumans() {
  return (
    <section id="for-humans" className="bg-[#4E632A] py-24 px-6 border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🏷", title: "Data Labeling", desc: "Label datasets for AI training" },
                { icon: "⚡", title: "RLHF Tasks", desc: "Rate and rank AI responses" },
                { icon: "✅", title: "Verification", desc: "Verify facts and outputs" },
                { icon: "💬", title: "Text Feedback", desc: "Review prompts and responses" },
                { icon: "#", title: "Tagging", desc: "Classify and tag content" },
                { icon: "✨", title: "Content Review", desc: "Assess quality and safety" },
              ].map((card) => (
                <div key={card.title} className="bg-white/10 border-2 border-white/20 hover:border-[#FCFF52] hover:bg-white/20 transition-all rounded-xl p-4 cursor-default">
                  <span className="text-2xl block mb-2">{card.icon}</span>
                  <p className="font-black text-white text-sm">{card.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="text-xs font-black text-[#FCFF52] tracking-widest uppercase mb-4 block">For Humans</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Your judgment.<br />
              <span className="text-[#FCFF52]">Your income.</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              Join thousands of workers who earn USDC by completing AI feedback tasks. No experience needed — just your time, attention, and honest opinion.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Earn USDC directly to your Celo wallet",
                "Work on your own schedule, from anywhere",
                "Tasks take 2–10 minutes each",
                "Instant on-chain reward claims",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                  <span className="w-5 h-5 bg-[#FCFF52] border-2 border-black rounded flex items-center justify-center text-[10px] font-black text-[#1A0329] shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="https://earnbase.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FCFF52] text-[#1A0329] border-4 border-black px-6 py-3 rounded-xl font-black shadow-[5px_5px_0_0_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all text-sm uppercase tracking-wide">
              Start Earning →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── For Agents ───────────────────────────────────────────────────────────────
function ForAgents() {
  return (
    <section id="for-agents" className="bg-[#FBF6F1] py-24 px-6 border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-black text-[#4E632A] tracking-widest uppercase mb-4 block">For AI Agents</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A0329] leading-tight mb-6">
              Human judgment,<br />
              <span className="text-[#4E632A]">on demand.</span>
            </h2>
            <p className="text-[#1A0329]/70 text-base leading-relaxed mb-6">
              Your agent needs a capability it can't compute — real human feedback. Earnbase is the API for that. Pay in USDC, get verified human responses on-chain. No wrappers. No APIs. Pure agent-to-human protocol.
            </p>

            <div className="bg-[#1A0329] border-4 border-black rounded-2xl p-5 shadow-[6px_6px_0_0_rgba(0,0,0,1)] mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#329F3B]" />
                <span className="text-white/40 text-xs font-mono">agent.ts</span>
              </div>
              <pre className="text-xs text-[#FCFF52] font-mono leading-relaxed overflow-x-auto">
                {`import { EarnbaseSkill } from
  '.agents/skills/earnbase-agent-tasks';

const earnbase = new EarnbaseSkill();

// 1. Get quote
const quote = await earnbase
  .getTaskQuote(taskSpecs);

// 2. Submit task
const task = await earnbase
  .requestHumanTask(sig, taskSpecs);

// 3. Await results
earnbase.listenForCompletion(
  (log) => processResults(log)
);`}
              </pre>
            </div>

            <a href="/docs"
              className="inline-block bg-[#1A0329] text-[#FCFF52] border-4 border-black px-6 py-3 rounded-xl font-black shadow-[5px_5px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all text-sm uppercase tracking-wide">
              Install the Skill →
            </a>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { title: "Any feedback type", desc: "Text input, multiple choice, rating scales, file uploads — all supported natively.", tag: "Flexible" },
              { title: "X402 native payments", desc: "Pay autonomously with a wallet signature. No human admin needed for payment.", tag: "Autonomous" },
              { title: "Event-driven results", desc: "Subscribe to the FeedbackRequestCompleted event. Your agent wakes up when humans finish.", tag: "Async" },
              { title: "On-chain reputation", desc: "Rate each interaction via ERC-8004. Build a verifiable reputation for quality.", tag: "Trustless" },
              { title: "Demographic targeting", desc: "Filter human workers by country, age, gender, and nationality for targeted feedback.", tag: "Precise" },
            ].map((item) => (
              <div key={item.title} className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex gap-4">
                <div className="shrink-0">
                  <span className="bg-[#B2EBA1] border-2 border-black rounded-lg px-2 py-0.5 text-[10px] font-black text-[#1A0329]">
                    {item.tag}
                  </span>
                </div>
                <div>
                  <p className="font-black text-[#1A0329] text-sm">{item.title}</p>
                  <p className="text-[#1A0329]/60 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalPaidOut: "0",
    totalTasksCompleted: "0",
    totalAgentsServed: "0"
  });

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStatsData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="bg-[#FCFF52] py-24 px-6 border-b-2 border-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-black text-[#4E632A] tracking-widest uppercase mb-3 block">By The Numbers</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A0329] leading-tight">
            Real work.<br />Real results.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value={parseInt(stats.totalTasksCompleted) || 0} label="Agent Tasks Done" started={started} />
          <StatCard value={stats.totalParticipants || 0} label="Human Participants" started={started} />
          <StatCard value={parseFloat(stats.totalPaidOut) / 10 ** 6 || 0} label="USDC Paid Out" prefix="$" started={started} />
          <StatCard value={parseInt(stats.totalAgentsServed) || 0} label="AI Agents Served" started={started} />
        </div>
      </div>
    </section>
  );
}

// ─── Partners ─────────────────────────────────────────────────────────────────
function Partners() {
  const partners = [
    { name: "Celo", logo: "/images/celo-logo.png" },
    { name: "Self", logo: "/images/self-logo.png" },
    { name: "Agent", logo: "/images/agentAvatar.png" },
  ];

  return (
    <section className="bg-[#E6E3D5] py-16 px-6 border-b-2 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-black text-[#1A0329]/40 tracking-widest uppercase mb-10">
          Built on & Powered by
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-20 h-20 bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden group-hover:-translate-y-1 group-hover:shadow-[4px_6px_0_0_rgba(0,0,0,1)] transition-all duration-200">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-black text-[#1A0329]/60 uppercase tracking-widest">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1A0329] border-t-4 border-[#FCFF52]/20 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-xs">© {new Date().getFullYear()} Earnbase. Built on Celo. All rights reserved.</p>
        <div className="flex gap-4">
          {[{ name: "GitHub", href: "https://github.com/jeffIshmael/earnbase-web" }, { name: "Docs", href: "/docs" }, { name: "Twitter", href: "https://x.com/0xearnbase" }].map((link) => (
            <a key={link.name} href={link.href} className="text-white/40 hover:text-[#FCFF52] text-xs font-bold transition-colors">{link.name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EarnbaseLanding() {
  return (
    <main className="font-sans">
      <Nav />
      <Hero />
      <WhatIsEarnbase />
      <ForHumans />
      <ForAgents />
      <Stats />
      <Partners />
      {/* <CTA /> */}
      <Footer />
    </main>
  );
}