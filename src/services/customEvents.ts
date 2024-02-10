export const commonCustomEvent = {
  on: (ev: string, cb: (data: unknown) => void) => {
    document.addEventListener(ev, cb);
  },
  dispatch: (ev: string, data: unknown) => {
    document.dispatchEvent(new CustomEvent(ev, { detail: data }));
  },
  remove: (ev: string, cb: (data: unknown) => void) => {
    document.removeEventListener(ev, cb);
  },
};

export const COMMON_EVENTS = {
  NAVIGATION_TRIGGERED: "onNavigate",
  ERROR_OCCURRED: "onErrorOccurred",
};
