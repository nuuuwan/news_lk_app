import CacheFuture from "../../nonview/base/CacheFuture";
import WWWFuture from "../../nonview/base/WWWFuture";
import { URL_DATA } from "../../nonview/constants/Data";

const URL_ARTICLES = URL_DATA + "/articles";
const MAX_WORDS_BODY_LINES_LIMITED = 100;

export default class Article {
  constructor(newspaperID, url, timeUT, title, bodyLines) {
    this.newspaperID = newspaperID;
    this.url = url;
    this.timeUT = timeUT;
    this.title = title;
    this.bodyLines = bodyLines;
  }

  get timeStr() {
    return new Date(this.timeUT * 1000.0).toLocaleString("si-LK");
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
