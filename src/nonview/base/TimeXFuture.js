import { TimeX } from "@nuuuwan/utils-js-dev";

export default class TimeXFuture {
  static humanize(s) {
    for (let [label, sPerX] of [
      ["week", 7 * 86_400],
      ["day", 86_400],
      ["hour", 3_600],
      ["minute", 60],
    ]) {
      const x = parseInt(s / sPerX);
      if (x === 1) {
        return `1 ${label} ago`;
      }
      if (x > 1) {
        return `${x} ${label}s ago`;
      }
    }

    return "Now";
  }

  static humanizeUT(ut) {
    const currentTimeUT = TimeX.getUnixTime();
    const deltaT = currentTimeUT - ut;
    return TimeXFuture.humanize(deltaT);
  }

  static localString(ut) {
    return new Date(ut * 1000.0).toLocaleString("si-LK");
  }
}
