/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
const debounceEvent = () => {
  //@ts-ignore
  let time = null

  return function (fn: any, wait = 500) {
    //@ts-ignore
    clearTimeout(time)

    time = setTimeout(() => {
      fn()
    }, wait)
  }
}

const debounce = debounceEvent()

export default debounce
