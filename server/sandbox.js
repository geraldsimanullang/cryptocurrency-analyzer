const today = new Date()
const now = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0))

console.log((now.getTime()/1000) - 31_536_000)
console.log(now.getTime()/1000)