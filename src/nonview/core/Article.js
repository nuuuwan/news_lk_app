import CacheFuture from "../../nonview/base/CacheFuture";
import TimeXFuture from "../../nonview/base/TimeXFuture";
import WWWFuture from "../../nonview/base/WWWFuture";
import { URL_DATA } from "../../nonview/constants/Data";

const URL_ARTICLES = URL_DATA + "/articles";
const MAX_WORDS_BODY_LINES_LIMITED = 100;
const READING_SPEED_WPM = 200;

export default class Article {
  constructor(newspaperID, url, timeUT, title, bodyLines) {
    this.newspaperID = newspaperID;
    this.url = url;
    this.timeUT = timeUT;
    this.title = title;
    this.bodyLines = bodyLines;
  }

  get timeStrHumanized() {
    return TimeXFuture.humanizeUT(this.timeUT);
  }

  get timeStr() {
    return TimeXFuture.localeString(this.timeUT);
  }

  get bodyLinesLimited() {
    let nWordsTotal = 0;
    let bodyLinesLimited = [];
    for (let line of this.bodyLines) {
      const nWords = line.split(" ").length;
      bodyLinesLimited.push(line);
      nWordsTotal += nWords;
      if (nWordsTotal > MAX_WORDS_BODY_LINES_LIMITED) {
        bodyLinesLimited.push("...");
        break;
      }
    }
    return bodyLinesLimited;
  }

  get urlShort() {
    return this.url.split("/").splice(0, 3).join("/");
  }

  get body() {
    return this.bodyLines.join("\n");
  }

  get words() {
    return this.body.split(" ");
  }

  get wordCount() {
    return this.words.length;
  }

  get readingTimeMinutes() {
    return Math.ceil(this.wordCount / READING_SPEED_WPM);
  }

  static fromDict(d) {
    return new Article(
      d["newspaper_id"],
      d["url"],
      parseInt(d["time_ut"]),
      d["title"],
      d["body_lines"]
    );
  }

  static async loadRawArticle(fileName) {
    const urlArticle = [URL_ARTICLES, fileName].join("/");
    return await WWWFuture.jsonNonCache(urlArticle);
  }

  static async loadArticle(fileName) {
    const cacheKey = "article:" + fileName;
    const rawArticle = await CacheFuture.get(cacheKey, async function () {
      return await Article.loadRawArticle(fileName);
    });
    return Article.fromDict(rawArticle);
  }
}
