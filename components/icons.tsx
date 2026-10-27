import {
  siCloudflare, siCss, siDocker, siDrizzle, siExpress, siFigma, siFirebase, siRedux, siGit, siGithub, siGithubactions, siHtml5,
  siJavascript, siLinux, siNextdotjs, siNginx, siNodedotjs, siNotion, siPostgresql, siPostman, siPython, siReact,
  siSupabase, siTailwindcss, siTypescript, siVercel, siWhatsapp, siX,
} from "simple-icons";
import type { IconKey } from "@/data/site";

const PATHS: Partial<Record<IconKey, string>> = {
  react: siReact.path, nextdotjs: siNextdotjs.path, typescript: siTypescript.path, javascript: siJavascript.path,
  tailwindcss: siTailwindcss.path, html5: siHtml5.path, css: siCss.path, nodedotjs: siNodedotjs.path, python: siPython.path,
  postgresql: siPostgresql.path, supabase: siSupabase.path, drizzle: siDrizzle.path,
  express: siExpress.path, redux: siRedux.path, firebase: siFirebase.path, docker: siDocker.path, githubactions: siGithubactions.path,
  vercel: siVercel.path, linux: siLinux.path, nginx: siNginx.path, cloudflare: siCloudflare.path, git: siGit.path,
  github: siGithub.path, figma: siFigma.path, postman: siPostman.path, notion: siNotion.path, x: siX.path, whatsapp: siWhatsapp.path,
  // simple-icons has no LinkedIn or generic API glyph; these are drawn by hand.
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  api: "M3 4h6v2H5v12h4v2H3V4zm12 0h6v16h-6v-2h4V6h-4V4zM8 11h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z",
  agile: "M12 4a8 8 0 0 1 7.75 6h-2.1A6 6 0 0 0 6.3 9.4l2.2 2.1H3V6l1.9 1.9A8 8 0 0 1 12 4Zm-7.75 10h2.1a6 6 0 0 0 11.35.6l-2.2-2.1H21V18l-1.9-1.9A8 8 0 0 1 4.25 14Z",
};

export function Icon({ name, className = "size-4" }: { name: IconKey; className?: string }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}
