export function timeStampGen () {
    // returns time stamp for Bulgarian time zone - Sofia 
    // mostly used in error logging
    return new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' })
}
  