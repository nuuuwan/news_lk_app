import WWWFuture from "../../nonview/base/WWWFuture";
import { URL_DATA } from "../../nonview/constants/Data";

const URL_RAW_ARTICLES = URL_DATA + "/articles.summary.latest.json";
const FILE_NAME_PREFIX = "/tmp/news_lk2/articles/";

export default class ArticleSummary {
  constructor(newspaperID, url, timeUT, title, fileName) {
    this.newspaperID = newspaperID;
    this.url = url;
    this.timeUT = timeUT;
    this.title = title;
    this.fileName = fileName;
  }

  static fromDict(d) {
    return new ArticleSummary(
      d["newspaper_id"],
      d["url"],
      parseInt(d["time_ut"]),
      d["title"],
      d["file_name"].replace(FILE_NAME_PREFIX, "")
    );
  }

  static async loadArticleSummaryList() {
    const rawArticleSummaryList = await WWWFuture.jsonNonCache(
      URL_RAW_ARTICLES
    );
    return rawArticleSummaryList.map(function (d) {
      return ArticleSummary.fromDict(d);
    });
  }
}
