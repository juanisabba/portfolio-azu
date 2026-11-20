/** Cookie set on "Enter" so the home intro stays hidden for a while, even on refresh. */
export const SPLASH_COOKIE = "entered";

/** How long the intro stays hidden after "Enter". */
export const SPLASH_HIDE_SECONDS = 30 * 60;

/** Attribute on <html> that hides the intro (set before paint when the cookie exists). */
export const SPLASH_SKIP_ATTR = "data-splash-skip";

export const hasEnteredCookie = () =>
  new RegExp(`(?:^|; )${SPLASH_COOKIE}=`).test(document.cookie);

/** Inline, pre-paint version of the check above. */
export const SPLASH_SKIP_SCRIPT = `try{if(/(?:^|; )${SPLASH_COOKIE}=/.test(document.cookie))document.documentElement.setAttribute("${SPLASH_SKIP_ATTR}","")}catch(e){}`;
