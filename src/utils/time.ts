export function fromMS(duration: number): string {
    const seconds = Math.floor((duration / 1e3) % 60);
    const minutes = Math.floor((duration / 6e4) % 60);
    const hours = Math.floor(duration / 36e5);
    const secondsPad = `${seconds}`.padStart(2, "0");
    const minutesPad = `${minutes}`.padStart(2, "0");
    const hoursPad = `${hours}`.padStart(2, "0");
    return `${hours ? `${hoursPad}:` : ""}${minutesPad}:${secondsPad}`;
  }

export function toMS(duration: string): number {
    const milliseconds =
      duration
        .split(":")
        .reduceRight(
          (prev, curr, i, arr) =>
            prev + parseInt(curr) * Math.pow(60, arr.length - 1 - i),
          0
        ) * 1e3;

    return milliseconds ? milliseconds : 0;
  }