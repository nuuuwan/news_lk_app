import Cache from "../../nonview/base/Cache";
import { JSONWWW } from "../../nonview/base/WWW";
import { URL_DATA } from "../../nonview/constants/Data";
import Article from "../../nonview/core/Article";

const URL_TRANSLATED_ARTICLES = URL_DATA + "/articles.translated";

export default class TranslatedArticle extends Article {
  constructor(
    newspaperID,
    url,
    timeUT,
    title,
    bodyLines,
    originalLang,
    translate
  ) {
    super(newspaperID, url, timeUT, title, bodyLines, originalLang);
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
    return new TranslatedArticle(
      d["newspaper_id"],
      d["url"],
      parseInt(d["time_ut"]),
      d["title"],
      d["body_lines"],
      d["original_lang"],
      translate
    );
  }

  static async loadRawTranslatedArticle(fileName) {
    const urlTranslatedArticle = [URL_TRANSLATED_ARTICLES, fileName].join("/");
    const jsonWWW = new JSONWWW(urlTranslatedArticle);
    return await jsonWWW.read();
  }

  static async loadTranslatedArticle(fileName) {
    const cache = new Cache("article.translated:" + fileName);
    const rawArticle = await cache.get(async function () {
      return await TranslatedArticle.loadRawTranslatedArticle(fileName);
    });
    return TranslatedArticle.fromDict(rawArticle);
  }
}
