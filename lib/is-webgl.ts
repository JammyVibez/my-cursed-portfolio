/**
 * Returns **true** only when the browser can create a _reliable_
 * WebGL 1 context (no major performance caveat).
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false
  try {
    const canvas = document.createElement("canvas")
    // Stricter check – many preview/sandbox envs "fake-pass" the simple test.
    const opts = { failIfMajorPerformanceCaveat: true }
    return !!(canvas.getContext("webgl", opts) || canvas.getContext("experimental-webgl", opts))
  } catch {
    return false
  }
}
