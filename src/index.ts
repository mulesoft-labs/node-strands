/**
 * Template string options.
 */
export interface Options {
  indent?: string
  eol?: string
  separator?: string
  prefix?: string
  suffix?: string
}

/**
 * Can be made into a string.
 */
export type Stringable = string | { toString (): string }

/**
 * The builder is a circular interface.
 */
export interface Strand {
  (...args: Stringable[]): Strand
  toString (): string
}

/**
 * Basic string builder, useful building block for smaller projects (E.g. SQL).
 */
export function strand (separator = '', prefix = '', suffix = ''): Strand {
  let out = prefix

  function strand (...args: Stringable[]): Strand {
    for (const value of args) {
      if (out === prefix) {
        out += value
      } else {
        out += separator + value
      }
    }

    return strand
  }

  strand.toString = () => out + suffix

  return strand
}

/**
 * Multiline template builder.
 */
export class Strands {

  strand: Strand
  options: Options
  newline = true

  constructor ({ prefix = '', suffix = '', separator = '', indent = '', eol = '\n' }: Options = {}) {
    this.strand = strand(separator, prefix, suffix)
    this.options = { indent, eol }
  }

  return (count = 1) {
    while (count--) {
      this.strand(this.options.eol)
      this.newline = true
    }
  }

  line (...values: Stringable[]) {
    if (this.newline) {
      this.strand(this.options.indent)
    }

    this.strand(...values)
    this.return()
    return this
  }

  lines (lines: Stringable[]) {
    for (const value of lines) {
      this.line(value)
    }

    return this
  }

  multiline (value: Stringable) {
    return this.lines(String(value).split(/\r?\n/g))
  }

  append (...args: Stringable[]) {
    this.strand(...args)
    this.newline = false
    return this
  }

  toString () {
    return this.strand.toString()
  }

}

/**
 * Wrap a template function that generates a string.
 */
export function wrap <T> (fn: (t: Strands, data: T) => any, options?: Options): (data: T) => string {
  return (data: T) => {
    const t = new Strands(options)
    fn(t, data)
    return t.toString()
  }
}
