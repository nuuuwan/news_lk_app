import Cache from "../../nonview/base/Cache";
import { JSONWWW } from "../../nonview/base/WWW";
import { URL_DATA } from "../../nonview/constants/Data";
import ArticleSummary from "../../nonview/core/ArticleSummary";

const URL_ARTICLES = URL_DATA + "/articles.translated";
const MAX_WORDS_BODY_LINES_LIMITED = 100;
const READING_SPEED_WPM = 200;

export default class Article extends ArticleSummary {
  constructor(newspaperID, url, timeUT, title, originalLang, textIDX) {
    super(newspaperID, url, timeUT, title, null, null);
    this.originalLang = originalLang;
    this.textIDX = textIDX;
  }

  static fromDict(d) {
    let text_idx;
    if (d["text_idx"]) {
      text_idx = Object.entries(d["text_idx"]).reduce(function (
        text_idx,
        [lang, values]
      ) {
        text_idx[lang] = {
          title: values["title"],
          bodyLines: values["body_lines"],
        };
        return text_idx;
      },
      {});
    }
    return new Article(
      d["newspaper_id"],
      d["url"],
      parseInt(d["time_ut"]),

      d["title"],
      d["original_lang"],
      text_idx
    );
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

  static isCompatible(d) {
    if (!d["original_lang"]) {
      return false;
    }
    if (!d["text_idx"]) {
      return false;
    }
    return true;
  }

  static async loadRawArticle(fileName) {
    const urlArticle = [URL_ARTICLES, fileName].join("/");
    const jsonWWW = new JSONWWW(urlArticle);
    return await jsonWWW.read();
  }

  static async loadArticle(fileName) {
    const cache = new Cache("article:" + fileName);
    const rawArticle = await cache.get(async function () {
      return await Article.loadRawArticle(fileName);
    });

    if (!Article.isCompatible(rawArticle)) {
      return null;
    }

    return Article.fromDict(rawArticle);
  }
}
