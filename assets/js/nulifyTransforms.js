const nullifyTransforms = el => {
  const parseTransform = el =>
    window
      .getComputedStyle(el)
      .transform.split(/\(|,|\)/)
      .slice(1, -1)
      .map(v => parseFloat(v))

  const { top, left, width, height } = el.getBoundingClientRect()
  const transformArr = parseTransform(el)

  if (transformArr.length === 6) {
    // 2D matrix
    const t = transformArr

    const det = t[0] * t[3] - t[1] * t[2]

    return {
      width: width / t[0],
      height: height / t[3],
      left: (left * t[3] - top * t[2] + t[2] * t[5] - t[4] * t[3]) / det,
      top: (-left * t[1] + top * t[0] + t[4] * t[1] - t[0] * t[5]) / det
    }
  } else {
    // This case is not handled because it's very rarely needed anyway.
    // We just return the tranformed metrics, as they are, for consistency.
    return { top, left, width, height }
  }
}

export default nullifyTransforms
