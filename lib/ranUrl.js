module.exports = (num) => {
  return Math.random().toString(36).slice(-num)
}