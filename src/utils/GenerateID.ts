export default function GenerateID(): string {
  const id = Math.random();
  const parsedId = Math.floor(id * 100) + Date.now();
  return parsedId.toString(10);
}
