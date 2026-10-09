/**
 * Copy text, falling back to a hidden textarea where the async clipboard is
 * missing or refuses (insecure origins, some embedded browsers).
 *
 * `done` fires immediately rather than on the promise, which the browser may
 * hold until the document regains focus — several seconds of a dead button.
 */
export function copyText(text: string, done: () => void) {
  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  };
  done();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(fallback);
  } else {
    fallback();
  }
}
