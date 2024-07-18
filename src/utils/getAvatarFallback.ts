export function getAvatarFallback(name: string) {
  const [firstName, secondName] = name.toUpperCase().split(' ')
  return `${firstName[0]}${secondName[0]}`
}
