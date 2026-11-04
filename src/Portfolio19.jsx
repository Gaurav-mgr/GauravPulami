import { Fragment, forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import portrait from "./assets/gaurav.png";
import aboutportrait from "./assets/about.png";
import penImg from "./assets/fountain-pen.svg";
import logo from "./assets/Logo.svg";
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Mail,
  Code2,
  Smartphone,
  Database,
  Palette,
  Send,
  Terminal,
  GraduationCap,
  Briefcase,
  Cpu,
  Check,
  ExternalLink,
  Layers,
  Sparkles,
  Bug,
  FlaskConical,
  ListChecks,
  ShieldCheck,
  GitBranch,
  Webhook,
  Braces,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ------------------------------------------------------------------ */
/*  THEME — Ice Silver #DDE3EB / Deep Aubergine #3A0F34 / Marigold    */
/*  #EAAA00. Colours are CSS variables: .gp-root (light) and          */
/*  .gp-dark (aubergine sections) are defined in the <style> below.   */
/* ------------------------------------------------------------------ */

const BTN_PRIMARY =
  "inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-6 py-3 text-sm font-medium text-[color:var(--bg)] transition hover:bg-[var(--acc)] hover:text-[#3A0F34]";
const BTN_SECONDARY =
  "inline-flex items-center gap-2 rounded-full border border-[var(--line2)] px-6 py-3 text-sm font-medium text-[color:var(--fg)] transition hover:border-[var(--line3)]";

/* ------------------------------------------------------------------ */
/*  CONTENT — edit everything here, the UI below reads from this data  */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Gaurav Pulami",
  role: "Creative Developer",
  github: "https://github.com/Gaurav-mgr",
  // TODO: replace with your real LinkedIn URL
  linkedin: "https://www.linkedin.com/in/gauravpulami",
  // TODO: replace with your real email
  email: "gauravpulami0@gmail.com",
  zeneats: "https://github.com/Gaurav-mgr/Zeneats-Project/blob/main/README.md",
  weatherne: "https://github.com/Gaurav-mgr/Weather_Dashboard/blob/main/README.md",
  traceit: "https://github.com/Gaurav-mgr/TraceIt/blob/main/README.md",
  trendyhelmets: "https://github.com/Gaurav-mgr/TrendyHelmetsZone",
  chefgroq: "https://github.com/Gaurav-mgr/ChefGroq/blob/main/README.md",
  designPortfolio: "https://www.behance.net/gallery/253189237/Personal-Portfolio",
  profile: "https://www.github.com/Gaurav-mgr",
};

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    title: "Programming",
    icon: Code2,
    blurb: "Clean code for well-defined tasks.",
    tone: "bg-[var(--surf)]",
    items: ["Java", "C# (.NET / LINQ)", "JavaScript", "PHP", "React", "Laravel"],
  },
  {
    title: "Testing & Debugging",
    icon: Check,
    blurb: "Check it locally, fix it properly.",
    tone: "bg-[var(--surf)]",
    items: ["Unit Testing", "Debugging", "Local Checks", "Reviewer Feedback"],
  },
  {
    title: "Git & APIs",
    icon: Terminal,
    blurb: "Version control and integration basics.",
    tone: "bg-[var(--surf)]",
    items: ["Git", "GitHub", "Issue Tracking", "API Basics", "MySQL", "JDBC"],
  },
  {
    title: "UI & Design",
    icon: Layers,
    blurb: "UX friendly, creative and modern.",
    tone: "bg-[var(--surf)]",
    items: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Indesign", "Figma", "UI/UX Design"],
  },
];

/*
  TODO: These are placeholders based on the categories of work you described.
  Replace title / description / stack / repo / demo with your real
  Gaurav-mgr repositories that best show tests, bug fixes and docs. Leave `demo` empty ("") to hide the demo button.
*/
const PROJECTS = [
  {
    title: "ZenEats",
    category: "fullstack",
    description:
      "A second year Diet Recommendation System project built using HTML + CSS + JavaScript + PHP + MySQL with authentication and CRUD workflows, small, reviewable commits.",
    stack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Git"],
    repo: PROFILE.zeneats,
    demo: "",
  },
  {
    title: "Weatherne",
    category: "api",
    description:
      "A weather forecasting app with a clean, modern UI that uses external weather API.",
    stack: ["PHP", "API Basics", "React"],
    repo: PROFILE.weatherne,
    demo: "",
  },
  {
    title: "ChefGroq",
    category: "api",
    description:
      "A cooking recipe app with a modern UI, built with React and uses Groq API to recommend best recipe based on the provided ingredients.",
    stack: ["React", "Groq API"],
    repo: PROFILE.chefgroq,
    demo: "",
  },
  {
    title: "Trendy Helmets Zone",
    category: "ui",
    description:
      "A website built with React, Laravel, CSS, and Inertia.js with modern UI, creativity, and eye catching animations. All the animation in this website is built using plain CSS only for learning purpose.",
    stack: ["React", "Inertia.js", "Laravel", "CSS"],
    repo: PROFILE.trendyhelmets,
    demo: "",
  },
  {
    title: "TraceIt",
    category: "fullstack",
    description:
      "A financial management app with unit tests and debugging to ensure accurate calculations and reliable performance. It helps to keep track of your finances.",
    stack: ["React", "Tailwind CSS", "TypeScript", "Inertia.js", "Laravel", "Git"],
    repo: PROFILE.traceit,
    demo: "",
  },
];

/* ------------------------------------------------------------------ */
/*  ASSETS — picked up automatically, no imports to maintain.          */
/*  src/assets/logos/    one logo per project, named after it         */
/*                       (zeneats.svg, trendy-helmets-zone.png ...)    */
/*  src/assets/videos/   optional demo video / gif, same naming        */
/*  src/assets/designs/  the UI & Design pieces (shown in filename order) */
/*  To force a match, set `logo: "file-name"` / `video: "file-name"`   */
/*  (without extension) on a project.                                  */
/* ------------------------------------------------------------------ */

const toAssets = (mod) =>
  Object.entries(mod).map(([path, url]) => ({
    url,
    stem: path.split("/").pop().replace(/\.[^.]+$/, ""),
  }));
const LOGOS = toAssets(
  import.meta.glob("./assets/logos/*.{png,jpg,jpeg,webp,avif,gif,svg}", { eager: true, query: "?url", import: "default" })
);
const VIDEOS = toAssets(
  import.meta.glob("./assets/videos/*.{mp4,webm,mov,gif,webp}", { eager: true, query: "?url", import: "default" })
);
const DESIGN_FILES = toAssets(
  import.meta.glob("./assets/designs/*.{png,jpg,jpeg,webp,avif,gif,svg}", { eager: true, query: "?url", import: "default" })
).sort((a, b) => a.stem.localeCompare(b.stem, undefined, { numeric: true }));

const slug = (t) => String(t || "").toLowerCase().replace(/[^a-z0-9]/g, "");
function pickAsset(list, wanted, title) {
  const w = slug(wanted);
  const t = slug(title);
  const hit =
    (w && list.find((a) => slug(a.stem) === w)) ||
    list.find((a) => slug(a.stem) === t) ||
    list.find((a) => t.length > 2 && slug(a.stem).length > 2 && (slug(a.stem).includes(t) || t.includes(slug(a.stem))));
  return hit ? hit.url : null;
}

PROJECTS.forEach((p) => {
  p.logoUrl = pickAsset(LOGOS, p.logo, p.title);
  p.videoUrl = pickAsset(VIDEOS, p.video, p.title);
});

const FILTERS = [
  { id: "all", label: "All" },
  { id: "api", label: "API Basics" },
  { id: "ui", label: "UI" },
  { id: "fullstack", label: "Full Stack" },
];

/* Collage layout: each card cycles through these spans, offsets, tilts and colours. */
const PATTERNS = Array.from({ length: 6 }, (_, i) => ({
  span: ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-6", "md:col-span-6"][i],
  offset: "",
  rot: 0,
  bg: "bg-[var(--surf)]",
  fg: "text-[color:var(--fg)]",
  muted: "text-[color:var(--mut)]",
  chip: "border-[var(--line2)] bg-transparent text-[color:var(--mut2)]",
  rule: "border-[var(--line)]",
  tape: "hidden",
}));

/* Add a `period` string (e.g. "2025 — Present") to show dates on the timeline. */
const TIMELINE = [
  {
    kind: "edu",
    title: "Bachelor of Computer Applications (BCA)",
    org: "Currently pursuing (Dec 2023 - present)",
    period: "",
    points: [
      "Currently in the third year, focusing on software engineering, database management, and web architecture.",
      "Building hands-on full-stack, mobile (Android Studio), and desktop applications backed by Git version control.",
    ],
  },
  {
    kind: "work",
    title: "Assistant Graphic Designer & Technical Contributor",
    org: "CreativeLaya (Mar 2026 - May 2026)",
    period: "",
    points: [
      "Collaborated on creative assets, UI layouts, and digital branding using Adobe Photoshop and Illustrator.",
      "Maintained consistent deliverables by incorporating team review feedback efficiently.",
      "Supported design assets in Photoshop and Illustrator as a secondary duty.",
    ],
  },
  {
    kind: "edu",
    title: "Pre-Diploma in Computer Engineering - CTEVT",
    org: "Completed (Jan 2022 – Oct 2023)",
    period: "",
    points: [
      "Completed foundational training in programming logic, database management, and hardware/networking basics.",
      "System architecture, networking and IT support basics.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers & icons                                                    */
/* ------------------------------------------------------------------ */

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Page position (px from top of document) of an element, independent of the current scroll
function absTop(el) {
  let y = 0;
  while (el) {
    y += el.offsetTop;
    el = el.offsetParent;
  }
  return y;
}

function goTo(id) {
  // About and Skills share one pinned section: jump to the start (About) or the end (Skills) of its sideways travel
  const hs = document.getElementById("about-skills");
  if (hs && (id === "about" || id === "skills")) {
    const top = absTop(hs) - 64;
    const travel = hs.offsetHeight - hs.firstElementChild.offsetHeight;
    gsap.to(window, {
      scrollTo: { y: id === "about" ? top : top + travel, autoKill: true },
      duration: 1.1,
      ease: "power3.inOut",
    });
    return;
  }
  if (prefersReduced()) {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
    return;
  }
  gsap.to(window, {
    scrollTo: { y: `#${id}`, offsetY: 70, autoKill: true },
    duration: 1.1,
    ease: "power3.inOut",
  });
}

function goTop() {
  if (prefersReduced()) {
    window.scrollTo(0, 0);
    return;
  }
  gsap.to(window, { scrollTo: { y: 0, autoKill: true }, duration: 1.1, ease: "power3.inOut" });
}

const GitHubIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const LinkedInIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const catIcon = (cat) => {
  if (cat === "mobile") return Smartphone;
  if (cat === "qa") return Check;
  if (cat === "core") return Layers;
  return Code2;
};

/* Splits text into masked words so GSAP can slide them up one by one. */
function Words({ parts }) {
  const list = Array.isArray(parts) ? parts : [parts];
  return list.flatMap((part, pi) => {
    const text = typeof part === "string" ? part : part.text;
    const cls = typeof part === "string" ? "" : part.cls;
    return text
      .split(" ")
      .filter(Boolean)
      .map((word, wi) => (
        <Fragment key={`${pi}-${wi}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span className={`gp-word inline-block will-change-transform ${cls}`}>{word}</span>
          </span>{" "}
        </Fragment>
      ));
  });
}

function SectionHeading({ eyebrow, title, children, dark = false, hs = false, compact = false }) {
  // hs: reveal is driven by the sideways scroll instead of the normal vertical one
  const reveal = hs ? { "data-hreveal": "" } : { "data-reveal": "" };
  const split = hs ? { "data-hsplit": "" } : { "data-split": "" };
  return (
    <div className={`${compact ? "mb-8" : "mb-14"} max-w-3xl`}>
      <p
        {...reveal}
        className="mb-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--mut)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--acc)]" />
        {eyebrow}
      </p>
      <h2
        {...split}
        className={`font-display text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-[color:var(--fg)] ${compact ? "sm:text-5xl" : "sm:text-6xl"
          }`}
      >
        <Words parts={[title]} />
      </h2>
      {children && (
        <p
          {...reveal}
          className={`${compact ? "mt-4 text-base" : "mt-6 text-lg"} max-w-xl text-[color:var(--mut)]`}
        >
          {children}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    gsap.to(el, { height: open ? "auto" : 0, duration: 0.45, ease: "power3.inOut" });
    if (open) {
      gsap.from(el.querySelectorAll("li"), {
        x: -24,
        opacity: 0,
        stagger: 0.06,
        duration: 0.4,
        delay: 0.15,
        clearProps: "transform,opacity",
        borderRadius: "20px"
      });
    }
  }, [open]);

  const handleNav = (e, id) => {
    e.preventDefault();
    setOpen(false);
    goTo(id);
  };

  return (
    <header
      data-nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] text-[color:var(--fg)] backdrop-blur `}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            goTop();
          }}
          className="group flex items-center gap-3 font-display text-base font-medium"
        >
          <img src={logo} alt="Logo" className="h-9 w-9" />
          <span className="hidden sm:inline hover:text-[var(--acc)] transition:color duration-[0.3s]">Gaurav Pulami</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNav(e, item.id)}
                className={`px-4 py-2 rounded text-sm font-semibold transition-colors duration-[1s] ${active === item.id
                  ? "bg-[var(--fg)] text-[color:var(--bg)]"
                  : "text-[color:var(--mut)] hover:bg-[var(--tint)] hover:text-[color:var(--fg)]"
                  }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden p-2 transition-colors hover:text-[color:var(--acc)] transition:color duration-[0.3s] sm:block"
          >
            <GitHubIcon />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Linkedin"
            className="hidden p-2 transition-colors hover:text-[color:var(--acc)] transition:color duration-[0.3s] sm:block"
          >
            <LinkedInIcon />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-full border border-[var(--line2)] p-2 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div ref={menuRef} style={{ height: 0 }} className="overflow-hidden border-[var(--line)] md:hidden">
        <ul className="space-y-1 px-5 pb-5 pt-1">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNav(e, item.id)}
                className={`block rounded-full border px-4 py-3 font-display text-base font-medium ${active === item.id
                  ? "border-[var(--line2)] bg-[var(--tint2)] text-[color:var(--fg)]"
                  : "border-transparent text-[color:var(--mut)]"
                  }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — dark gold editorial layout                                  */
/* ------------------------------------------------------------------ */

const HERO_BTN_FILL =
  "inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-6 py-3 text-sm font-medium text-[color:var(--bg)] transition hover:bg-[var(--acc)] hover:text-[#3A0F34]";
const HERO_BTN_LINE =
  "inline-flex items-center gap-2 rounded-full border border-[var(--line2)] px-6 py-3 text-sm font-medium text-[color:var(--fg)] transition hover:border-[var(--line3)]";

function Hero() {
  const year = new Date().getFullYear();

  return (
    <section id="top" className="relative overflow-hidden bg-[var(--bg)] pt-16 text-[color:var(--fg)]">
      <h1 className="sr-only">Gaurav Pulami, Creative Developer</h1>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-32 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#EAAA00]/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top meta row */}
        <div
          data-hero-fade
          className="flex items-center gap-4 pt-8 font-mono text-[10px] uppercase tracking-[0.25em] sm:text-xs"
        >
          <span className="leading-relaxed">
            Creative Developer
            <br />
            &amp; BCA Student
          </span>
          <span className="h-px flex-1 bg-[var(--tint)]" />
          <span>{year}</span>
        </div>

        {/* Stage: giant lettering behind a cut-out portrait */}
        <div className="relative flex justify mt-6 h-[470px] sm:h-[600px] lg:h-[740px]">
          <svg
            data-depth="-14"
            data-hero-title
            viewBox="0 0 1000 420"
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block w-full select-none "
          >
            <text
              x="0"
              y="133"
              textLength="600"
              lengthAdjust="spacing"
              style={{ fill: "var(--acc)" }}
              fontSize="176"
              fontWeight="600"
              letterSpacing="-4"
              fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
            >
              Gaurav
            </text>
            <text
              x="343"
              y="346"
              textLength="600"
              lengthAdjust="spacing"
              style={{ fill: "var(--acc)" }}
              fontSize="176"
              fontWeight="600"
              letterSpacing="-4"
              fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
            >
              Pulami
            </text>
          </svg>

          <div data-depth="12" className="absolute inset-x-0 bottom-0 z-10 flex h-full items-end justify-center">
            <img
              data-hero-portrait
              src={portrait}
              alt="Portrait of Gaurav Pulami"
              width="1191"
              height="922"
              className="h-[96%] w-auto max-w-none select-none"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, #000 66%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, #000 56%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Copy blocks sit over the bottom of the stage on large screens */}
        <div className="relative z-20 grid gap-10 pb-12 pt-2 lg:-mt-52 lg:grid-cols-2 lg:items-end">
          <div className="max-w-sm">
            <p data-hero-fade className="font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-5xl">
              Creative
              <br />
              developer
            </p>
            <p data-hero-fade className="mt-5 text-sm leading-relaxed text-[color:var(--mut)]">
              BCA student and creative developer building full-stack applications with clean code, solid docs, and clean UI design.
            </p>
          </div>

          <div className="max-w-sm lg:justify-self-end lg:text-right">
            <p data-hero-fade className="font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-[color:var(--mut2)]">
              Well-defined tasks, tested code and clear documentation.
            </p>
            <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-3 lg:justify-end">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("projects");
                }}
                className={HERO_BTN_FILL}
              >
                View Projects <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("contact");
                }}
                className={HERO_BTN_LINE}
              >
                Contact Me <Mail className="h-4 w-4" />
              </a>
            </div>
            <div data-hero-fade className="mt-4 flex items-center gap-1 lg:justify-end">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-3 transition hover:text-[var(--acc)] transition:color duration-[0.3s]"
              >
                <GitHubIcon />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-3 transition hover:text-[var(--acc)] transition:color duration-[0.3s]"
              >
                <LinkedInIcon />
              </a>
            </div>
            <p
              data-hero-fade
              className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--mut)]"
            >
              BCA Student • CTET Graduate
            </p>
          </div>
        </div>

        {/* Table of contents */}
        <nav
          data-reveal
          aria-label="Table of contents"
          className="relative z-20 mb-20 grid gap-8 rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surf)_60%,transparent)] p-6 sm:p-8 md:grid-cols-[0.7fr_1.3fr]"
        >
          <div>
            <p className="font-display text-2xl font-medium leading-tight tracking-[-0.03em]">
              Table of
              <br />
              contents
            </p>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-[color:var(--mut)]">
              A quick way into my work, my skills and my background.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 self-center">
            {NAV.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.id);
                  }}
                  className="group flex items-baseline gap-3 border-b border-[var(--line)] pb-2 transition-colors hover:border-[var(--acc)] hover:text-[color:var(--fg)]"
                >
                  <span className="font-mono text-xs leading-none text-[color:var(--acc-t)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{item.label}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee                                                            */
/* ------------------------------------------------------------------ */

function Marquee() {
  const items = useMemo(() => [...new Set(SKILL_GROUPS.flatMap((g) => g.items))], []);
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[var(--line)] py-5 bg-[var(--acc)]" aria-hidden="true">
      <div data-marquee className="flex w-max whitespace-nowrap">
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center font-mono text-xs uppercase tracking-[0.2em] font-medium text-[color:var(--fg)] sm:text-sm"
          >
            {name}
            <span className="px-8 text-[color:color-mix(in_srgb,var(--fg)_70%,transparent)]">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

// Scales a panel's content to the stage height (set as --k by AboutSkills)
const PANEL_SCALE = { transform: "scale(var(--k, 1))" };

/* ------------------------------------------------------------------ */
/*  Tech icons around the About portrait                               */
/*  Drop real logos into src/assets/tech/ named after the tool         */
/*  (php.svg, mysql.png, photoshop.svg, illustrator.svg, react.svg,    */
/*  java.svg, javascript.svg, html.svg, css.svg, laravel.svg, figma.svg) */
/*  and they replace the lettered tiles automatically.                 */
/* ------------------------------------------------------------------ */

const TECH_LOGOS = toAssets(
  import.meta.glob("./assets/tech/*.{png,jpg,jpeg,webp,avif,gif,svg}", { eager: true, query: "?url", import: "default" })
);
const TECH = [
  { name: "PHP", short: "php", bg: "#777BB4", fg: "#fff" },
  { name: "MySQL", short: "SQL", bg: "#00758F", fg: "#fff" },
  { name: "Photoshop", short: "Ps", bg: "#001E36", fg: "#31A8FF" },
  { name: "Illustrator", short: "Ai", bg: "#330000", fg: "#FF9A00" },
  { name: "React", short: "react", bg: "#20232A", fg: "#61DAFB" },
  { name: "Java", short: "Java", bg: "#E76F00", fg: "#fff" },
  { name: "JavaScript", short: "JS", bg: "#F7DF1E", fg: "#222" },
  { name: "HTML", short: "HTML", bg: "#E34F26", fg: "#fff" },
  { name: "CSS", short: "CSS", bg: "#1572B6", fg: "#fff" },
  { name: "Laravel", short: "La", bg: "#FF2D20", fg: "#fff" },
  { name: "Figma", short: "Fg", bg: "#1E1E1E", fg: "#F24E1E" },
];
// Semi-rings behind the portrait (centre and radii as shares of the portrait box). Each tile sits on one ring.
const RINGS = {
  cx: 0.5,
  cy: 0.82,
  radii: [
    { rx: 0.29, ry: 0.4 },
    { rx: 0.44, ry: 0.6 },
    { rx: 0.59, ry: 0.8 },
  ],
};
// which ring each tile rides on, and where along it (degrees, 180 = left end, 270 = top, 360 = right end)
const TECH_SLOTS = [
  [0, 215], [0, 270], [0, 325],
  [1, 195], [1, 240], [1, 300], [1, 345],
  [2, 205], [2, 255], [2, 295], [2, 335],
];


function ReactAtom() {
  return (
    <svg viewBox="-12 -12 24 24" className="h-9 w-9 sm:h-11 sm:w-11" fill="none" stroke="currentColor" strokeWidth="1.1">
      <ellipse rx="10" ry="4" />
      <ellipse rx="10" ry="4" transform="rotate(60)" />
      <ellipse rx="10" ry="4" transform="rotate(120)" />
      <circle r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Flat 2D app tile
function TechTile({ t, i }) {
  const logo = pickAsset(TECH_LOGOS, t.name, t.name);
  return (
    <div
      title={t.name}
      className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl shadow-[0_12px_22px_-10px_rgba(58,15,52,0.5)] sm:h-[4.25rem] sm:w-[4.25rem]"
      style={{ background: logo ? "var(--surf)" : t.bg, color: t.fg }}
    >
      {logo ? (
        <img src={logo} alt={t.name} draggable="false" className="h-3/5 w-3/5 object-contain" />
      ) : t.short === "react" ? (
        <ReactAtom />
      ) : (
        <span className="font-mono text-xl font-semibold tracking-tight sm:text-2xl">{t.short}</span>
      )}
    </div>
  );
}

// The arcs themselves; drawn behind the portrait
function TechRings() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible text-[color:var(--fg)]"
    >
      {RINGS.radii.map((r, k) => (
        <path
          key={k}
          d={`M${(RINGS.cx - r.rx) * 100} ${RINGS.cy * 100} A${r.rx * 100} ${r.ry * 100} 0 0 1 ${(RINGS.cx + r.rx) * 100} ${RINGS.cy * 100}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity={0.24 - k * 0.05}
        />
      ))}
    </svg>
  );
}

// Each tile slides back and forth along its ring as the page scrolls (random-looking, but the same every visit)
const TECH_MOTION = TECH.map((_, i) => {
  const r = (n) => {
    const v = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  return { f: 0.0012 + r(1) * 0.0016, ph: r(2) * 6.28, amp: 12 + r(3) * 14, tilt: (r(4) - 0.5) * 24 };
});

function TechOrbit() {
  const els = useRef([]);
  useEffect(() => {
    const cur = { y: window.scrollY };
    const place = (y) => {
      TECH.forEach((_, i) => {
        const el = els.current[i];
        if (!el) return;
        const [ring, deg] = TECH_SLOTS[i];
        const m = TECH_MOTION[i];
        const d = deg + Math.sin(y * m.f + m.ph) * m.amp;
        const r = RINGS.radii[ring];
        el.style.left = `${(RINGS.cx + r.rx * Math.cos(rad(d))) * 100}%`;
        el.style.top = `${(RINGS.cy + r.ry * Math.sin(rad(d))) * 100}%`;
        el.style.transform = `rotate(${(m.tilt + (d - 270) * 0.35).toFixed(1)}deg)`;
      });
    };
    place(cur.y);
    if (prefersReduced()) return undefined;
    const tick = () => {
      const dy = window.scrollY - cur.y;
      if (Math.abs(dy) < 0.05) return;
      cur.y += dy * 0.1; // ease toward the real scroll position
      place(cur.y);
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {TECH.map((t, i) => (
        <div key={t.name} ref={(el) => (els.current[i] = el)} className="absolute" style={{ marginLeft: -34, marginTop: -34 }}>
          <TechTile t={t} i={i} />
        </div>
      ))}
    </div>
  );
}

// Hand-drawn circle around a word: the pen loop draws itself as the page scrolls from the hero to About
const Mark = ({ children }) => (
  <span className="relative inline-block font-medium text-[color:var(--fg)]">
    {children}
    <svg
      aria-hidden="true"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: '-6px',       // Adjust this to move it up/down
        left: '-10px',     // Adjust this to move it left/right
        width: 'calc(100% + 20px)',   // Adjust width expansion
        height: 'calc(100% + 12px)',  // Adjust height expansion
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <path
        data-mark-path
        pathLength="1"
        d="M9 7C28 -1 78 -1 93 11C103 23 78 38 48 38C18 38 -3 29 4 15C9 6 40 1 74 3"
        fill="none"
        stroke="var(--acc)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </span>
);

function About({ panel = false }) {
  const aboutRef = useRef(null);
  useLayoutEffect(() => {
    if (prefersReduced()) return undefined;
    const ctx = gsap.context(() => {
      const marks = gsap.utils.toArray("[data-mark-path]");
      gsap.set(marks, { strokeDashoffset: 1 });
      gsap.to(marks, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.25,
        scrollTrigger: { trigger: aboutRef.current, start: "top 85%", end: "top 64px", scrub: 0.5 },
      });
    }, aboutRef);
    return () => ctx.revert();
  }, []);

  const highlights = [
    { icon: Terminal, label: "Programming", text: "Java, C#, JavaScript, PHP", bg: "bg-[var(--acc)]", rot: "" },
    { icon: Check, label: "Testing & debugging", text: "Unit tests, local checks", bg: "bg-[var(--bg)]", rot: "" },
    { icon: Cpu, label: "Git & APIs", text: "Branches, issues, API basics", bg: "bg-[var(--bg)]", rot: "" },
    { icon: Layers, label: "UI & Design", text: "UX friendly, Creative, Modern", bg: "bg-[var(--acc)]", rot: "" },
  ];

  return (
    <section
      id="about"
      ref={aboutRef}
      className={panel ? "flex h-full w-1/2 shrink-0 items-center" : "scroll-mt-16 overflow-x-clip py-24 sm:py-32"}
    >
      <div {...(panel ? { "data-fit": "" } : {})} className={panel ? "contents max-lg:flex max-lg:w-full max-lg:flex-col max-lg:items-center" : "contents"}>
        <div className={`mx-auto flex w-full max-w-6xl px-5 sm:px-8 ${panel ? "justify-between" : "flex-col"}`} style={panel ? PANEL_SCALE : undefined}>
          <div className="z-20 max-w-xl lg:col-span-1 ">
            <SectionHeading eyebrow="01 / About" title="Who am I?" compact={panel} />
            <div className="gap-12">
              <div className={`${panel ? "space-y-4 text-base" : "space-y-6 text-lg"} leading-relaxed text-[color:var(--mut)]`}>
                <p data-reveal>
                  I'm a third-year <Mark>BCA student</Mark> who enjoys turning requirements into working software: writing clean logic, testing it locally,
                  handling edge cases, and keeping documentation tidy. My projects span web, mobile, and desktop environments using <Mark>React, C#, Java, and PHP. </Mark>
                </p>
                <p data-reveal>
                  At CreativeLaya, I’ve contributed to technical writing, asset creation, and layout design. Clear code comments, setup instructions,
                  and structured progress updates come naturally to me because I believe maintainability is just as important as writing the initial code.
                </p>
                <p data-reveal>
                  I work well under supervision or in collaborative team setups: using version control properly, tracking issues early, treating reviewer
                  feedback as a tool for growth, and prioritizing security and validation.
                </p>
              </div>

              {/* <div data-stagger className="grid grid-cols-2 gap-5">
            {highlights.map(({ icon: Icon, label, text, bg, rot }) => (
              <div
                key={label}
                className={`${bg} ${rot} rounded-2xl border border-[var(--line)] p-5 transition-colors hover:border-[var(--line3)]`}
              >
                <Icon className="mb-4 h-7 w-7" />
                <p className="font-display text-lg font-medium leading-tight text-[var(--fg)]">{label}</p>
                <p className="mt-1 text-sm ">{text}</p>
              </div>
            ))}
          </div> */}
            </div>


          </div>
        </div>

        {/*About Portrait*/}
        <div data-depth="12" data-about-portrait={panel ? "" : undefined} className={panel ? "absolute inset-x-200 z-100 flex w-[27%] h-fit item-end  justify-center max-lg:relative max-lg:inset-x-auto max-lg:mt-12 max-lg:w-[60%] max-lg:max-w-[22rem] max-sm:hidden" : "relative z-10 mx-auto mt-24 flex h-fit w-[66%] max-w-xs justify-center"}>
          <TechRings />
          <img
            data-hero-portrait
            src={aboutportrait}
            alt="Portrait of Gaurav Pulami"
            width="1191"
            height="922"
            className="h-full w-full  select-none"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, #000 66%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, #000 56%, transparent 100%)",
            }}
          />
          <TechOrbit />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Skill cards: hover to drag a tail of little cards behind the cursor */
/*  Edit the lists below to change what trails behind each card.        */
/* ------------------------------------------------------------------ */

const T_ = (name) => TECH.find((t) => t.name === name);
const SKILL_TRAIL = {
  Programming: () => [T_("PHP"), T_("JavaScript"), T_("Java"), { name: "C#", short: "C#", bg: "#68217A", fg: "#fff" }, T_("React"), T_("Laravel"), T_("MySQL")],
  "Testing & Debugging": () => [
    { name: "Bug", icon: Bug, bg: "#E34F26", fg: "#fff" },
    { name: "Unit tests", icon: FlaskConical, bg: "#16A34A", fg: "#fff" },
    { name: "Checks", icon: ListChecks, bg: "#0EA5E9", fg: "#fff" },
    { name: "Review", icon: ShieldCheck, bg: "#7C3AED", fg: "#fff" },
    { name: "Done", icon: Check, bg: "#EAAA00", fg: "#3A0F34" },
  ],
  "Git & APIs": () => [
    { name: "Git", short: "Git", bg: "#F05032", fg: "#fff" },
    { name: "GitHub", gh: true, bg: "#181717", fg: "#fff" },
    { name: "API", icon: Braces, bg: "#0EA5E9", fg: "#fff" },
    { name: "Branch", icon: GitBranch, bg: "#6366F1", fg: "#fff" },
    { name: "Webhook", icon: Webhook, bg: "#14B8A6", fg: "#fff" },
    T_("MySQL"),
  ],
  "UI & Design": () => DESIGN_ITEMS.slice(0, 8).map((d, i) => ({ name: d.stem, design: d, i })),
};

function TrailFace({ it }) {
  if (it.design) return <DesignFace d={it.design} i={it.i} alt={false} />;
  const logo = it.icon || it.gh ? null : pickAsset(TECH_LOGOS, it.name, it.name);
  return (
    <div className="grid h-full w-full place-items-center" style={{ background: logo ? "var(--surf)" : it.bg, color: it.fg }}>
      {logo ? (
        <img src={logo} alt="" draggable="false" className="h-3/5 w-3/5 object-contain" />
      ) : it.gh ? (
        <GitHubIcon className="h-7 w-7" />
      ) : it.icon ? (
        <it.icon className="h-7 w-7" />
      ) : it.short === "react" ? (
        <ReactAtom />
      ) : (
        <span className="font-mono text-sm font-semibold">{it.short}</span>
      )}
    </div>
  );
}

const TRAIL_LEN = 7;

function SkillCard({ group, panel }) {
  const { title, icon: Icon, blurb, tone, items } = group;
  const cardRef = useRef(null);
  const els = useRef([]);
  const st = useRef({ on: false, tx: 0, ty: 0, pts: [], tick: null });
  const trailItems = useMemo(() => (SKILL_TRAIL[title] ? SKILL_TRAIL[title]().filter(Boolean) : []), [title]);

  const stop = () => {
    const s = st.current;
    if (s.tick) gsap.ticker.remove(s.tick);
    s.tick = null;
  };
  useEffect(() => stop, []);


  const local = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const k = r.width / cardRef.current.offsetWidth || 1; // the panel may be scaled
    return { x: (e.clientX - r.left) / k, y: (e.clientY - r.top) / k };
  };

  const enter = (e) => {
    if (e.pointerType === "touch" || prefersReduced() || !trailItems.length) return;
    const s = st.current;
    const p = local(e);
    s.on = true;
    s.tx = p.x;
    s.ty = p.y;
    s.pts = Array.from({ length: TRAIL_LEN }, () => ({ x: p.x, y: p.y, r: 0 }));
    els.current.forEach((el) => el && gsap.to(el, { opacity: 1, duration: 0.25, overwrite: true }));
    if (!s.tick) {
      s.tick = () => {
        let prev = { x: s.tx, y: s.ty };
        s.pts.forEach((pt, k) => {
          const f = k === 0 ? 0.28 : 0.2;
          const vx = (prev.x - pt.x) * f;
          pt.x += vx;
          pt.y += (prev.y - pt.y) * f;
          pt.r += (Math.max(-28, Math.min(28, vx * 2.2)) - pt.r) * 0.2;
          const el = els.current[k];
          if (el) {
            const sc = 1 - k * 0.09;
            el.style.transform = `translate(${pt.x.toFixed(1)}px,${pt.y.toFixed(1)}px) translate(-50%,-50%) rotate(${pt.r.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
            el.style.zIndex = String(TRAIL_LEN - k);
          }
          prev = pt;
        });
      };
      gsap.ticker.add(s.tick);
    }
  };
  const move = (e) => {
    const s = st.current;
    if (!s.on) return;
    const p = local(e);
    s.tx = p.x;
    s.ty = p.y;
  };
  const leave = () => {
    const s = st.current;
    s.on = false;
    els.current.forEach((el) => el && gsap.to(el, { opacity: 0, duration: 0.35, overwrite: true }));
    gsap.delayedCall(0.4, () => {
      if (!st.current.on) stop();
    });
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`${tone} relative rounded-2xl border border-[var(--line)] p-6 text-[color:var(--fg)] transition-colors hover:border-[var(--line3)] ${panel ? "sm:p-6" : "sm:p-8"}`}
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line2)] text-[color:var(--acc-t)]">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-xl font-medium leading-tight">{title}</h3>
          <p className="text-sm text-[color:var(--mut)]">{blurb}</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="cursor-default rounded-full border border-[var(--line2)] px-3 py-1.5 font-mono text-xs text-[color:var(--mut2)] transition-colors hover:border-[color-mix(in_srgb,var(--acc)_60%,transparent)] hover:text-[color:var(--fg)]"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* the tail: little cards that chase the cursor, each a bit slower and smaller than the one before */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-2xl">
        {Array.from({ length: TRAIL_LEN }, (_, k) => (
          <div
            key={k}
            ref={(el) => (els.current[k] = el)}
            className="absolute left-0 top-0 h-[4.5rem] w-14 overflow-hidden rounded-xl shadow-[0_14px_24px_-10px_rgba(0,0,0,0.5)]"
            style={{ opacity: 0, willChange: "transform", filter: `brightness(${1 - k * 0.05})` }}
          >
            {trailItems.length > 0 && <TrailFace it={trailItems[k % trailItems.length]} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Fireflies drifting around the Skills section (CSS-only motion; each one gets its own path, speed and glow rhythm) */
const FIREFLIES = Array.from({ length: 28 }, (_, i) => {
  const r = (n) => {
    const v = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  const d = (n, range) => `${Math.round((r(n) - 0.5) * range)}px`;
  return {
    left: `${Math.round(r(1) * 96)}%`,
    top: `${Math.round(r(2) * 94)}%`,
    size: 3 + Math.round(r(3) * 4),
    style: {
      "--x1": d(4, 220), "--y1": d(5, 160),
      "--x2": d(6, 260), "--y2": d(7, 200),
      "--x3": d(8, 220), "--y3": d(9, 160),
      "--fd": `${(14 + r(10) * 16).toFixed(1)}s`,
      "--gd": `${(2.2 + r(11) * 3).toFixed(1)}s`,
      "--fl": `${(-r(12) * 20).toFixed(1)}s`,
    },
  };
});

function Fireflies() {
  return (
    <div aria-hidden="true" className="gp-flies pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {FIREFLIES.map((f, i) => (
        <span key={i} className="gp-fly" style={{ left: f.left, top: f.top, width: f.size, height: f.size, ...f.style }} />
      ))}
    </div>
  );
}

function Skills({ panel = false }) {
  return (
    <section
      id="skills"
      className={
        panel
          ? "gp-dark relative flex h-full w-1/2 shrink-0 items-center overflow-hidden"
          : "gp-dark relative scroll-mt-16 overflow-hidden bg-[var(--bg)] py-24 sm:py-32"
      }
    >
      <Fireflies />
      <div {...(panel ? { "data-fit": "" } : {})} className="mx-auto w-full max-w-6xl px-5 sm:px-8" style={panel ? PANEL_SCALE : undefined}>
        <SectionHeading eyebrow="02 / Skills" title="What do I bring to the table?" dark hs={panel} compact={panel}>
          Programming, Git, unit testing, debugging, API basics and documentation: the everyday skills of a Creative Developer.
        </SectionHeading>

        <div {...(panel ? { "data-hstagger": "" } : { "data-stagger": "" })} className="grid gap-6 sm:grid-cols-2">
          {SKILL_GROUPS.map((g) => (
            <SkillCard key={g.title} group={g} panel={panel} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Project cards: logo + stack by default, click to open the full card */
/* ------------------------------------------------------------------ */

function ProjectLogo({ p, className = "" }) {
  if (p.logoUrl) {
    return <img src={p.logoUrl} alt={`${p.title} logo`} draggable="false" className={`object-contain ${className}`} />;
  }
  // No logo file found for this project: show a monogram so the card never looks broken
  return (
    <span className={`font-display text-4xl font-semibold tracking-tight text-[color:var(--fg)] ${className}`}>
      {p.title
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()}
    </span>
  );
}

// Default (collapsed) card face: the logo, the stack and a "view" button
function ProjectFace({ p, onOpen, className = "" }) {
  const extra = p.stack.length - 3;
  return (
    <div
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`Open ${p.title}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`group flex cursor-pointer flex-col rounded-2xl border border-[var(--line)] bg-[var(--surf)] p-4 text-[color:var(--fg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc)] ${className}`}
    >
      <div className="grid min-h-0 flex-1 place-items-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4">
        <ProjectLogo p={p} className="h-full w-[85%]" />
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 3).map((t) => (
          <li key={t} className="border border-[var(--line2)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--mut2)]">
            {t}
          </li>
        ))}
        {extra > 0 && (
          <li className="px-1 py-0.5 font-mono text-[10px] text-[color:var(--mut)]">+{extra}</li>
        )}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--line)] pt-2.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors group-hover:text-[color:var(--acc-t)]">
        <span>View</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}

// Expanded card: centred on screen with the demo video, description, stack and the GitHub link
function ProjectModal({ p, onClose }) {
  const backRef = useRef(null);
  const cardRef = useRef(null);
  const closing = useRef(false);
  const isMotion = !prefersReduced();
  const isGif = p.videoUrl && /\.(gif|webp)(\?|$)/i.test(p.videoUrl);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    if (!isMotion) return onClose();
    gsap.to(cardRef.current, { y: 24, scale: 0.95, opacity: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(backRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  };

  useLayoutEffect(() => {
    if (!isMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(backRef.current, { opacity: 0, duration: 0.3 });
      gsap.from(cardRef.current, { y: 40, scale: 0.92, opacity: 0, duration: 0.5, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const back = backRef.current;
    const onKey = (e) => e.key === "Escape" && close();
    // keep the page from scrolling behind the open card
    const stop = (e) => {
      if (!cardRef.current.contains(e.target)) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    back.addEventListener("wheel", stop, { passive: false });
    back.addEventListener("touchmove", stop, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      back.removeEventListener("wheel", stop);
      back.removeEventListener("touchmove", stop);
    };
  }, []);

  const modal = (
    <div
      ref={backRef}
      onMouseDown={(e) => e.target === e.currentTarget && close()}
      className="fixed inset-0 z-[90] grid place-items-center bg-[#DDE3EB]/2  5 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-y-auto overscroll-contain rounded-3xl border border-[var(--line2)] bg-[var(--surf)] p-5 text-[color:var(--fg)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] sm:p-7"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--mut)]">
              {FILTERS.find((f) => f.id === p.category)?.label}
            </p>
            <h3 className="mt-1 font-display text-2xl font-medium tracking-tight sm:text-3xl">{p.title}</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-28 place-items-center overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg)] p-2 sm:h-16 sm:w-36">
              <ProjectLogo p={p} className="h-full w-full text-2xl" />
            </div>
            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label="Close"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line2)] transition hover:border-[var(--line3)] hover:bg-[var(--tint)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg)]">
          {p.videoUrl ? (
            isGif ? (
              <img src={p.videoUrl} alt={`${p.title} preview`} className="h-full w-full object-cover" />
            ) : (
              <video
                src={p.videoUrl}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            )
          ) : (
            <div className="grid h-full w-full place-items-center text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--mut)]">
              <span>
                <Sparkles className="mx-auto mb-2 h-5 w-5" />
                Video preview coming soon
              </span>
            </div>
          )}
        </div>

        <div className="mt-5 rounded-2xl border border-[var(--line)] p-4 sm:p-5">
          <p className="text-sm leading-relaxed text-[color:var(--mut2)] sm:text-base">{p.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="border border-[var(--line2)] px-2 py-1 font-mono text-[11px] text-[color:var(--mut2)]">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex items-center gap-6 border-t-2 border-[var(--line)] pt-4">
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            <GitHubIcon className="h-5 w-5" /> Code
          </a>
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
          <ArrowUpRight className="ml-auto h-6 w-6" />
        </div>
      </div>
    </div>
  );

  // Portal into the themed root so it sits above the nav and keeps the colour variables
  return createPortal(modal, document.querySelector(".gp-root") || document.body);
}

/* ------------------------------------------------------------------ */
/*  Projects — collage                                                 */
/* ------------------------------------------------------------------ */

function ProjectsGrid({ filter, setFilter, onOpen }) {
  const gridRef = useRef(null);

  const visible = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  const count = (id) =>
    id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === id).length;

  // Tilt each card into place, then animate the collage in (on scroll, and on every filter change)
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".gp-card");
      gsap.set(cards, { rotation: (i, el) => Number(el.dataset.rot), zIndex: 1 });
      if (prefersReduced()) return;

      gsap.set(cards, { opacity: 0, y: 70, scale: 0.9 });
      const play = () =>
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.3)",
        });

      if (grid.getBoundingClientRect().top < window.innerHeight * 0.85) {
        play();
      } else {
        ScrollTrigger.create({ trigger: grid, start: "top 85%", once: true, onEnter: play });
      }
    }, gridRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [filter]);

  const tiltIn = (e) =>
    gsap.to(e.currentTarget, {
      rotation: 0,
      scale: 1.03,
      zIndex: 20,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });

  const tiltOut = (e) =>
    gsap.to(e.currentTarget, {
      rotation: Number(e.currentTarget.dataset.rot),
      scale: 1,
      zIndex: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeading eyebrow="03 / Projects" title="Tested work, pinned up.">
        Web, mobile and .NET work, plus testing and documentation samples. Filter the board by category.
      </SectionHeading>

      <div data-reveal className="mb-14 flex flex-wrap gap-3" role="tablist" aria-label="Project categories">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter === f.id
              ? "border-[var(--fg)] bg-[var(--fg)] text-[color:var(--bg)]"
              : "border-[var(--line2)] text-[color:var(--mut2)] hover:border-[var(--line3)] hover:text-[color:var(--fg)]"
              }`}
          >
            {f.label}
            <span className="ml-2 font-mono text-xs opacity-60">{count(f.id)}</span>
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
        {visible.map((p, i) => {
          const pat = PATTERNS[i % PATTERNS.length];
          return (
            <article
              key={`${filter}-${p.title}`}
              data-rot={pat.rot}
              onMouseEnter={tiltIn}
              onMouseLeave={tiltOut}
              className={`gp-card relative ${pat.span} ${pat.offset}`}
            >
              <ProjectFace p={p} onOpen={() => onOpen(PROJECTS.indexOf(p))} className="h-[300px] sm:h-[340px]" />
            </article>
          );
        })}
      </div>

      <div data-reveal className="mt-16">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm font-medium underline decoration-2 underline-offset-8 transition hover:text-[color:var(--acc-t)]"
        >
          See everything on GitHub <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  About + Skills: one pinned section that scrolls sideways            */
/*  About fills the screen, then pins; scrolling slides Skills in.      */
/* ------------------------------------------------------------------ */

// Vertical scroll spent on the sideways move, as a multiple of the screen width (lower = faster)
const HSCROLL = { length: 2 };
const HS_QUERY = "(min-height: 420px)";

function useHScrollMode() {
  const get = () =>
    typeof window !== "undefined" && window.matchMedia(HS_QUERY).matches && !prefersReduced();
  const [on, setOn] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(HS_QUERY);
    const h = () => setOn(get());
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return on;
}

function AboutSkills() {
  const on = useHScrollMode();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    if (!on) return undefined;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;

    // Section height = one stage + the sideways travel, so the pin lasts exactly as long as the move
    const size = () => {
      section.style.height = `${stage.offsetHeight + stage.clientWidth * HSCROLL.length}px`;
      const phone = stage.clientWidth < 1024;
      stage.style.setProperty("--k", phone ? "1" : String(Math.min(1, Math.max(0.6, stage.offsetHeight / 720))));
      // Phone: each panel is laid out as a column, then shrunk to fit the screen height
      track.querySelectorAll("[data-fit]").forEach((el) => {
        el.style.transform = "";
        el.style.width = "";
        el.style.flex = "";
        el.style.transformOrigin = "";
        if (!phone) return;
        el.style.flex = "none";
        // Lay the panel out at (screen width / k) wide, so scaling it by k fills the width; take the largest k whose height fits
        const avail = stage.offsetHeight - 76;
        let k = 1;
        for (; k > 0.45; k -= 0.025) {
          el.style.width = `${stage.clientWidth / k}px`;
          if (el.offsetHeight * k <= avail) break;
        }
        el.style.transformOrigin = "0 50%";
        el.style.transform = `scale(${k.toFixed(3)})`;
      });
    };
    size();

    const ctx = gsap.context(() => {
      const st = {
        trigger: section,
        start: "top top+=64",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      };
      const move = gsap.to(track, { xPercent: -50, ease: "none", scrollTrigger: st });
      gsap.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });

      // About portrait slides out to the left as About is passed, and back in when scrolling up
      const portrait = track.querySelector("[data-about-portrait]");
      if (portrait) {
        gsap.fromTo(
          portrait,
          { xPercent: 30 },
          {
            xPercent: () => (portrait.offsetWidth ? -((portrait.offsetLeft + portrait.offsetWidth + 4) / portrait.offsetWidth) : 0),
            ease: "none",
            scrollTrigger: { ...st, end: () => "+=" + Math.round(stage.clientWidth * HSCROLL.length) },
          }
        );
      }
      gsap.fromTo(stage, { backgroundPositionX: "0%" }, { backgroundPositionX: "100%", ease: "none", scrollTrigger: st });

      // Skills content reveals as the panel slides into view (horizontal trigger)
      const sk = track.querySelector("#skills");
      const trig = {
        trigger: sk,
        containerAnimation: move,
        start: "left 70%",
        toggleActions: "play none none none",
      };
      gsap.from(sk.querySelectorAll(".gp-word"), {
        yPercent: 115,
        duration: 0.9,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: trig,
      });
      gsap.from(sk.querySelectorAll("[data-hreveal]"), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: trig,
      });
      gsap.from(sk.querySelectorAll("[data-hstagger] > *"), {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: trig,
      });

    }, section);

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => { size(); ScrollTrigger.refresh(); }) : null;
    ro?.observe(stage);

    return () => {
      ro?.disconnect();
      ctx.revert();
      section.style.height = "";
    };
  }, [on]);

  if (!on) {
    return (
      <>
        <About />
        <Skills />
      </>
    );
  }

  return (
    <section ref={sectionRef} id="about-skills" className="relative">
      <div
        ref={stageRef}
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden"
        style={{
          // Gradient backdrop: solid ice at the start, solid aubergine at the end, blending as you scroll sideways
          backgroundImage: "linear-gradient(90deg, #DDE3EB 0%, #DDE3EB 33.3%, #3A0F34 66.6%, #3A0F34 100%)",
          backgroundSize: "300% 100%",
          backgroundPosition: "0% 0%",
        }}
      >
        <div ref={trackRef} className="flex h-full w-[200%] will-change-transform">
          <About panel />
          <Skills panel />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-4 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-2 flex justify-between font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[color:var(--acc-t)]">
              <span>01 About</span>
              <span>02 Skills</span>
            </div>
            <div className="h-[3px] bg-[var(--line2)]">
              <div ref={barRef} className="h-full origin-left bg-[var(--acc)]" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/*  Projects: pinned scroll scene                                       */
/*  titles + pen  ->  cards orbit the pen  ->  pen flies to the title   */
/*  while the ring opens into an arc with an arched filter bar          */
/* ------------------------------------------------------------------ */

/* Swap src/assets/fountain-pen.svg (or point penImg at your own PNG) to change the pen. Nib must point down. */
const penBridge = { start: null, arcPen: null }; // the UI & Designs section picks the pen up where Projects leaves it
const PEN = { w: 94, h: 600 }; // rendered size of the pen at scale 1
const SCENE = {
  start: 0.2, // share of the scroll where cards appear and start orbiting the pen
  morph: 0.7, // share where the pen flies to the title and the ring opens into an arc
  done: 0.92, // everything has settled; the remaining scroll holds the final layout
  spin: 180, // degrees the ring travels between start and done
  reveal: 0.04, // the last project has appeared this far before `morph`; earlier ones are spaced evenly from `start`
  step: 33, // degrees between neighbouring cards on the final arc
  pillStep: 33, // degrees between filter pills on the inner arc
};
const JITTER = [-2, 1.5, -1, 2, -1.5, 1];
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rad = (d) => (d * Math.PI) / 180;
const sceneEase = gsap.parseEase("power2.inOut");
const sceneOut = gsap.parseEase("power3.out");

const ARC_QUERY = "(min-height: 420px)";
function useArcMode() {
  const get = () =>
    typeof window !== "undefined" && window.matchMedia(ARC_QUERY).matches && !prefersReduced();
  const [on, setOn] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(ARC_QUERY);
    const h = () => setOn(get());
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return on;
}

function ArcStage({ filter, setFilter, visible, onOpen }) {
  const stageRef = useRef(null);
  const penRef = useRef(null);
  const ringRef = useRef(null);
  const endRef = useRef(null);
  const titleRef = useRef(null);
  const hintRef = useRef(null);
  const countRef = useRef(null);
  const cardEls = useRef([]);
  const pillEls = useRef([]);
  const renderRef = useRef(() => { });
  const S = useRef({
    p: 0,
    target: 0,
    W: 1200,
    H: 700,
    nF: PROJECTS.length,
    titleEnd: { x: 320, y: 140 },
    cards: PROJECTS.map((_, i) => ({ slot: i, vis: 1 })),
  });

  const count = (id) =>
    id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === id).length;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const section = stage.parentElement;
    const s = S.current;

    const measure = () => {
      const r = stage.getBoundingClientRect();
      s.W = r.width;
      s.H = r.height;
      // Measure the title at its resting place (top of the stage), without the scroll transform
      gsap.set(titleRef.current, { x: 0, y: 0, scale: 1 });
      const hr = titleRef.current.getBoundingClientRect();
      const e = endRef.current.getBoundingClientRect();
      s.titleEnd = { x: e.left - r.left, y: e.bottom - r.top };
      // A title that wraps onto several lines: use its widest line so the big centred start fits the screen
      const rg = document.createRange();
      rg.selectNodeContents(titleRef.current);
      const tw = rg.getBoundingClientRect();
      s.title = { left: hr.left - r.left, top: hr.top - r.top, w: Math.max(e.left - hr.left, tw.width, 1), h: hr.height };
      penBridge.start = { x: s.titleEnd.x + 10, y: s.titleEnd.y + 2, left: r.left };
      penBridge.arcPen = penRef.current;
    };

    // Lays out every moving part for the current scroll progress s.p (0..1)
    const render = () => {
      const { W, H, p, nF } = s;
      const narrow = W < 640; // phone: same scene, smaller cards and a tighter fan
      const fit = narrow ? Math.min(0.6, Math.max(0.42, W / 760)) : Math.min(1.05, Math.max(0.72, W / 1440));
      const P0 = { x: W / 2, y: H * 0.58 }; // pen centre before it moves
      const AC = { x: W / 2, y: H * 0.82 }; // centre of the final arc
      const AR = { x: narrow ? W * 0.34 : Math.min(W * 0.385, 600), y: H * 0.42 }; // final arc radii
      const OR = { x: Math.min(W * 0.26, 400), y: H * 0.24 }; // orbit radii around the pen

      const a = sceneOut(clamp01((p - SCENE.start) / 0.12));
      const q = sceneEase(clamp01((p - SCENE.start) / (SCENE.done - SCENE.start)));
      const u = sceneEase(clamp01((p - SCENE.morph) / (SCENE.done - SCENE.morph)));
      const spin = SCENE.spin * (1 - q);
      const cx = lerp(P0.x, AC.x, u);
      const cy = lerp(P0.y, AC.y, u);
      const rx = lerp(OR.x, AR.x, u) * a;
      const ry = lerp(OR.y, AR.y, u) * a;
      const step = lerp(360 / Math.max(nF, 1), narrow ? 28 : SCENE.step, u);

      // Title: starts big and centred behind the pen, then glides up to its place at the top
      const T = s.title;
      if (T && titleRef.current) {
        const tt = sceneEase(clamp01(p / SCENE.start));
        const k0 = Math.min(1.7, (W * 0.86) / T.w);
        gsap.set(titleRef.current, {
          x: lerp((W - T.w * k0) / 2 - T.left, 0, tt),
          y: lerp(H * 0.47 - (T.h * k0) / 2 - T.top, 0, tt),
          scale: lerp(k0, 1, tt),
        });
      }

      // Project cards: one ring that spins, then opens into an arc
      s.cards.forEach((c, i) => {
        const el = cardEls.current[i];
        if (!el) return;
        const th = 90 + spin + ((nF - 1) / 2 - c.slot) * step;
        const depth = -Math.sin(rad(th)); // 1 = front of the ring, -1 = back
        // Cards appear one by one as you scroll: each flies out from the pen onto the ring
        const gap = (SCENE.morph - SCENE.reveal - SCENE.start) / PROJECTS.length;
        const ei = sceneOut(clamp01((p - (SCENE.start + i * gap)) / (gap * 1.1)));
        const rr = 0.35 + 0.65 * ei;
        gsap.set(el, {
          x: cx + rx * rr * Math.cos(rad(th)),
          y: cy - ry * rr * Math.sin(rad(th)),
          xPercent: -50,
          yPercent: -50,
          rotation: JITTER[i % JITTER.length] + (90 - th) * lerp(0.07, 0.16, u),
          scale: fit * lerp(1, 0.92, u) * (0.35 + 0.65 * a * ei) * (0.6 + 0.4 * c.vis) * (1 + 0.1 * depth * (1 - u)),
          autoAlpha: a * ei * c.vis,
          zIndex: u < 0.55 ? (depth > 0 ? 40 : 10) : 20 + Math.round(c.slot),
          pointerEvents: u > 0.97 && c.vis > 0.5 ? "auto" : "none",
        });
      });

      // Dotted orbit guide
      const ring = ringRef.current;
      if (ring) {
        ring.setAttribute("cx", cx);
        ring.setAttribute("cy", cy);
        ring.setAttribute("rx", Math.max(rx, 0.1));
        ring.setAttribute("ry", Math.max(ry, 0.1));
        ring.style.opacity = String(0.35 * a * (1 - u));
        ring.style.strokeDashoffset = String(spin * 0.8);
      }

      // Pen: sits in the middle, then flies up to the end of the title and shrinks
      const penH = Math.min(H * 0.62, 560);
      const r0 = 32;
      const nib0 = {
        x: P0.x - Math.sin(rad(r0)) * (penH / 2),
        y: P0.y + Math.cos(rad(r0)) * (penH / 2),
      };
      const nib1 = { x: s.titleEnd.x + 10, y: s.titleEnd.y + 2 };
      gsap.set(penRef.current, {
        x: lerp(nib0.x, nib1.x, u),
        y: lerp(nib0.y, nib1.y, u),
        scale: lerp(penH / PEN.h, 0.22, u),
        rotation: lerp(r0, 42, u) + Math.sin(p * 30) * 3 * (1 - u),
      });

      // Filter pills on an arc inside the card arc
      const pv = clamp01((p - 0.86) / 0.11);
      const rxf = AR.x * (narrow ? 0.85 : 0.4);
      const ryf = AR.y * (narrow ? 0.3 : 0.4);
      FILTERS.forEach((_, j) => {
        const el = pillEls.current[j];
        if (!el) return;
        const t = clamp01(pv * 1.7 - j * 0.1);
        const th = 90 + ((FILTERS.length - 1) / 2 - j) * (narrow ? 38 : SCENE.pillStep);
        const rr = 0.75 + 0.25 * sceneOut(t);
        gsap.set(el, {
          x: AC.x + rxf * Math.cos(rad(th)) * rr,
          y: AC.y - ryf * Math.sin(rad(th)) * rr,
          xPercent: -50,
          yPercent: -50,
          rotation: (90 - th) * 0.7,
          scale: fit * (narrow ? 1.25 : 1) * (0.6 + 0.4 * t),
          autoAlpha: t,
          pointerEvents: t > 0.9 ? "auto" : "none",
        });
      });
      if (countRef.current) {
        gsap.set(countRef.current, {
          x: AC.x,
          y: AC.y - 34 * fit,
          xPercent: -50,
          yPercent: -50,
          autoAlpha: pv,
        });
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - clamp01(p / 0.1));
    };
    renderRef.current = render;

    const ctx = gsap.context(() => {
      gsap.set(penRef.current, { xPercent: -50, yPercent: -100, transformOrigin: "50% 100%" });
      gsap.set(titleRef.current, { transformOrigin: "0 0" });
      measure();

      const trig = ScrollTrigger.create({
        trigger: section,
        start: "top top+=64",
        end: "bottom bottom",
        onUpdate: (self) => {
          s.target = self.progress;
        },
        onRefresh: (self) => {
          s.target = s.p = self.progress;
          render();
        },
      });
      s.target = s.p = trig.progress;
      render();

      // Title words and pen fade in as the section arrives
      const intro = { trigger: section, start: "top 75%", once: true };
      gsap.from(stage.querySelectorAll(".gp-word"), {
        yPercent: 115,
        duration: 0.9,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: intro,
      });
      gsap.from(stage.querySelectorAll("[data-intro]"), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: intro,
      });
      gsap.from(penRef.current, { opacity: 0, duration: 1, delay: 0.2, scrollTrigger: intro });
    }, stage);

    // Smooth the scroll value a little so the scene glides instead of snapping
    const tick = () => {
      const d = s.target - s.p;
      if (Math.abs(d) > 0.0002) {
        s.p += d * 0.14;
        render();
      }
    };
    gsap.ticker.add(tick);

    const remeasure = () => {
      measure();
      render();
    };
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(remeasure) : null;
    ro?.observe(stage);
    document.fonts?.ready.then(remeasure);

    return () => {
      gsap.ticker.remove(tick);
      ro?.disconnect();
      ctx.revert();
    };
  }, []);

  // Filter change: cards glide to their new slots on the arc, hidden ones fade out
  useEffect(() => {
    const s = S.current;
    const keep = PROJECTS.map((p) => filter === "all" || p.category === filter);
    const tl = gsap.timeline({
      defaults: { duration: 0.75, ease: "power3.inOut", onUpdate: () => renderRef.current() },
    });
    tl.to(s, { nF: keep.filter(Boolean).length }, 0);
    let k = 0;
    PROJECTS.forEach((_, i) => {
      tl.to(s.cards[i], keep[i] ? { slot: k++, vis: 1 } : { vis: 0 }, 0);
    });
    return () => {
      tl.kill();
    };
  }, [filter]);

  return (
    <div ref={stageRef} className="sticky top-16 z-10 h-[calc(100svh-4rem)] overflow-hidden">
      <div className="pointer-events-none relative z-20 mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <p
          data-intro
          className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--mut)]"
        >
          03 / Projects
        </p>
        <h2 ref={titleRef} className="font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          <Words parts={[" What have I done so far?"]} />
          <span ref={endRef} aria-hidden="true" className="inline-block h-[0.1em] w-0 align-baseline" />
        </h2>
      </div>

      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
        <ellipse
          ref={ringRef}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 9"
          strokeLinecap="round"
          style={{ opacity: 0 }}
        />
      </svg>

      <img
        ref={penRef}
        src={penImg}
        alt=""
        width={PEN.w}
        height={PEN.h}
        draggable="false"
        className="pointer-events-none absolute left-0 top-0 z-[25] select-none"
        style={{
          width: PEN.w,
          height: PEN.h,
          maxWidth: "none",
          filter: "drop-shadow(0 18px 22px rgba(58,15,52,0.3))",
        }}
      />

      {PROJECTS.map((p, i) => (
        <article
          key={p.title}
          ref={(el) => (cardEls.current[i] = el)}
          className="invisible absolute left-0 top-0 h-[234px] w-[260px] will-change-transform"
        >
          <ProjectFace
            p={p}
            onOpen={() => onOpen(i)}
            className="h-full shadow-[0_24px_40px_-24px_rgba(58,15,52,0.5)] transition-transform duration-300 hover:scale-[1.06]"
          />
        </article>
      ))}

      <div role="tablist" aria-label="Project categories" className="pointer-events-none absolute inset-0 z-[45]">
        {FILTERS.map((f, j) => (
          <button
            key={f.id}
            ref={(el) => (pillEls.current[j] = el)}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`invisible absolute left-0 top-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter === f.id
              ? "border-[var(--fg)] bg-[var(--fg)] text-[color:var(--bg)]"
              : "border-[var(--line2)] text-[color:var(--mut2)] hover:border-[var(--line3)] hover:text-[color:var(--fg)]"
              }`}
          >
            {f.label}
            <span className="ml-2 font-mono text-xs opacity-60">{count(f.id)}</span>
          </button>
        ))}
      </div>

      <p
        ref={countRef}
        className=" invisible absolute left-0 top-0 z-[44] text-[16px]  text-[color:var(--fg)]"
      >
        {/* {visible.length} {visible.length === 1 ? "project" : "projects"} */}

        <a href={PROFILE.profile} target="_blank" rel="noopener noreferer" className="hover:text-[var(--acc)] transition:color duration-[0.3s]"><span className="font-semibold flex items-center gap-2">Github Profile <ArrowUpRight /></span></a>
      </p>

      <div
        ref={hintRef}
        className="pointer-events-none absolute bottom-5 left-1/2 z-30 -translate-x-1/2 text-center font-mono text-[11px] uppercase tracking-[0.3em]"
      >
        Scroll
        <ArrowDown className="mx-auto mt-2 h-4 w-4 animate-bounce" />
      </div>
    </div >
  );
}

function Projects() {
  const arc = useArcMode();
  const [filter, setFilter] = useState("all");
  const [openIdx, setOpenIdx] = useState(null);
  const visible = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  // One persistent <section> so the nav's scroll-spy keeps pointing at it when the layout switches
  return (
    <section id="projects" className={arc ? "relative h-[440vh]" : "scroll-mt-16 py-24 sm:py-32"}>
      {arc ? (
        <ArcStage filter={filter} setFilter={setFilter} visible={visible} onOpen={setOpenIdx} />
      ) : (
        <ProjectsGrid filter={filter} setFilter={setFilter} onOpen={setOpenIdx} />
      )}
      {openIdx !== null && <ProjectModal key={openIdx} p={PROJECTS[openIdx]} onClose={() => setOpenIdx(null)} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  UI & Designs: title behind the pen, both move up, then the designs  */
/*  travel left to right; the one in the middle is big and sharp        */
/* ------------------------------------------------------------------ */

const DESIGN = {
  perCard: 28, // vh of scroll spent per design (lower = faster)
  lead: 70, // vh of scroll for the title + pen to move up before the row starts sliding
  intro: 0.2, // share of the scroll used by that title / pen move
  aspect: 0.76, // card width / height
  gap: 0.04, // space between cards, as a share of the card width
};

const DESIGN_ITEMS = DESIGN_FILES.length
  ? DESIGN_FILES
  : Array.from({ length: 8 }, (_, i) => ({ url: null, stem: `Design ${i + 1}` }));
const PLACEHOLDER_BG = [
  "linear-gradient(135deg,#3A0F34,#6b2a62)",
  "linear-gradient(135deg,#EAAA00,#f3cf63)",
  "linear-gradient(135deg,#a99bb0,#DDE3EB)",
  "linear-gradient(135deg,#4a1b43,#EAAA00)",
];

function DesignFace({ d, i, alt }) {
  if (d.url) {
    return <img src={d.url} alt={alt ? d.stem : ""} draggable="false" className="h-full w-full object-fit" />;
  }
  return (
    <div
      className="grid h-full w-full place-items-center font-display text-3xl font-semibold text-[#DDE3EB]"
      style={{ background: PLACEHOLDER_BG[i % PLACEHOLDER_BG.length] }}
    >
      {String(i + 1).padStart(2, "0")}
    </div>
  );
}

// Linear lookup in a table indexed by slot distance (0, 1, 2, ...)
const slotAt = (table, d) => {
  const f = Math.min(Math.max(d, 0), table.length - 1);
  const k = Math.min(Math.floor(f), table.length - 2);
  return lerp(table[k], table[k + 1], f - k);
};

function DesignsStage() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const penRef = useRef(null);
  const titleRef = useRef(null);
  const endRef = useRef(null);
  const cardEls = useRef([]);
  const N = DESIGN_ITEMS.length;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    const s = { p: 0, target: 0, W: 1200, H: 700, titleEnd: { x: 320, y: 140 }, title: null, dirty: true };

    const measure = () => {
      const r = stage.getBoundingClientRect();
      s.W = r.width;
      s.H = r.height;
      // Phone: slimmer cards so the next design peeks in beside the front one
      const dh = s.W < 640 ? Math.min((s.W * 0.62) / DESIGN.aspect, s.H * 0.52) : Math.min(Math.max(s.H * 0.52, 220), 460);
      stage.style.setProperty("--dw", `${dh * DESIGN.aspect}px`);
      stage.style.setProperty("--dh", `${dh}px`);
      s.dh = dh;
      s.dw = dh * DESIGN.aspect;
      // Measure the title at its resting place (top of the stage), without the scroll transform
      gsap.set(titleRef.current, { x: 0, y: 0, scale: 1 });
      const hr = titleRef.current.getBoundingClientRect();
      const e = endRef.current.getBoundingClientRect();
      s.titleEnd = { x: e.left - r.left, y: e.bottom - r.top };
      s.title = { left: hr.left - r.left, top: hr.top - r.top, w: Math.max(e.left - hr.left, 1), h: hr.height };
      s.dirty = true;
    };

    const render = () => {
      const { W, H, p } = s;
      // 1. Title starts big and centred behind the pen; both then move up to their place beside each other
      const tt = sceneEase(clamp01(p / DESIGN.intro));
      const T = s.title;
      if (T) {
        const k0 = Math.min(1.7, (W * 0.86) / T.w);
        gsap.set(titleRef.current, {
          x: lerp((W - T.w * k0) / 2 - T.left, 0, tt),
          y: lerp(H * 0.47 - (T.h * k0) / 2 - T.top, 0, tt),
          scale: lerp(k0, 1, tt),
        });
      }
      const P0 = { x: W / 2, y: H * 0.58 };
      const penH = Math.min(H * 0.62, 560);
      const r0 = 32;
      const nib0 = { x: P0.x - Math.sin(rad(r0)) * (penH / 2), y: P0.y + Math.cos(rad(r0)) * (penH / 2) };
      const nib1 = { x: s.titleEnd.x + 10, y: s.titleEnd.y + 2 };
      // The pen itself is one fixed element shared with Projects; renderPen() places it from this pose
      s.pose = {
        x: lerp(nib0.x, nib1.x, tt),
        y: lerp(nib0.y, nib1.y, tt),
        scale: lerp(penH / PEN.h, 0.22, tt),
        rot: lerp(r0, 42, tt) + Math.sin(p * 30) * 3 * (1 - tt),
      };

      // 2. The designs sit in one row that slides from right to left as you scroll
      const prog = clamp01((p - DESIGN.intro) / (0.94 - DESIGN.intro));
      const arrive = sceneOut(clamp01((p - DESIGN.intro * 0.7) / (DESIGN.intro * 0.3)));
      const gap = s.dw * DESIGN.gap;
      const left = s.title ? s.title.left : 40; // the row starts under the title and ends at the same margin on the right
      const total = N * s.dw + (N - 1) * gap;
      const travel = Math.max(total - (W - 2 * left), s.dw);
      const rowY = H * 0.3;
      for (let i = 0; i < N; i++) {
        const el = cardEls.current[i];
        if (!el) continue;
        const x = left + i * (s.dw + gap) - prog * travel + (1 - arrive) * W * 0.5;
        if (arrive <= 0.01 || x > W + 10 || x + s.dw < -10) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";
        el.style.opacity = String(arrive);
        el.style.transform = `translate(${x.toFixed(1)}px,${rowY.toFixed(1)}px)`;
      }
      renderPen();
    };

    // Pen: leaves the Projects title as this section scrolls in, swoops down behind the big title, then moves up with it
    const pinTop = () => parseFloat(getComputedStyle(document.documentElement).fontSize) * 4;
    const renderPen = () => {
      const pen = penRef.current;
      const st = penBridge.start;
      const pose = s.pose;
      if (!pen || !st || !pose) return;
      const vh = window.innerHeight;
      const top = pinTop();
      const r = stage.getBoundingClientRect();
      const g = clamp01((vh - r.top) / (vh - top));
      const arc = penBridge.arcPen;
      if (arc) arc.style.visibility = g > 0.0005 ? "hidden" : "visible";
      const on = g > 0.0005 && r.top > -vh;
      pen.style.visibility = on ? "visible" : "hidden";
      if (!on) return;
      const e = sceneEase(g);
      const dip = Math.sin(Math.PI * e);
      gsap.set(pen, {
        x: lerp(st.left + st.x, r.left + pose.x, e) + dip * s.W * 0.04,
        y: lerp(top + st.y, r.top + pose.y, e) + dip * s.H * 0.1,
        scale: lerp(0.22, pose.scale, e),
        rotation: lerp(42, pose.rot, e),
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(penRef.current, { xPercent: -50, yPercent: -100, transformOrigin: "50% 100%" });
      gsap.set(titleRef.current, { transformOrigin: "0 0" });
      measure();
      const trig = ScrollTrigger.create({
        trigger: section,
        start: "top top+=64",
        end: "bottom bottom",
        onUpdate: (self) => {
          s.target = self.progress;
        },
        onRefresh: (self) => {
          s.target = s.p = self.progress;
          s.dirty = true;
        },
      });
      s.target = s.p = trig.progress;

      const intro = { trigger: section, start: "top 35%", once: true };
      gsap.from(stage.querySelectorAll(".gp-word"), { yPercent: 115, duration: 0.9, stagger: 0.06, ease: "power4.out", scrollTrigger: intro });
      gsap.from(stage.querySelectorAll("[data-intro]"), { opacity: 0, y: 40, duration: 0.8, scrollTrigger: intro });
    }, stage);

    let lastY = -1;
    const tick = () => {
      const d = s.target - s.p;
      const y = window.scrollY;
      if (Math.abs(d) > 0.0002) s.p += d * 0.14;
      else if (!s.dirty) {
        if (y !== lastY) {
          lastY = y;
          renderPen();
        }
        return;
      }
      lastY = y;
      s.dirty = false;
      render();
    };
    gsap.ticker.add(tick);

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(stage);
    document.fonts?.ready.then(measure);

    return () => {
      gsap.ticker.remove(tick);
      ro?.disconnect();
      ctx.revert();
      if (penBridge.arcPen) penBridge.arcPen.style.visibility = "visible";
    };
  }, []);

  return (
    <section
      id="designs"
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100svh - 4rem + ${DESIGN.lead + DESIGN.perCard * N}vh)` }}
    >
      <img
        ref={penRef}
        src={penImg}
        alt=""
        width={PEN.w}
        height={PEN.h}
        draggable="false"
        className="pointer-events-none fixed left-0 top-0 z-[26] select-none"
        style={{ width: PEN.w, height: PEN.h, maxWidth: "none", visibility: "hidden", filter: "drop-shadow(0 18px 22px rgba(58,15,52,0.3))" }}
      />
      <div ref={stageRef} className="sticky top-16 z-10 h-[calc(100svh-4rem)] overflow-hidden">
        <div className="pointer-events-none relative z-20 mx-auto max-w-6xl px-5 pt-6 sm:px-8">
          <p data-intro className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--mut)]">
            04 / UI &amp; Designs
          </p>
          <h2 ref={titleRef} className="font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            <Words parts={["UI & Designs"]} />
            <span ref={endRef} aria-hidden="true" className="inline-block h-[0.1em] w-0 align-baseline" />
          </h2>
        </div>

        {DESIGN_ITEMS.map((d, i) => (
          <figure
            key={d.url || d.stem}
            ref={(el) => (cardEls.current[i] = el)}
            className="pointer-events-none absolute left-0 top-0 m-0 will-change-transform"
            style={{ width: "var(--dw)", visibility: "hidden" }}
          >
            <div className="overflow-hidden rounded-lg bg-[var(--surf)]" style={{ height: "var(--dh)" }}>
              <DesignFace d={d} i={i} alt />
            </div>
            <figcaption className="mt-3 truncate font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--fg)]">
              {String(d.stem).replace(/[-_]+/g, " ")}
            </figcaption>
          </figure>
        ))}

        <a href={PROFILE.designPortfolio} target="_blank" rel="noopener noreferrer" className="absolute bottom-10 inset-x-0 text-[var(--fg)] flex justify-center font-semibold hover:text-[var(--acc)] transition:color duration-[0.3s] " >Portfolio <ArrowUpRight /></a>
      </div >
    </section >
  );
}

// Phones / short screens / reduced motion: a plain grid, no pinned scene
function DesignsGrid() {
  return (
    <section id="designs" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="04 / UI & Designs" title="UI & Designs." />
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-6">
          {DESIGN_ITEMS.map((d, i) => (
            <div key={d.url || d.stem} className="aspect-[6/5] overflow-hidden rounded-2xl border border-[var(--line)]">
              <DesignFace d={d} i={i} alt />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Designs() {
  const arc = useArcMode();
  return arc ? <DesignsStage /> : <DesignsGrid />;
}

/* ------------------------------------------------------------------ */
/*  Experience timeline                                                */
/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-t-2 border-[var(--fg)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="05 / Experience" title="Experience & Background." />

        <div data-timeline className="relative ml-5 pl-10 sm:ml-6 sm:pl-14">
          <div className="absolute left-0 top-0 h-full w-[3px] bg-[color-mix(in_srgb,var(--fg)_15%,transparent)]" />
          <div data-line className="absolute left-0 top-0 h-full w-[3px] origin-top bg-[var(--acc)]" />

          {TIMELINE.map((item) => {
            const Icon = item.kind === "work" ? Briefcase : GraduationCap;
            return (
              <div key={item.title} data-tl-item className="relative mb-14 last:mb-0">
                <span className="absolute -left-[3.75rem] top-0 grid h-10 w-10 place-items-center rounded-full border border-[var(--line2)] bg-[var(--bg)] text-[color:var(--acc-t)] sm:-left-[4.75rem]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surf)] p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-medium sm:text-2xl">{item.title}</h3>
                    {item.period && <span className="font-mono text-xs">{item.period}</span>}
                  </div>
                  <p className="mt-1 inline-block rounded-full border border-[var(--line2)] px-3 py-1 font-mono text-xs text-[color:var(--acc-t)]">
                    {item.org}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm text-[color:var(--mut)]">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--acc-t)]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
    setSent(false);
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please tell me your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) er.message = "A few more words, please (10+ characters).";
    return er;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      if (!prefersReduced() && formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -8 },
          { x: 8, duration: 0.07, repeat: 5, yoyo: true, ease: "power1.inOut", clearProps: "x" }
        );
      }
      return;
    }

    /*
      No backend is wired up. This opens the visitor's email app with the
      message pre-filled. To send from the page instead, POST `form` to a
      service such as Formspree or EmailJS here.
    */
    const subject = encodeURIComponent(`Creative Developer enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  const fieldClass = (hasError) =>
    `w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-[color:var(--fg)] outline-none transition-colors placeholder:text-[color:color-mix(in_srgb,var(--mut)_70%,transparent)] focus:border-[color-mix(in_srgb,var(--acc)_70%,transparent)] ${hasError ? "border-red-400" : "border-[var(--line2)]"
    }`;

  const links = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, ext: false },
    { icon: GitHubIcon, label: "GitHub", value: "Gaurav-mgr", href: PROFILE.github, ext: true },
    { icon: LinkedInIcon, label: "LinkedIn", value: "Connect with me", href: PROFILE.linkedin, ext: true },
  ];

  return (
    <section id="contact" className="gp-dark scroll-mt-16 bg-[var(--bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="06 / Contact" title="Let's work together.">
          Looking for a creative and passionate Developer ? Send a message and I&apos;ll get back to you.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-stagger className="space-y-5">
            {links.map(({ icon: Icon, label, value, href, ext }) => (
              <a
                key={label}
                href={href}
                {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surf)] p-5 transition-colors hover:-translate-x-0.5 hover:-translate-y-0.5 "
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line2)] text-[color:var(--acc-t)]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-xs uppercase tracking-widest text-[color:var(--mut)]">
                    {label}
                  </span>
                  <span className="block truncate font-display text-lg font-medium">{value}</span>
                </span>
                <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>

          <div data-reveal>
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="space-y-5 rounded-2xl border border-[var(--line)] bg-[var(--surf)] p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Ram Thapa"
                    className={fieldClass(errors.name)}
                  />
                  {errors.name && <p className="mt-1.5 text-xs font-medium text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="ram1243@gmail.com"
                    className={fieldClass(errors.email)}
                  />
                  {errors.email && <p className="mt-1.5 text-xs font-medium text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Ask me about the query..."
                  className={`${fieldClass(errors.message)} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-xs font-medium text-red-400">{errors.message}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className={BTN_PRIMARY}>
                  Send message <Send className="h-4 w-4" />
                </button>
                {sent && (
                  <p className="inline-flex items-center gap-2 text-sm font-medium" role="status">
                    <Check className="h-4 w-4 text-[color:var(--acc-t)]" /> Opening your email app...
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="gp-dark relative z-10 overflow-hidden border-t border-[var(--line)] bg-[var(--bg2)] text-[color:var(--fg)]">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <p data-reveal className="font-display text-[12vw] font-medium leading-[0.9] tracking-[-0.05em] text-[color:color-mix(in_srgb,var(--fg)_10%,transparent)] sm:text-[9vw]">
          Gaurav Pulami
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 text-sm sm:flex-row sm:px-8">
        <p className="text-[color:var(--mut)]">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-[color:var(--acc-t)]">
            <GitHubIcon />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-[color:var(--acc-t)]">
            <LinkedInIcon />
          </a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="transition hover:text-[color:var(--acc-t)]">
            <Mail className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={goTop}
            aria-label="Back to top"
            className="rounded-full border border-[var(--line2)] p-2 transition hover:border-[var(--acc)] hover:text-[color:var(--acc-t)]"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Loader — counter + dev "boot log", then the curtain lifts          */
/* ------------------------------------------------------------------ */

const LOG_LINES = [
  { at: 8, text: "$ git checkout -b portfolio" },
  { at: 30, text: "✓ compiling components" },
  { at: 55, text: "✓ unit tests passed  12/12" },
  { at: 78, text: "✓ documentation updated" },
  { at: 96, text: "→ ready for review" },
];

function Loader() {
  const ref = useRef(null);
  // Skipped for reduced motion, or with ?noloader in the URL
  const [gone, setGone] = useState(
    () => typeof window === "undefined" || prefersReduced() || /noloader/.test(window.location.search)
  );

  useLayoutEffect(() => {
    if (gone) {
      window.__gpLoaded = true;
      return undefined;
    }
    const el = ref.current;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const num = el.querySelector("[data-l-num]");
    const bar = el.querySelector("[data-l-bar]");
    const logs = el.querySelectorAll("[data-l-log]");
    const state = { v: 0 };

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            html.style.overflow = prevOverflow;
            window.__gpLoaded = true;
            window.dispatchEvent(new Event("gp:loaded"));
            setGone(true);
            ScrollTrigger.refresh();
          },
        })
        .from("[data-l-in]", { y: 24, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" })
        .to(
          state,
          {
            v: 100,
            duration: 2.4,
            ease: "power2.inOut",
            onUpdate: () => {
              num.textContent = String(Math.round(state.v)).padStart(3, "0");
              bar.style.transform = `scaleX(${state.v / 100})`;
              LOG_LINES.forEach((l, i) => {
                if (state.v >= l.at) logs[i].style.opacity = "1";
              });
            },
          },
          0.3
        )
        .to("[data-l-fade]", { opacity: 0, y: -24, duration: 0.45, ease: "power2.in" }, ">+0.15")
        .to(el, { yPercent: -100, duration: 1, ease: "power4.inOut" }, ">-0.05");
    }, el);

    return () => {
      ctx.revert();
      html.style.overflow = prevOverflow;
    };
  }, [gone]);

  if (gone) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="gp-dark fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--bg)] px-5 py-6 text-[color:var(--fg)] sm:px-10 sm:py-8"
    >
      <div data-l-fade className="flex flex-col items-center w-fit justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--mut)]">
        <span className="text-[60px] text-[var(--acc)]">Ya Halo</span>
        <span data-l-in className="text-[16px]">Glad to see you :D</span>
      </div>

      <div data-l-fade className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div data-l-in className="font-mono text-xs leading-7 text-[color:var(--mut)] sm:text-sm">
          {LOG_LINES.map((l) => (
            <p key={l.text} data-l-log style={{ opacity: 0 }} className={l.text.startsWith("→") ? "text-[color:var(--acc-t)]" : ""}>
              {l.text}
            </p>
          ))}
        </div>
        <div data-l-in className="flex items-end leading-none">
          <span
            data-l-num
            className="font-display text-[34vw] font-medium tracking-[-0.06em] tabular-nums sm:text-[18vw]"
          >
            000
          </span>
          <span className="mb-[3vw] ml-2 font-mono text-sm text-[color:var(--mut)] sm:text-xl">%</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[var(--tint)]">
        <div data-l-bar className="h-full origin-left bg-[var(--acc)]" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App — all page-level GSAP lives here                               */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const rootRef = useRef(null);
  const [active, setActive] = useState("");

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const q = (sel) => gsap.utils.toArray(sel, root);

    let onLoaded = null;
    const ctx = gsap.context(() => {

      // Scroll-spy for the nav (works regardless of motion preference)
      ScrollTrigger.create({
        trigger: "#top",
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && setActive(""),
      });
      // About and Skills share one pinned section, so their ranges are computed from its sideways travel.
      // Start/end are functions, so they re-read the current layout on every refresh.
      const spyRange = (id, edge) => {
        const vh = window.innerHeight;
        const hs = document.getElementById("about-skills");
        if (hs && (id === "about" || id === "skills")) {
          const top = absTop(hs);
          const mid = top - 64 + (hs.offsetHeight - hs.firstElementChild.offsetHeight) / 2;
          if (id === "about") return edge === "start" ? top - vh * 0.45 : mid;
          return edge === "start" ? mid : top + hs.offsetHeight - vh * 0.45;
        }
        const el = document.getElementById(id);
        return edge === "start" ? absTop(el) - vh * 0.45 : absTop(el) + el.offsetHeight - vh * 0.45;
      };
      NAV.forEach(({ id }) => {
        ScrollTrigger.create({
          start: () => spyRange(id, "start"),
          end: () => spyRange(id, "end"),
          onToggle: (self) => self.isActive && setActive(id),
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero intro: lettering rises, portrait fades up, copy staggers in
        const intro = gsap
          .timeline({ paused: !window.__gpLoaded, defaults: { ease: "power4.out" } })
          .from(q("[data-nav]"), { y: -90, duration: 0.8 })
          .from(q("[data-hero-title]"), { yPercent: 18, opacity: 0, filter: "blur(22px)", duration: 1.4 }, "-=0.4")
          .from(
            q("[data-hero-portrait]"),
            { y: 80, opacity: 0, scale: 1.04, duration: 1.3, ease: "power3.out" },
            "-=0.9"
          )
          .from(
            q("[data-hero-fade]"),
            { y: 30, opacity: 0, duration: 0.8, stagger: 0.08, clearProps: "transform" },
            "-=0.9"
          );
        // Wait for the loader to lift before the hero intro plays
        if (!window.__gpLoaded) {
          onLoaded = () => intro.play();
          window.addEventListener("gp:loaded", onLoaded, { once: true });
        }

        // Infinite skills marquee
        gsap.to(q("[data-marquee]"), { xPercent: -50, duration: 30, ease: "none", repeat: -1 });

        // Mouse parallax: lettering and portrait drift in opposite directions
        const hero = root.querySelector("#top");
        const depthEls = q("[data-depth]");
        const onMove = (e) => {
          const r = hero.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          depthEls.forEach((el) =>
            gsap.to(el, {
              x: nx * Number(el.dataset.depth),
              y: ny * Number(el.dataset.depth),
              duration: 1,
              ease: "power3.out",
              overwrite: "auto",
            })
          );
        };
        hero.addEventListener("mousemove", onMove);

        // Section headings: masked word reveal
        q("[data-split]").forEach((h) => {
          gsap.from(h.querySelectorAll(".gp-word"), {
            yPercent: 115,
            duration: 0.9,
            stagger: 0.06,
            ease: "power4.out",
            scrollTrigger: { trigger: h, start: "top 88%" },
          });
        });

        // Generic fade-up reveals and staggered groups
        q("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
        q("[data-stagger]").forEach((group) => {
          gsap.from(group.children, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: group, start: "top 82%" },
          });
        });

        // Timeline: line draws as you scroll, entries slide in
        q("[data-timeline]").forEach((t) => {
          gsap.fromTo(
            t.querySelector("[data-line]"),
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: t, start: "top 70%", end: "bottom 70%", scrub: true },
            }
          );
        });
        q("[data-tl-item]").forEach((item) => {
          gsap.from(item, {
            x: -40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: item, start: "top 85%" },
          });
        });

        return () => hero.removeEventListener("mousemove", onMove);
      });
    }, root);

    // Fonts change layout height; recalculate trigger positions once they load
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    // Also re-measure whenever the page height changes (late fonts, images, rotated phones)
    let refreshTimer;
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
          clearTimeout(refreshTimer);
          refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
        })
        : null;
    ro?.observe(document.body);

    return () => {
      clearTimeout(refreshTimer);
      ro?.disconnect();
      if (onLoaded) window.removeEventListener("gp:loaded", onLoaded);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="gp-root relative min-h-screen bg-[var(--bg)] font-sans text-[color:var(--fg)] antialiased selection:bg-[#EAAA00] selection:text-[#3A0F34]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        html { scroll-behavior: auto; }
        .gp-root { --bg:#DDE3EB; --bg2:#D2D9E3; --surf:#E8ECF2; --fg:#3A0F34; --mut:#6d5568; --mut2:#4f2d4a; --acc:#EAAA00; --acc-t:#8f6400; --line:rgba(58,15,52,0.14); --line2:rgba(58,15,52,0.26); --line3:rgba(58,15,52,0.5); --tint:rgba(58,15,52,0.06); --tint2:rgba(58,15,52,0.11); }
        .gp-dark { color: var(--fg); --bg:#3A0F34; --bg2:#2d0b28; --surf:#4a1b43; --fg:#DDE3EB; --mut:#a99bb0; --mut2:#c8c1d0; --acc:#EAAA00; --acc-t:#EAAA00; --line:rgba(221,227,235,0.14); --line2:rgba(221,227,235,0.26); --line3:rgba(221,227,235,0.5); --tint:rgba(221,227,235,0.07); --tint2:rgba(221,227,235,0.13); }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-display { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace; }
        .font-anton { font-family: 'Anton', 'Bebas Neue', Impact, sans-serif; }
        .font-bebas { font-family: 'Bebas Neue', Impact, sans-serif; }
        .font-script { font-family: 'Herr Von Muellerhoff', cursive; }
        @keyframes gp-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes gp-tilt { 0%,100% { transform: rotateY(-26deg) rotateX(12deg); } 50% { transform: rotateY(26deg) rotateX(-10deg); } }
        .gp-tilt { animation: gp-tilt var(--td, 7s) ease-in-out var(--tl, 0s) infinite; }
        .gp-bob { animation: gp-bob var(--d, 5s) ease-in-out var(--dl, 0s) infinite; }
        .gp-mark path { stroke-dasharray: 1; stroke-dashoffset: 1; }
        @keyframes gp-fly { 0% { transform: translate(0,0); } 25% { transform: translate(var(--x1),var(--y1)); } 50% { transform: translate(var(--x2),var(--y2)); } 75% { transform: translate(var(--x3),var(--y3)); } 100% { transform: translate(0,0); } }
        @keyframes gp-glow { 0%,100% { opacity: 0.12; } 50% { opacity: 1; } }
        .gp-fly { position: absolute; border-radius: 9999px; background: #FFE27A; box-shadow: 0 0 6px 2px rgba(255,214,90,0.85), 0 0 16px 5px rgba(234,170,0,0.45); animation: gp-fly var(--fd,20s) ease-in-out var(--fl,0s) infinite, gp-glow var(--gd,3s) ease-in-out var(--fl,0s) infinite; }
        @keyframes gp-caret { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        .gp-caret { animation: gp-caret 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) { .gp-mark path { stroke-dashoffset: 0; } .gp-caret, .gp-bob, .gp-tilt { animation: none; } .gp-flies { display: none; } }
      `}</style>

      {/* Faint vertical column lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "linear-gradient(to right, var(--line) 1px, transparent 1px)",
          backgroundSize: "12.5% 100%",
        }}
      />

      <Loader />
      <Navbar active={active} />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <AboutSkills />
        <Projects />
        <Designs />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
