/**
 * Shared rules for the homepage intro (components/layout/IntroGate.tsx).
 * The same decision is made twice: once by a tiny inline script before first
 * paint (so repeat visitors never see a flash of the intro), and once on the
 * client when React mounts (in case that script didn't run).
 */
export const INTRO_STORAGE_KEY = "intro-seen";

/** Runs in <head> before first paint. Marks <html> so CSS can hide the intro. */
export const INTRO_SKIP_SCRIPT = `(function(){try{
var d=document.documentElement,c=navigator.connection||{};
var skip=location.pathname!=="/"||location.hash||sessionStorage.getItem("${INTRO_STORAGE_KEY}")==="1"||
matchMedia("(prefers-reduced-motion: reduce)").matches||c.saveData||/(^|-)2g$/.test(c.effectiveType||"");
if(skip)d.setAttribute("data-intro","skip");
}catch(e){}})();`;

export function shouldSkipIntro(): boolean {
  try {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    return (
      window.location.pathname !== "/" ||
      !!window.location.hash ||
      sessionStorage.getItem(INTRO_STORAGE_KEY) === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !!c?.saveData ||
      /(^|-)2g$/.test(c?.effectiveType ?? "")
    );
  } catch {
    return false;
  }
}
