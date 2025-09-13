const throttle = (fn: Function, delay: number) => {
  let lastCall = 0
  return function(this: any, ...args: any[]) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      return fn.apply(this, args)
    }
  }
}

export default throttle