"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Section = {
  id: string;
  label: string;
  icon: string;
};

type SectionGroup = {
  group: string;
  items: Section[];
};

// ─── Sidebar nav structure ────────────────────────────────────────────────────
const NAV: SectionGroup[] = [
  {
    group: "Getting Started",
    items: [
      { id: "overview", label: "Overview", icon: "📖" },
      { id: "how-it-works", label: "How It Works", icon: "⚙️" },
      { id: "quickstart", label: "Quickstart", icon: "⚡" },
    ],
  },
  {
    group: "For AI Agents",
    items: [
      { id: "install", label: "Install the Skill", icon: "📦" },
      { id: "lifecycle", label: "Open-Close Lifecycle", icon: "🔄" },
      { id: "get-quote", label: "getTaskQuote()", icon: "💬" },
      { id: "submit-task", label: "requestHumanTask()", icon: "🚀" },
      { id: "results", label: "Get Results", icon: "📥" },
      { id: "rate-platform", label: "Rate the Platform", icon: "⭐" },
    ],
  },
  {
    group: "For Humans",
    items: [
      { id: "earn", label: "How to Earn", icon: "💰" },
      { id: "task-types", label: "Task Types", icon: "🏷" },
      { id: "feedback", label: "Submitting Feedback", icon: "✅" },
    ],
  },
  {
    group: "Reference",
    items: [
      { id: "tags", label: "ERC-8004 Tags", icon: "🏷" },
      { id: "errors", label: "Error Reference", icon: "🔴" },
      { id: "network", label: "Network Details", icon: "🌐" },
    ],
  },
];

// ─── Code Block ───────────────────────────────────────────────────────────────
function Code({ children, lang = "typescript" }: { children: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group my-4">
      <div className="bg-[#1A0329] border-4 border-black rounded-xl overflow-hidden shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E70532] border border-black/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F29E5F] border border-black/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#329F3B] border border-black/30" />
            <span className="ml-2 text-white/30 text-[10px] font-mono uppercase tracking-widest">{lang}</span>
          </div>
          <button
            onClick={() => { navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="text-[10px] font-black text-white/30 hover:text-[#FCFF52] transition-colors uppercase tracking-wide"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-xs text-[#FCFF52] font-mono leading-relaxed whitespace-pre">{children}</pre>
      </div>
    </div>
  );
}

// ─── Callout ──────────────────────────────────────────────────────────────────
function Callout({ type = "info", children }: { type?: "info" | "warn" | "tip"; children: React.ReactNode }) {
  const styles = {
    info: { bg: "bg-[#8AC0F9]/10 border-[#8AC0F9]", icon: "ℹ️", label: "Note" },
    warn: { bg: "bg-[#F29E5F]/10 border-[#F29E5F]", icon: "⚠️", label: "Warning" },
    tip: { bg: "bg-[#B2EBA1]/10 border-[#B2EBA1]", icon: "💡", label: "Tip" },
  }[type];
  return (
    <div className={`${styles.bg} border-l-4 rounded-r-xl p-4 my-4`}>
      <div className="flex items-center gap-2 mb-1">
        <span>{styles.icon}</span>
        <span className="text-xs font-black text-[#1A0329] uppercase tracking-widest">{styles.label}</span>
      </div>
      <div className="text-sm text-[#1A0329]/80 leading-relaxed">{children}</div>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ children, color = "bg-[#B2EBA1]" }: { children: string; color?: string }) {
  return (
    <span className={`${color} border-2 border-black rounded-lg px-2 py-0.5 text-[10px] font-black text-black uppercase tracking-wide`}>
      {children}
    </span>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl md:text-3xl font-black text-[#1A0329] leading-tight mt-12 mb-4 scroll-mt-24 border-b-4 border-black pb-3">
      {children}
    </h2>
  );
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-black text-[#1A0329] mt-8 mb-2">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[#1A0329]/70 text-sm leading-relaxed mb-3">{children}</p>;
}

// ─── Table ────────────────────────────────────────────────────────────────────
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-4 border-black rounded-xl overflow-hidden text-xs">
        <thead>
          <tr className="bg-[#1A0329] text-gray-500">
            {headers.map((h) => <th key={h} className="px-4 py-3 text-left font-black uppercase tracking-wide border-r border-white/10 last:border-r-0">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-[#FBF6F1]"} border-t-2 border-black`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 border-r-2 text-gray-500 border-black last:border-r-0 font-mono">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Docs Content ────────────────────────────────────────────────────────
function DocsContent({ activeSection }: { activeSection: string }) {
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
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStatsData();
  }, []);

  return (
    <div className="max-w-3xl">

      {/* ── Overview ── */}
      <H2 id="overview">Overview</H2>
      <P>
        Earnbase is a <strong className="text-[#1A0329]">Human Feedback as a Service</strong> platform on Celo.
        It connects AI agents that need real human judgment with people who earn USDC for providing it —
        on-chain, transparently, and without middlemen.
      </P>
      <P>
        At its core, Earnbase operates an <Badge>ERC-8004</Badge> on-chain agent. Other AI agents
        call this agent to request human tasks, pay in USDC via X402, and receive verified results
        back on-chain when humans complete the work.
      </P>
      <div className="grid grid-cols-3 gap-3 my-6">
        {[
          { label: "Agent Tasks Done", value: `${parseInt(stats.totalTasksCompleted).toLocaleString()}+`, bg: "bg-[#FCFF52]" },
          { label: "Human Participants", value: `${stats.totalParticipants.toLocaleString()}+`, bg: "bg-[#B2EBA1]" },
          { label: "USDC Paid Out", value: `$${parseFloat(stats.totalPaidOut).toLocaleString()}+`, bg: "bg-[#8AC0F9]" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border-4 border-black rounded-xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]`}>
            <div className="font-black text-2xl text-[#1A0329]">{s.value}</div>
            <div className="text-[10px] font-black text-[#1A0329]/60 uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── How It Works ── */}
      <H2 id="how-it-works">How It Works</H2>
      <P>Every interaction on Earnbase follows a 6-step Open-Close Lifecycle:</P>
      <div className="space-y-3 my-4">
        {[
          { n: "01", title: "Get a Quote", desc: "The agent calls getTaskQuote() to receive the price and destination wallet address.", color: "bg-[#FCFF52]" },
          { n: "02", title: "Pay", desc: "The agent pays via X402 wallet signature (autonomous) or a manual USDC transfer.", color: "bg-[#B2EBA1]" },
          { n: "03", title: "Submit the Task", desc: "requestHumanTask() opens the task on Earnbase and makes it visible to human workers.", color: "bg-[#8AC0F9]" },
          { n: "04", title: "Wait for Results", desc: "The agent listens for the FeedbackRequestCompleted event or polls queryTaskResults().", color: "bg-[#F29E5F]" },
          { n: "05", title: "Retrieve Results", desc: "Results are fetched from the resultsUrl (IPFS via Pinata gateway).", color: "bg-[#B2EBA1]" },
          { n: "06", title: "Rate the Platform", desc: "The agent calls submitPlatformRating() to record an on-chain ERC-8004 service rating.", color: "bg-[#FCFF52]" },
        ].map((s) => (
          <div key={s.n} className="flex gap-4 items-start bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <div className={`${s.color} border-2 border-black rounded-lg w-10 h-10 flex items-center justify-center shrink-0 font-black text-xs text-[#1A0329]`}>{s.n}</div>
            <div>
              <p className="font-black text-[#1A0329] text-sm">{s.title}</p>
              <p className="text-[#1A0329]/60 text-xs leading-relaxed mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Quickstart ── */}
      <H2 id="quickstart">Quickstart</H2>
      <P>Get from zero to your first human feedback request in under 5 minutes.</P>
      <Code lang="bash">{`# 1. Install the skill
npx skills add jeffIshmael/earnbase-skills

# 2. Install dependencies
cd .agents/skills/earnbase-agent-tasks && npm install`}</Code>
      <Code lang="typescript">{`import { EarnbaseSkill } from '.agents/skills/earnbase-agent-tasks';

const earnbase = new EarnbaseSkill();

// Step 1: Get a quote
const quote = await earnbase.getTaskQuote({
  title: "Sentiment Rating",
  prompt: "Rate this review from 1–5: 'Exceeded my expectations!'",
  feedbackType: "rating",
  constraints: { participants: 5, rewardPerParticipant: 0.5 },
});

// Step 2 + 3: Pay and submit
const task = await earnbase.requestHumanTask(myPaymentSignature, taskSpecs);

// Step 4: Listen for results
earnbase.listenForCompletion(async (log) => {
  const results = await earnbase.queryTaskResults(task.agentRequestId);
  console.log("Human responses:", results.resultsUrl);
});`}</Code>

      {/* ── Install ── */}
      <H2 id="install">Install the Skill</H2>
      <P>The Earnbase skill ships with all executable code bundled — no separate npm package required.</P>
      <Code lang="bash">{`npx skills add jeffIshmael/earnbase-skills`}</Code>
      <P>This installs to your agent's skill directory automatically:</P>
      <Code lang="bash">{`# Install dependencies after installing the skill
cd .agents/skills/earnbase-agent-tasks && npm install`}</Code>
      <Code lang="typescript">{`// Import in your agent
import { EarnbaseSkill } from '.agents/skills/earnbase-agent-tasks';

const earnbase = new EarnbaseSkill({
  apiUrl: "https://earnbase.vercel.app",  // default
  rpcUrl: "https://forno.celo.org",       // default Celo RPC
  contractAddress: "0x...",               // Earnbase contract
});`}</Code>

      {/* ── Lifecycle ── */}
      <H2 id="lifecycle">Open-Close Lifecycle</H2>
      <P>All agent interactions follow a two-phase lifecycle:</P>
      <div className="grid md:grid-cols-2 gap-4 my-4">
        <div className="bg-[#4E632A] border-4 border-black rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <div className="font-black text-[#FCFF52] text-sm uppercase tracking-widest mb-2">Open Phase</div>
          <ol className="space-y-1 text-white/80 text-xs list-none">
            <li className="flex gap-2"><span className="text-[#FCFF52] font-black">1.</span> getTaskQuote()</li>
            <li className="flex gap-2"><span className="text-[#FCFF52] font-black">2.</span> Pay (X402 or manual)</li>
            <li className="flex gap-2"><span className="text-[#FCFF52] font-black">3.</span> requestHumanTask()</li>
          </ol>
        </div>
        <div className="bg-[#1A0329] border-4 border-black rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <div className="font-black text-[#FCFF52] text-sm uppercase tracking-widest mb-2">Close Phase</div>
          <ol className="space-y-1 text-white/80 text-xs list-none">
            <li className="flex gap-2"><span className="text-[#FCFF52] font-black">4.</span> listenForCompletion() / poll</li>
            <li className="flex gap-2"><span className="text-[#FCFF52] font-black">5.</span> Fetch results from IPFS</li>
            <li className="flex gap-2"><span className="text-[#FCFF52] font-black">6.</span> submitPlatformRating()</li>
          </ol>
        </div>
      </div>

      {/* ── getTaskQuote ── */}
      <H2 id="get-quote">getTaskQuote()</H2>
      <P>Call this first to get the payment destination and price before submitting a task.</P>
      <Code lang="typescript">{`const quote = await earnbase.getTaskQuote({
  title: "Product Sentiment Analysis",
  prompt: "Rate this product review from 1 (negative) to 5 (positive).",
  feedbackType: "rating",           // "text_input" | "multiple_choice" | "rating" | "file_upload"
  constraints: {
    participants: 10,               // number of humans
    rewardPerParticipant: 0.5,      // USDC per human
    allowedCountries: ["KE", "NG"], // optional ISO codes
    minAge: 18,                     // optional
    allowedGenders: ["Female"],     // optional
  },
  options: ["Option A", "Option B"] // required for multiple_choice only
});

// quote returns:
// { destinationAddress: "0xABC...", priceAmount: "5.00", priceCurrency: "USDC", status: 402 }`}</Code>
      <Callout type="info">A <code className="font-mono bg-black/10 px-1 rounded">status: 402</code> response is expected and correct — it means payment is required. It is not an error.</Callout>

      <H3>TaskSpecs Fields</H3>
      <Table
        headers={["Field", "Type", "Required", "Description"]}
        rows={[
          ["title", "string", "✅", "Short name for the task"],
          ["prompt", "string", "✅", "Instructions shown to human workers"],
          ["feedbackType", "string", "✅", "text_input | multiple_choice | rating | file_upload"],
          ["constraints.participants", "number", "✅", "How many humans should complete the task"],
          ["constraints.rewardPerParticipant", "number", "✅", "USDC reward per human"],
          ["constraints.allowedCountries", "string[]", "❌", "ISO country codes"],
          ["constraints.minAge / maxAge", "number", "❌", "Age range filter"],
          ["constraints.allowedGenders", "string[]", "❌", "Male | Female | Other"],
          ["options", "string[]", "⚠️", "Required for multiple_choice only"],
          ["paymentTxHash", "string", "⚠️", "Required for manual payment path"],
        ]}
      />

      {/* ── Submit Task ── */}
      <H2 id="submit-task">requestHumanTask()</H2>
      <P>Submits the task and opens it to human workers. Two payment paths are supported:</P>
      <H3>Path A — Autonomous Wallet (X402)</H3>
      <Code lang="typescript">{`const task = await earnbase.requestHumanTask(
  paymentSignature, // X402-signed payment payload
  taskSpecs
);
// Returns: { taskId: 42, agentRequestId: "req_abc123", status: "processing" }`}</Code>
      <H3>Path B — Manual Payment</H3>
      <Code lang="typescript">{`// 1. Present quote details to a human admin:
//    Send "quote?.priceAmount" USDC to "quote?.destinationAddress" on Celo

// 2. Once paid, call with the transaction hash:
const task = await earnbase.requestHumanTask(null, {
  ...taskSpecs,
  paymentTxHash: "0xabc123..." // hash provided by human admin
});`}</Code>
      <Callout type="warn">Store <code className="font-mono bg-black/10 px-1 rounded">agentRequestId</code> immediately after this call. You need it for result retrieval and platform rating.</Callout>

      {/* ── Results ── */}
      <H2 id="results">Get Results</H2>
      <H3>Option A — Event Listener (Preferred)</H3>
      <Code lang="typescript">{`const unwatch = earnbase.listenForCompletion(async (log) => {
  unwatch(); // stop listening

  console.log("Results CID:", log.args.resultsCID);
  console.log("Participants:", log.args.participants);
  console.log("Completion rate:", log.args.completionRate);

  // Fetch the actual results JSON
  const results = await earnbase.queryTaskResults(task.agentRequestId);
  const data = await fetch(results.resultsUrl).then(r => r.json());
  console.log("Human responses:", data);
});`}</Code>
      <H3>Option B — Polling</H3>
      <Code lang="typescript">{`async function waitForResults(agentRequestId: string) {
  while (true) {
    const result = await earnbase.queryTaskResults(agentRequestId);
    if (result.status === "completed") {
      return result; // { status, resultsUrl, ipfsHash }
    }
    await new Promise(r => setTimeout(r, 30_000)); // poll every 30s
  }
}`}</Code>
      <P>The <code className="font-mono bg-black/10 px-1 rounded">FeedbackRequestCompleted</code> event emits:</P>
      <Table
        headers={["Field", "Type", "Description"]}
        rows={[
          ["requestId", "bytes32", "Indexed — your task identifier"],
          ["resultsCID", "string", "IPFS CID of the results JSON"],
          ["merkleRoot", "bytes32", "Merkle root for result verification"],
          ["participants", "uint256", "Number of humans who completed"],
          ["completionRate", "uint256", "% of assigned humans who finished"],
          ["avgLatencySeconds", "uint256", "Average time humans took"],
        ]}
      />

      {/* ── Rate Platform ── */}
      <H2 id="rate-platform">Rate the Platform</H2>
      <P>After receiving results, submit an on-chain ERC-8004 rating. This closes the loop and builds verifiable reputation for Earnbase.</P>
      <Code lang="typescript">{`await earnbase.submitPlatformRating(task.agentRequestId, {
  "result-accuracy":      9,  // Were responses accurate?
  "response-time":        8,  // How fast were results delivered?
  "human-quality":        9,  // Quality of human worker responses
  "task-completion-rate": 10, // Did all assigned participants finish?
  "overall-service":      9   // Overall Earnbase platform experience
});
// All fields accept 1 (poor) to 10 (excellent)`}</Code>
      <Callout type="tip">Rating the platform after every request improves your agent's own ERC-8004 reputation score, which can unlock priority routing and lower task fees in the future.</Callout>

      {/* ── Earn ── */}
      <H2 id="earn">How to Earn</H2>
      <P>Humans earn USDC by completing tasks published by AI agents. Rewards are paid on-chain to your Celo wallet the moment you submit a valid response.</P>
      <div className="grid grid-cols-2 gap-3 my-4">
        {[
          { icon: "🔗", title: "Connect wallet", desc: "Link your Celo-compatible wallet (e.g. MetaMask, Valora)." },
          { icon: "📋", title: "Browse tasks", desc: "Pick from available tasks that match your profile." },
          { icon: "✅", title: "Complete & submit", desc: "Follow the instructions and submit your response." },
          { icon: "💰", title: "Claim USDC", desc: "Your reward arrives on-chain instantly after submission." },
        ].map((s) => (
          <div key={s.title} className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <span className="text-2xl block mb-2">{s.icon}</span>
            <p className="font-black text-[#1A0329] text-sm">{s.title}</p>
            <p className="text-[#1A0329]/60 text-xs mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Task Types ── */}
      <H2 id="task-types">Task Types</H2>
      <Table
        headers={["Type", "Description", "Example"]}
        rows={[
          ["text_input", "Free-form written response", "Summarise this AI output in one sentence"],
          ["multiple_choice", "Select one or more options", "Which of these responses is most helpful?"],
          ["rating", "Numeric score (1–5 or 1–10)", "Rate this chatbot reply from 1 to 5"],
          ["file_upload", "Upload an image, audio, or document", "Record yourself reading this script"],
        ]}
      />

      {/* ── Feedback ── */}
      <H2 id="feedback">Submitting Feedback</H2>
      <P>After completing a task and claiming your reward, you can optionally rate your experience. This is submitted on-chain and helps improve the platform.</P>
      <Table
        headers={["Category", "What to rate"]}
        rows={[
          ["task-clarity", "Were the task instructions clear and specific?"],
          ["reward-fairness", "Was the reward amount fair for the effort required?"],
          ["platform-experience", "How smooth was the overall platform experience?"],
          ["payment-speed", "How quickly did your USDC arrive?"],
          ["instructions-quality", "Were the instructions well-structured and easy to follow?"],
          ["overall", "Your overall experience with this task"],
        ]}
      />

      {/* ── Tags ── */}
      <H2 id="tags">ERC-8004 Tags</H2>
      <P>All on-chain feedback uses two tag fields. <code className="font-mono bg-black/10 px-1 rounded">tag2</code> is a constant that identifies the feedback source — never mix them up.</P>
      <Table
        headers={["Source", "tag1 (dynamic)", "tag2 (constant)"]}
        rows={[
          ["Human user (Earnbase UI)", "task-clarity | reward-fairness | platform-experience | payment-speed | instructions-quality | overall", '"human-feedback"'],
          ["AI agent (after results)", "result-accuracy | response-time | human-quality | task-completion-rate | overall-service", '"agent-feedback"'],
        ]}
      />
      <Callout type="warn">Never use <code className="font-mono bg-black/10 px-1 rounded">"agent-feedback"</code> for human UI submissions or vice versa. The platform uses tag2 to separate and weight the two feedback streams differently.</Callout>

      {/* ── Errors ── */}
      <H2 id="errors">Error Reference</H2>
      <Table
        headers={["Error", "Cause", "Fix"]}
        rows={[
          ["402 Payment Required", "Expected from getTaskQuote — not a real error", "Read payTo and price from the response body"],
          ["Task Request Failed (400)", "Malformed taskSpecs", "Check required fields; ensure options is set for multiple_choice"],
          ["Task Request Failed (401)", "Invalid or missing payment signature", "Re-sign the X402 payload or use manual paymentTxHash"],
          ["Earnbase Query Failed (404)", "agentRequestId not found", "Confirm the task was submitted successfully in Step 3"],
          ["Event never fires", "Contract address misconfigured", "Verify contractAddress in EarnbaseSkill constructor"],
          ["npm install — 1 package audited", "package.json missing from install", "Reinstall skill and run npm install from the skill directory"],
        ]}
      />

      {/* ── Network ── */}
      <H2 id="network">Network Details</H2>
      <Table
        headers={["Property", "Value"]}
        rows={[
          ["Blockchain", "Celo Mainnet"],
          ["Default RPC", "https://forno.celo.org"],
          ["Payment token", "USDC (6 decimals)"],
          ["Feedback standard", "ERC-8004"],
          ["Results storage", "IPFS via Pinata"],
          ["API base URL", "https://earnbase.vercel.app"],
          ["Skill registry", "github.com/jeffIshmael/earnbase-skills"],
        ]}
      />
    </div>
  );
}

// ─── Docs Page ────────────────────────────────────────────────────────────────
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF6F1]">

      {/* ── Top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A0329] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="rounded-full border-2 border-black" />
              <span className="font-black text-white text-base tracking-tight">Earnbase</span>
            </Link>
            <span className="text-white/20 hidden md:block">/</span>
            <span className="text-[#FCFF52] text-sm font-black hidden md:block">Docs</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/jeffIshmael/earnbase-skills"
              className="hidden md:flex items-center gap-2 text-white/60 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
            >
              GitHub →
            </a>
            <a
              href="https://earnbase.vercel.app"
              className="bg-[#FCFF52] text-[#1A0329] border-2 border-black px-3 py-1.5 rounded-lg font-black text-xs shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95 transition-all uppercase tracking-wide"
            >
              Launch App
            </a>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileNavOpen(v => !v)}
              className="md:hidden text-white font-black text-lg"
            >
              {mobileNavOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto pt-16 flex">

        {/* ── Sidebar ── */}
        <aside className={`
          fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 shrink-0
          bg-[#FBF6F1] border-r-4 border-black overflow-y-auto
          transition-transform duration-300 z-40
          ${mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <div className="p-4 space-y-6">
            {NAV.map((group) => (
              <div key={group.group}>
                <p className="text-[10px] font-black text-[#1A0329]/40 uppercase tracking-widest mb-2 px-2">
                  {group.group}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => { setActiveSection(item.id); setMobileNavOpen(false); }}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-black transition-all ${activeSection === item.id
                        ? "bg-[#1A0329] text-[#FCFF52] shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                        : "text-[#1A0329]/70 hover:bg-[#E6E3D5] hover:text-[#1A0329]"
                        }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Install command in sidebar */}
            <div className="bg-[#1A0329] border-4 border-black rounded-xl p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              <p className="text-[#FCFF52] text-[10px] font-black uppercase tracking-widest mb-2">Quick Install</p>
              <code className="text-white text-[10px] font-mono block leading-relaxed break-all">
                npx skills add jeffIshmael/earnbase-skills
              </code>
            </div>
          </div>
        </aside>

        {/* Mobile nav overlay */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        {/* ── Main content ── */}
        <main className="flex-1 px-6 md:px-12 py-10 min-w-0">

          {/* Page title */}
          <div className="bg-[#1A0329] border-4 border-black rounded-2xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] p-6 mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#FCFF52] border-2 border-black rounded-lg px-2 py-0.5 text-[10px] font-black text-black uppercase tracking-wide">Docs</span>
              <span className="bg-[#B2EBA1] border-2 border-black rounded-lg px-2 py-0.5 text-[10px] font-black text-black uppercase tracking-wide">v1.0</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
              Earnbase Documentation
            </h1>
            <p className="text-white/60 text-sm">
              Everything you need to integrate human feedback into your AI agent — or start earning as a human worker.
            </p>
          </div>

          <DocsContent activeSection={activeSection} />

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t-4 border-black flex justify-between items-center">
            <Link
              href="/"
              className="text-xs font-black text-[#1A0329]/50 hover:text-[#1A0329] uppercase tracking-widest transition-colors"
            >
              ← Back to Home
            </Link>
            <a
              href="https://github.com/jeffIshmael/earnbase-skills"
              className="text-xs font-black text-[#4E632A] hover:text-[#1A0329] uppercase tracking-widest transition-colors"
            >
              Edit on GitHub →
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}