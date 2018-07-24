export class Functional {
  static pipe = (...fns) => result => {
    const list = [...fns]
    while (list.length > 0) {
      result = list.shift()(result)
    }
    return result
  }
  static compose = (a, b) => c => a(b(c))
}
