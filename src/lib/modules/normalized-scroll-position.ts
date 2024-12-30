

// chat GiPiTi everybody!!
export function getNormalizedScrollPosition(elm: HTMLElement | Window) {
  if (elm instanceof Window) {
    const scrollTop = elm.scrollY; // Current vertical scroll position
    const scrollHeight = document.documentElement.scrollHeight; // Total height of the document
    const clientHeight = document.documentElement.clientHeight; // Visible height of the viewport

    // Normalize scroll position
    return {
      pixel: scrollTop,
      normalized: Math.min(1, Math.max(0, scrollTop / (scrollHeight - clientHeight)))
    };
  } else if (elm instanceof HTMLElement) {
    const scrollTop = elm.scrollTop; // Current vertical scroll position
    const scrollHeight = elm.scrollHeight; // Total height of the element's content
    const clientHeight = elm.clientHeight; // Visible height of the element

    // Normalize scroll position
    return {
      pixel: scrollTop,
      normalized: Math.min(1, Math.max(0, scrollTop / (scrollHeight - clientHeight)))
    };
  } else {
    throw new Error("The parameter must be either a Window or an HTMLElement.");
  }
}