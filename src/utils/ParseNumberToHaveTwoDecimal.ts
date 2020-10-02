export default function ParseNumberToHaveTwoDecimal(number: string): number {
  return Math.round(parseInt(number, 10) * 100) / 100;
}
