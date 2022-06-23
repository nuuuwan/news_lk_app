import { Component } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import { TimeX } from "@nuuuwan/utils-js-dev";

import I18N from "../../nonview/base/I18N";
import URLContext from "../../nonview/base/URLContext";
import ArticleSummary from "../../nonview/core/ArticleSummary";

import HomePageBottomNavigation from "../../view/molecules/HomePageBottomNavigation";
import ArticleView from "../../view/organisms/ArticleView";

const STYLE = {
  margin: 2,
  marginTop: 2,
  marginBottom: 2,
};

const MAX_ARTICLES_TO_DISPLAY = 100;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = this.getContext();
    this.state = {
      context,
      articleSummaryList: null,
      timeLatestRefresh: null,
    };
    this.isComponentMounted = false;
    this.setContext(context);
  }

  getContext() {
    let context = URLContext.getContext();
    if (!context.lang) {
      context.lang = I18N.getLang();
    }
    return context;
  }

  setContext(newContext) {
    const oldContext = this.getContext();
    const context = { ...oldContext, ...newContext };
    URLContext.setContext(context);
    I18N.setLang(context.lang);

    if (this.isComponentMounted) {
      this.setState({ context });
    }
  }

  async refreshData() {
    const articleSummaryList = await ArticleSummary.loadArticleSummaryList();
    const timeLatestRefresh = TimeX.getUnixTime();
    this.setState({
      articleSummaryList,
      timeLatestRefresh,
    });
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.refreshData();
  }

  async onClickRefresh() {
    await this.refreshData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async onSelectLanguage(lang) {
    this.setContext({ lang });
  }

  render() {
    const { articleSummaryList, timeLatestRefresh } = this.state;
    if (!articleSummaryList || articleSummaryList.length === 0) {
      return <CircularProgress />;
    }

    const articleSummaryListToDisplay = articleSummaryList.slice(
      0,
      MAX_ARTICLES_TO_DISPLAY
    );
    return (
      <Box sx={STYLE}>
        <Stack key={"articles-" + timeLatestRefresh} spacing={2}>
          {articleSummaryListToDisplay.map(function (articleSummary) {
            const fileName = articleSummary.fileName;
            return (
              <ArticleView
                key={"article-" + fileName}
                articleSummary={articleSummary}
              />
            );
          })}
        </Stack>
        <HomePageBottomNavigation
          timeLatestRefresh={timeLatestRefresh}
          onClickRefresh={this.onClickRefresh.bind(this)}
          onSelectLanguage={this.onSelectLanguage.bind(this)}
        />
      </Box>
    );
  }
}
