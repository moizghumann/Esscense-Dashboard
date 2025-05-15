export function formatTime(hhmmss: string) {
  // 1) split into ["HH","MM","SS"] and turn into numbers
  const [h, m, s] = hhmmss.split(':').map((str) => Number(str))

  // 2) total seconds
  const totalSeconds = h * 3600 + m * 60 + s

  // 3) break back into minutes + seconds
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  // 4) interpolate—dropping any leading zeros automatically
  return `${minutes}m ${seconds}s`
}
