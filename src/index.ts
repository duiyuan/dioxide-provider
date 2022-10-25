/**
 * Returns a Promise that resolves to the value of window.dioxide if it is
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.timeout - Milliseconds to wait for 'dioxide#initialized' to
 * be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */

function detectDioxideProvider<T = DioxideJS.Provider>({
  timeout = 3000,
} = {}): Promise<T | null> {
  if (typeof timeout !== 'number') {
    throw new Error(
      `@duiyuan/detect-provider: Expected option 'timeout' to be a number.`
    )
  }

  let done = false

  return new Promise((resolve) => {
    // Resolve promise immediately when detect window.dioxide
    // Otherwise detect it after dioxide#initialized event trigger, you will got null after given timeout
    if (window.dioxide) {
      detect()
    } else {
      window.addEventListener('dioxide#initialized', detect, {
        once: true,
      })

      setTimeout(() => {
        detect()
      }, timeout)
    }

    function detect() {
      if (done) {
        return
      }
      done = true

      window.removeEventListener('dioxide#initialized', detect)

      if (window.dioxide) {
        resolve(window.dioxide as T)
      } else {
        const message = 'Unable to detect window.dioxide'
        console.error('@dioxide/detect-provider:', message)
        resolve(null)
      }
    }
  })
}

export default detectDioxideProvider
