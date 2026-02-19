import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Plane,
  Ticket,
  X,
  Briefcase,
  GraduationCap,
  Award,
  FolderKanban,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import planeMap from "./assets/plane-map.png";


/**
 * Airplane Seat Portfolio – single-file React component.
 * Styling: TailwindCSS.
 * Animations: Framer Motion.
 */

const seatMap = {
  A1: {
    type: "Experience",
    title: "NinjaTrader — Web Engineer Intern",
    icon: Briefcase,
    content: [
      "Collaborated with cross-functional agile teams to develop and maintain full-stack web features using JavaScript, React, and .NET, contributing to internal trading tools and dashboards",
      "Wrote unit-tested, production-ready code, resolved technical bugs in legacy systems, and participated in sprint planning, story grooming, and end-of-quarter deployment preparation",
      "Contributed to UI/UX refinement through responsive design and usability testing, documented engineering decisions for internal knowledge sharing, and engaged in continuous feedback and mentorship to strengthen technical performance",
    ],
  },
  A2: {
    type: "Experience",
    title: "Dia Inc. — Software Engineer Intern (Tokyo)",
    icon: Briefcase,
    content: [
      "Engineered Python-based solutions in a fast-paced environment, emphasizing accuracy, efficiency, and structured execution",
      "Presented technical analyses and strategic proposals to senior stakeholders, supporting data-driven decision-making",
      "Strengthened analytical and problem-solving skills through mentorship and complex technical assignments",
    ],
  },
  A3: {
    type: "Projects",
    title: "Task Orchestrator Platform",
    icon: FolderKanban,
    link: {
      label: "View GitHub Repo",
      url: "https://github.com/galaxygab121/task-orchestrator-platform"
    },
    content: [
      "Java, Spring Boot, PostgreSQL, Kafka, Docker",
      "Built a distributed workflow management system to model structured operational planning environments and multi-stage execution processes",
      "Developed database-backed lifecycle tracking tools to ensure data integrity and visibility across complex task pipelines.",
      "Implemented automated processing streams to enhance operational efficiency, improve throughput, and support scalable base-level planning analysis.",
    ],
  },
  A4: {
    type: "Projects",
    title: "Smart Task Scheduler",
    icon: FolderKanban,
    link: {
      label: "View GitHub Repo",
      url: "https://github.com/galaxygab121/smart-task-scheduler"
    },
    content: [
      "Java, Scheduling Algorithms, Statistical Analysis",
      "Designed and implemented Priority, Earliest Deadline First, and Shortest Job First scheduling algorithms to simulate workload allocation and long-term operational planning across fluctuating demand cycles",
      "Conducted quantitative simulations to evaluate capacity utilization, turnaround time, and deadline risk under varying workload intensities.",
      "Applied statistical deviation metrics to monitor resource distribution, flag demand imbalances, and support data-driven planning decisions",
    ],
  },
  B1: {
    type: "Projects",
    title: "Aircraft Maintenance Forecast Simulator",
    icon: Plane,
    link: {
      label: "View GitHub Repo",
      url: "https://github.com/galaxygab121/aircraft-maintenance-forecast-simulator"
    },
    content: [
      "Python, Scheduling Logic, Data Analysis",
      "Designed and implemented a capacity-aware maintenance forecasting model to simulate aircraft maintenance intervals, fleet workload distribution, and base-level labor utilization across a 120-day planning horizon.",
      "Built scheduling logic to allocate maintenance tasks within defined windows based on labor availability and operational constraints, modeling real-world Tech Ops Base Planning workflows.",
      "Developed automated reporting and risk-flagging outputs (overdue, capacity shortfall, late schedule) with interactive dashboard visualization to support data-driven maintenance planning decisions.",
    ],
  },
  B2: {
    type: "Projects",
    title: "Travel Currency Forecasting Tool",
    icon: FolderKanban,
    link: {
      label: "View the web application",
      url: "https://depaul-northern-trust-hackathon.vercel.app"
    },
    content: [
      "Python, Time Series Modeling",
      "Built a time-series forecasting model to analyze historical data patterns and predict trend-based demand variability.",
      "Structured and normalized datasets to improve model reliability and forecast stability across shifting conditions.",
      "Evaluated risk variance and produced analytical reports to inform forward-looking planning decisions.",
    ],
  },
  B3: {
    type: "Coursework",
    title: "Distributed Systems (CSC 376)",
    icon: GraduationCap,
    content: [
      "Built systems emphasizing reliability, scalability, and coordination.",
      "Practiced lifecycle management, messaging patterns, and data consistency concepts.",
      "Applied systems thinking to real-world planning style problems.",
    ],
  },
  B4: {
    type: "Certificates",
    title: "Imperial College of London",
    icon: Award,
    content: [
      "Mathematics for Machine Learning: Multivariate Calculus",
      "Mathematics for Machine Learning: Linear Algebra",
    ],
    tags: ["Imperial College", "Mathematics for Machine Learning", "Certificates", "edX"],
  },
    C1: {
    type: "Coursework",
    title: "Program Language Concepts (CSC 347)",
    icon: GraduationCap,
    content: [
      "Programming language paradigms, type systems, and compiler design.",
      "Experience with language semantics, syntax analysis, and structured code generation.",
      "Applied concepts to build interpreters and compilers, emphasizing correctness, efficiency, and maintainability.",
    ],
  },
  D1: {
    type: "Projects",
    title: "Concurrent Job Queue",
    icon: FolderKanban,
    link: {
      label: "View GitHub Repo",
      url: "https://github.com/galaxygab121"
    },
    content: [
      "Java, Multithreading, Performance Metrics",
      "Performed throughput and capacity modeling to identify bottlenecks and improve resource allocation strategies.",
      "Generated structured performance and reliability metrics to support continuous process optimization and schedule integrity.",
    ],
  },
  E1: {
    type: "Coursework",
    title: "Database Systems",
    icon: GraduationCap,
    content: [
      "Relational design and querying for structured planning datasets.",
      "Experience with SQL-based workflows and data consistency concepts.",
      "Applied data modeling to support analytics and reporting needs.",
    ],
  },
  F1: {
    type: "Certificates",
    title: "Massacusetts Institute of Technology",
    icon: Award,
    content: [
      "Introduction to computational thinking and data science",
      "Introduction to Computer Science and Programming using Python",
    ],
    tags: ["MIT", "Intro to CS", "Computational Thinking", "Certificates", "edX"],

  },

  C2: {
    type: "Experience",
    title: "Lead Computer Engineer",
    icon: Ticket,
    content: [
      "Led development and deployment of a large-scale educational platform, coordinating a distributed technical team.",
      "Managed planning sessions and aligned deliverables to ensure timely, high-quality project execution",
      "Secured executive approval for major platform improvements through strategic presentations and stakeholder engagement",
    ],
  },
  D2: {
    type: "Coursework",
    title: "Object Oriented Software Development (SE 350)",
    icon: Plane,
    content: [
      "Java, OOP Principles, Software Design Patterns",
      "Experience with software lifecycle management, version control, and testing frameworks.",
      "Applied structured design and modular coding practices to support maintainable, scalable software development.",
    ],
  },
  E2: {
    type: "Coursework",
    title: "Computer Systems",
    icon: GraduationCap,
    content: [
      "Systems-level thinking: performance, reliability, and debugging.",
      "Comfort working close to hardware constraints and technical documentation.",
      "Foundation for understanding complex operational systems.",
    ],
  },
  F2: {
    type: "Certificates",
    title: "Stanford University",
    icon: Award,
    content: [
      "algorithms: design and analysis, part 1",
      "algorithms: design and analysis, part 2",
    ],
    tags: ["Stanford", "Algorithms", "Design and Analysis", "Certificates", "edX"],

  },

  C3: {
    type: "Coursework",
    title: "Software Projects Capstone (CSC 394)",
    icon: FolderKanban,
    link: {
      label: "Check out the case study website",
      url: "https://galaxygab121.github.io/wildid-csc394-case-study/"
    },
    content: [
      "Designed and implemented a responsive front-end using HTML, CSS, and JavaScript, prioritizing clean UI, accessibility, and intuitive navigation for educational users.",
      "Deployed and maintained the website using GitHub Pages, ensuring reliable hosting, cross-device compatibility, and professional delivery of the final product.",
  
    ],
  },
  D3: {
    type: "Coursework",
    title: "Machine Learning (DSC 345)",
    icon: GraduationCap,
    content: [
      "Model evaluation, training workflows, and data preparation fundamentals.",
      "Strong comfort with metrics, validation, and performance comparison.",
      "forecasting, trend analysis, and anomaly detection.",
    ],
  },
  E3: {
    type: "Projects",
    title: "Task Manager GUI",
    icon: FolderKanban,
    link: {
      label: "View GitHub Repo",
      url: "https://github.com/galaxygab121/task-manager-gui"
    },
    content: [
      "Python, customtkinter, MongoDB, pymongo, SHA-256 security",
      "implemented user authentication with a MongoDB back end and SHA-256 hashed credentials to ensure secure access to operational data and protect system integrity",
      "Developed role-based GUI features including error handling, view filters, and reports to enhance operational oversight and data-driven decision support in scheduling environments",
    ],
  },
  F3: {
    type: "Experience",
    title: "Project Manage WEB APPLICATION TEAM",
    icon: Briefcase,
    content: [
      "Led the end-to-end development of a public-facing wildlife identification and education website, managing project scope, timelines, and feature planning as Project Manager.",
      "Coordinated design and development decisions to ensure consistency across pages, visual hierarchy, and a polished case-study presentation.",
      "Strong written communication and structured documentation habits.",
      "Experience with project management tools, version control, and cross-functional collaboration.",
    ],
  },

  C4: {
    type: "Coursework",
    title: "Foundations of Artificial Intelligence (CSC 380)",
    icon: GraduationCap,
    link: {
      label: "View course work on github",
      url: "https://github.com/galaxygab121/CSC380_HW2"
    },
    content: [
      "AI problem-solving techniques, search algorithms, and knowledge representation.",
      "Experience with algorithmic thinking, heuristic evaluation, and structured problem decomposition.",
      "Applied AI concepts to real-world scenarios, emphasizing practical implementation and performance analysis.",
    ],
  },
  D4: {
    type: "Coursework",
    title: "Design & Analysis of Algorithms (CSC 321)",
    icon: GraduationCap,
    content: [
      "Optimization thinking applied to scheduling and planning constraints.",
      "Experience evaluating tradeoffs in performance and resource allocation.",
      "Supports planning analysis and workflow improvement work.",
    ],
  },
  E4: {
    type: "Certificates",
    title: "Columbia X",
    icon: Award,
    content: [
      "Certification of completion in: ",
      "Artifical Intelligence",
      "Robotics",
      "Issued via ColumbiaX (EDX)",
    ],
    tags: ["ColumbiaX", "AI", "Robotics", "Certificates", "edX"],
  },
  F4: {
    type: "Certificates",
    title: "University of California, San Diego",
    icon: Award,
    content: [
      "Big Data Integration and Processing",
      "Machine Learning with Big Data",
      "Introduction to Big Data",
      "Graph Analytics for Big Data",
      "Big Data Capstone Project",
      "Big Data Modeling and Management Systems",
    ],
    tags: ["UCSD", "Big Data", "Certificates", "edX"],

  },

};

const seatOrder = [
  ["A1", "B1", "C1", "D1", "E1", "F1"],
  ["A2", "B2", "C2", "D2", "E2", "F2"],
  ["A3", "B3", "C3", "D3", "E3", "F3"],
  ["A4", "B4", "C4", "D4", "E4", "F4"],
];
const firstClassRow = ["A1", "B1", "A3", "A4"];


function Seat({ id, onClick, selectedSeat }) {
  const meta = seatMap[id];

  return (
    <button
      onClick={() => onClick(id)}
      className={[
  "group relative w-full rounded-md bg-transparent",
  "p-0 text-left transition-all duration-200",
  "focus:outline-none focus:ring-2 focus:ring-slate-400",
  selectedSeat === id
    ? "ring-2 ring-slate-900 scale-105 z-10"
    : "hover:scale-105",
]
  .filter(Boolean)
  .join(" ")}

      aria-label={`Open ticket for seat ${id}`}
    >
      <div className="flex flex-col items-center justify-center gap-1">
  {/* Seat icon */}
  <div
    className={[
  "relative h-10 w-[54px] rounded-xl border shadow-sm transition-all duration-200",
  selectedSeat === id && "shadow-md",
  meta.type === "Experience" &&
    "border-sky-200 bg-sky-50 group-hover:bg-sky-100",
  meta.type === "Projects" &&
    "border-emerald-200 bg-emerald-50 group-hover:bg-emerald-100",
  meta.type === "Coursework" &&
    "border-violet-200 bg-violet-50 group-hover:bg-violet-100",
  meta.type === "Certificates" &&
    "border-amber-200 bg-amber-50 group-hover:bg-amber-100",
  meta.type === "Contact" &&
    "border-slate-200 bg-slate-50 group-hover:bg-slate-100",
]
  .filter(Boolean)
  .join(" ")}

  >
    {/* seat back */}
    <div className="absolute left-1/2 top-1 h-4 w-[40px] -translate-x-1/2 rounded-lg border border-white/70 bg-white/70" />
    {/* seat base */}
    <div className="absolute left-1/2 bottom-1 h-4 w-[34px] -translate-x-1/2 rounded-lg border border-white/70 bg-white/60" />
    {/* armrests */}
    <div className="absolute left-1 top-3 h-3 w-1.5 rounded-full bg-slate-200/70" />
    <div className="absolute right-1 top-3 h-3 w-1.5 rounded-full bg-slate-200/70" />
  </div>

  {/* Seat label */}
  <div className="text-[10px] font-semibold text-slate-700">{id}</div>

  {/* Tiny type letter like airline maps */}
  <div className="text-[10px] text-slate-400">{meta.type?.[0] ?? ""}</div>
</div>
    </button>
  );
}


function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(), 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <Motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-b from-slate-100 to-white shadow-md
"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Motion.img
        src={planeMap}
        alt="Airplane loading"
        className="h-[520px] w-auto select-none drop-shadow-xl"
        initial={{ x: 520, y: 40, rotate: 8, scale: 0.92, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="absolute bottom-10 text-center">
        <div className="text-xs font-semibold tracking-wide text-slate-500">
          BOARDING
        </div>
        <div className="mt-1 text-sm text-slate-700">
          Preparing cabin layout…
        </div>
      </div>
    </Motion.div>
  );
}


function TicketModal({ open, seatId, onClose }) {
  const meta = seatId ? seatMap[seatId] : null;
  const actionLinks = meta?.links || (meta?.link ? [meta.link] : []);


  return (
    <AnimatePresence>
      {open && meta && (
        <Motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
  className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
  onClick={onClose}
  style={{ pointerEvents: "auto" }}
/>

          <Motion.div
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
             className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
                  <Ticket className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Boarding pass</div>
                  <div className="text-base font-semibold text-slate-900">
                    Seat {seatId}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-600 hover:bg-white hover:text-slate-900"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-0 md:grid-cols-[1.3fr_0.7fr]">
  {/* LEFT SIDE */}
  <div className="px-6 py-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="text-xs font-medium text-slate-500">Category</div>
        <div className="mt-0.5 text-sm font-semibold text-slate-900">
          {meta.type}
        </div>
      </div>

      <div className="text-right">
        <div className="text-xs font-medium text-slate-500">Title</div>
        <div className="mt-0.5 text-sm font-semibold text-slate-900">
          {meta.title}
        </div>
      </div>
    </div>

    <div className="mt-5">
      <div className="text-xs font-medium text-slate-500">Details</div>
      <ul className="mt-2 space-y-2">
        {meta.content.map((line, idx) => (
          <li key={idx} className="text-sm text-slate-800">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-300 align-middle" />
            <span className="align-middle">{line}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* TAGS */}
    {meta?.tags?.length ? (
      <div className="mt-6 flex flex-wrap gap-2">
        {meta.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
    ) : null}
  </div>

  {/* RIGHT SIDE */}
  <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 md:border-l md:border-t-0">
    {/* TOP LINE: Passenger • GBB • UA26 */}
    <div className="flex items-center justify-between">
      <div className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
        Passenger
      </div>
      <div className="text-xs font-semibold tracking-[0.18em] text-slate-500">
        GBB • UA26
      </div>
    </div>

    {/* NAME */}
    <div className="mt-2 text-lg font-extrabold leading-tight text-slate-900">
      Gabrielle Boyer-Baker
    </div>

    {/* ROUTE */}
    <div className="mt-5 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
      Route
    </div>
    <div className="mt-1 text-sm font-semibold text-slate-900">
      DePaul Uni <span className="px-1 text-slate-400">→</span> United Airlines
    </div>
    <div className="mt-1 text-xs text-slate-600">
      Connecting People, Uniting the World
    </div>

    {/* ACTIONS */}
    <div className="mt-4 text-xs font-medium text-slate-500">
  Ticket Actions
</div>

<div className="mt-2 space-y-2">
  {actionLinks.length > 0 ? (
    actionLinks.map((link) => (
      <div key={link.url} className="flex gap-2">
        <a
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
          href={link.url}
          target="_blank"
          rel="noreferrer"
        >
          <Ticket className="h-4 w-4" />
          {link.label}
        </a>
      </div>
    ))
  ) : (
    <>
      <a
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-100"
        href="https://www.linkedin.com/in/gabrielleboyerbaker"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </a>

      <a
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-100"
        href="https://github.com/galaxygab121"
        target="_blank"
        rel="noreferrer"
      >
        <Github className="h-4 w-4" />
        GitHub
      </a>
    </>
  )}
</div>
</div>


            <div className="relative h-8">
              <div className="absolute inset-x-0 top-0 border-t border-dashed border-slate-300" />
              <div className="absolute left-0 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-950/40" />
              <div className="absolute right-0 top-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-950/40" />
            </div>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AirplaneSeatPortfolio() {
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const stats = useMemo(() => {
    const entries = Object.entries(seatMap);
    const counts = entries.reduce((acc, [, v]) => {
      acc[v.type] = (acc[v.type] || 0) + 1;
      return acc;
    }, {});
    return counts;
  }, []);

    return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <AnimatePresence>
  {loading && <LoadingScreen onDone={() => setLoading(false)} />}
</AnimatePresence>

      <header className="mx-auto max-w-6xl px-5 pt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
              <Plane className="h-4 w-4" />
              Airplane Seat Portfolio
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Welcome aboard ✈️
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Click a seat to open its ticket. Each ticket reveals experience,
              projects, coursework, or certificates.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(stats).map(([k, v]) => (
              <span
                key={k}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm"
              >
                {k}: {v}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">


<div className="mb-4 flex items-center justify-between">
  <div className="text-xs font-semibold tracking-wide text-slate-500">
    CABIN MAP
  </div>
  <div className="text-[11px] text-slate-500">Tap a seat to view ticket</div>
</div>

<div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
    <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
    Experience
  </span>

  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
    Projects
  </span>

  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
    <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
    Coursework
  </span>

  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
    Certificates
  </span>
</div>


 {/* FIRST CLASS */}
<div className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <div className="text-xs font-semibold tracking-wide text-slate-500">
        FIRST CLASS
      </div>
      <div className="mt-1 text-base font-semibold text-slate-900">
        Featured Highlights
      </div>
      <div className="mt-1 text-sm text-slate-600">
        Click these first for the most recent work.
      </div>
    </div>

    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
      Priority boarding
    </span>
  </div>



  <div className="mt-5 grid gap-4 md:grid-cols-4">
    {firstClassRow.map((id) => (
      <div key={id} className="scale-[1.02]">
        <Seat id={id} onClick={setSelectedSeat} />
      </div>
    ))}
  </div>
</div>

<div className="my-6 flex items-center gap-3">
  <div className="h-px flex-1 bg-slate-200" />
  <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
    MAIN CABIN
  </div>
  <div className="h-px flex-1 bg-slate-200" />
</div>

           <div className="mt-6">
  <div className="grid grid-cols-[44px_1fr_44px] gap-6">

    {/* LEFT WINDOWS */}
    <div className="hidden md:flex flex-col gap-6 pt-2">
      {seatOrder.map((row) => (
        <div key={`L-${row[0]}`} className="flex h-[64px] items-center justify-center">
          <div className="h-9 w-5 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="mx-auto mt-2 h-5 w-2 rounded-full bg-white shadow-inner" />
          </div>
        </div>
      ))}
    </div>

    {/* SEATS */}
    <div className="grid gap-4">
      {/* Seat letters */}
<div className="grid grid-cols-[24px_72px_72px_72px_32px_72px_72px_72px_24px] items-center gap-3 text-xs font-semibold text-slate-400">
  <div /> {/* empty for row number */}
  <div className="text-center">A</div>
  <div className="text-center">B</div>
  <div className="text-center">C</div>

  <div /> {/* aisle gap */}

  <div className="text-center">D</div>
  <div className="text-center">E</div>
  <div className="text-center">F</div>
  <div /> {/* right row number */}
</div>
      {seatOrder.map((row) => (
        <div
          key={row[0]}
          className="grid grid-cols-[24px_72px_72px_72px_32px_72px_72px_72px_24px] items-center gap-3"
        >

          {/* LEFT ROW NUMBER */}
          <div className="text-center text-xs font-semibold text-slate-500">
            {row[0].slice(1)}
          </div>

          <Seat id={row[0]} selectedSeat={selectedSeat} onClick={setSelectedSeat} />
          <Seat id={row[1]} selectedSeat={selectedSeat} onClick={setSelectedSeat} />
          <Seat id={row[2]} selectedSeat={selectedSeat} onClick={setSelectedSeat} />

          {/* AISLE */}
          <div className="relative h-full">
            <div className="absolute inset-y-0 left-1/2 w-[14px] -translate-x-1/2 rounded-full bg-gradient-to-b from-slate-50 to-slate-100"/>
            <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-slate-200" />
          </div>

          <Seat id={row[3]} selectedSeat={selectedSeat} onClick={setSelectedSeat} />
          <Seat id={row[4]} selectedSeat={selectedSeat} onClick={setSelectedSeat} />
          <Seat id={row[5]} selectedSeat={selectedSeat} onClick={setSelectedSeat} />

          {/* RIGHT ROW NUMBER */}
          <div className="text-center text-xs font-semibold text-slate-400">
            {row[0].slice(1)}
          </div>

        </div>
      ))}
    </div>

    {/* RIGHT WINDOWS */}
    <div className="hidden md:flex flex-col gap-6 pt-2">
      {seatOrder.map((row) => (
        <div key={`R-${row[0]}`} className="flex h-[64px] items-center justify-center">
          <div className="h-9 w-5 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="mx-auto mt-2 h-5 w-2 rounded-full bg-white shadow-inner" />
          </div>
        </div>
      ))}
    </div>
  

  </div>
</div>



              
             
          </section>
          

          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm overflow-hidden relative">

{/* TOP HEADER */}
<div className="rounded-t-3xl border-b border-slate-200 bg-gradient-to-r from-slate-100 to-slate-50 px-6 pt-6 pb-8">

  {/* Passenger + Code Row */}
  <div className="text-xs font-semibold tracking-widest text-slate-500">
    PASSENGER • GBB UA26
  </div>

  {/* Name */}
  <div className="mt-3 text-xs font-extrabold leading-tight text-slate-900">
    Gabrielle Boyer-Baker
  </div>

  {/* Route Section */}
  <div className="mt-8">
    <div className="text-xs font-semibold tracking-widest text-slate-500">
      ROUTE
    </div>

    <div className="mt-2 text-xs font-bold text-slate-900">
      DePaul University <span className="mx-2">→</span> United Airlines
    </div>
  </div>

</div>

{/* Dashed divider */}
<div className="px-6 py-4">
  <div className="border-t border-dashed border-slate-300" />
</div>

    {/* Manifest details */}
    <div className="mt-4 space-y-3 text-sm text-slate-700">

      <div>
        <span className="text-xs text-slate-500">Major</span>
        <div className="font-semibold">Computer Science (B.S.)</div>
      </div>
      <div>
        <span className="text-xs text-slate-500">Minor</span>
        <div className="font-semibold">Neuroscience</div>
      </div>

      <div>
        <span className="text-xs text-slate-500">Specialization</span>
        <div className="font-semibold">
          Data Science, Machine Learning, and Analytics
        </div>
      </div>

      <div>
        <span className="text-xs text-slate-500">Core Tools</span>
        <div className="font-semibold">
          Excel • Python • SQL • Java • Data Analysis • PowerPoint • R • JavaScript
        </div>
      </div>

    </div>

    {/* dotted tear strip like ticket */}
    <div className="relative mt-6 h-6">
      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300" />
      <div className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-slate-200" />
      <div className="absolute right-0 top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-slate-200" />
    </div>

    {/* Contact actions */}
    <div className="mt-4 space-y-2">
      <a
        href="https://www.linkedin.com/in/gabrielleboyerbaker"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
      >
        View LinkedIn
      </a>
      <a
        href="https://github.com/galaxygab121"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
      >
        View GitHub
      </a>

      <a
        href="mailto:gabrielleboyerbaker@gmail.com"
        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
      >
        Contact
      </a>

    </div>

</aside>


        </div>
      </main>

      <TicketModal
        open={!!selectedSeat}
        seatId={selectedSeat}
        onClose={() => setSelectedSeat(null)}
      />
    </div>
  );

}
