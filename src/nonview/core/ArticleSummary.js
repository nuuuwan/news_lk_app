import { JSONWWW } from "../../nonview/base/WWW";
import { URL_DATA } from "../../nonview/constants/Data";
import Ent from "../../nonview/core/Ent";

const URL_RAW_ARTICLES = URL_DATA + "/articles.summary.latest.json";
const FILE_NAME_PREFIX = "/tmp/news_lk2/articles/";
const URL_GROUP_TO_ARTICLE_SUMMARY =
  URL_DATA + "/group_to_article_summary.json";

export default class ArticleSummary {
  constructor(fileName) {
    this.fileName = fileName;
  }

  static fromDict(d) {
    return new ArticleSummary(d["file_name"].replace(FILE_NAME_PREFIX, ""));
  }

  static async loadArticleSummaryList() {
    const jsonWWW = new JSONWWW(URL_RAW_ARTICLES);
    const rawArticleSummaryList = await jsonWWW.readNoCache();
    return rawArticleSummaryList.map(function (d) {
      return ArticleSummary.fromDict(d);
    });
  }

  static async loadGroupToArticleSummaryList() {
    const jsonWWW = new JSONWWW(URL_GROUP_TO_ARTICLE_SUMMARY);
    const groupToRawArticleSummaryList = await jsonWWW.read();
    return Object.entries(groupToRawArticleSummaryList).reduce(function (
      groupToArticleSummaryList,
      [group, rawArticleSummaryList]
    ) {
      groupToArticleSummaryList[group] = rawArticleSummaryList.map(function (
        d
      ) {
        return ArticleSummary.fromDict(d);
      });
      return groupToArticleSummaryList;
    },
    {});
  }

  static async loadArticleSummaryListForEnt(ent) {
    const entToGroup = await Ent.loadEntToGroup();
    const group = entToGroup[ent];
    const groupToArticleSummaryList =
      await ArticleSummary.loadGroupToArticleSummaryList();
    return groupToArticleSummaryList[group];
  }
}
