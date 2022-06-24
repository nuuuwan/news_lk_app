import Cache from "../../nonview/base/Cache";
import { JSONWWW } from "../../nonview/base/WWW";
import { URL_DATA } from "../../nonview/constants/Data";
import ArticleSummary from "../../nonview/core/ArticleSummary";

const URL_ARTICLES = URL_DATA + "/articles.translated";
const MAX_WORDS_BODY_LINES_LIMITED = 100;
const READING_SPEED_WPM = 200;

export default class Article extends ArticleSummary {
  constructor(newspaperID, url, timeUT, title, bodyLines, originalLang, translate) {
    super(newspaperID, url, timeUT, title, null, null);
    this.bodyLines = bodyLines;
    this.originalLang = originalLang;
    this.translate = translate;
  }

  static fromDict(d) {
    let translate;
    if (d["translate"]) {
      translate = Object.entries(d["translate"]).reduce(function (
        translate,
        [lang, values]
      ) {
        translate[lang] = {
          title: values["title"],
          bodyLines: values["body_lines"],
        };
        return translate;
      },
      {});
    }
    return new Article(
      d["newspaper_id"],
      d["url"],
      parseInt(d["time_ut"]),
      d["title"],
      d["body_lines"],
      d["original_lang"],
      translate
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
    return Article.fromDict(rawArticle);
  }
}
