import TimeX from "../../nonview/base/TimeX";
import { JSONWWW } from "../../nonview/base/WWW";
import { URL_DATA } from "../../nonview/constants/Data";

import IDX from "../../nonview/base/IDX";
const URL_RAW_ARTICLES = URL_DATA + "/articles.summary.latest.json";
const FILE_NAME_PREFIX = "/tmp/news_lk2/articles/";

export default class ArticleSummary {
  constructor(newspaperID, url, timeUT, title, fileName, isTranslated) {
    this.newspaperID = newspaperID;
    this.url = url;
    this.timeUT = timeUT;
    this.title = title;
    this.fileName = fileName;
    this.isTranslated = isTranslated;
  }

  get timeStrHumanized() {
    return TimeX.getHumanTime(this.timeUT);
  }

  get timeStr() {
    return TimeX.formatTime(this.timeUT);
  }

  get urlShort() {
    return this.url.split("/").splice(0, 3).join("/");
  }

  static fromDict(d) {
    return new ArticleSummary(
      d["newspaper_id"],
      d["url"],
      parseInt(d["time_ut"]),
      d["title"],
      d["file_name"].replace(FILE_NAME_PREFIX, ""),
      d["is_translated"]
    );
  }

  static async loadArticleSummaryList() {
    const jsonWWW = new JSONWWW(URL_RAW_ARTICLES);
    const rawArticleSummaryList = await jsonWWW.readNoCache();
    const articleSummaryList = rawArticleSummaryList.map(function (d) {
      return ArticleSummary.fromDict(d);
    });

    const dedupedArticleSummaryList = Object.values(
      IDX.build(
        articleSummaryList,
        (x) => x.title,
        (x) => x
      )
    );
    return dedupedArticleSummaryList;
  }
}
