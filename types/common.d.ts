interface AnyKV<T = any> {
  [prop: string]: T
}

interface Window {
  [props: string]: any
}
