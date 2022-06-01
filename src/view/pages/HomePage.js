import * as React from "react";
import { Component } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import { TimeX } from "@nuuuwan/utils-js-dev";

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
    this.state = { articleSummaryList: null };
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
    await this.refreshData();
  }

  async onClickRefresh() {
    await this.refreshData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    const { articleSummaryList, timeLatestRefresh } = this.state;
    if (!articleSummaryList) {
      return <CircularProgress />;
    }

    const articleSummaryListToDisplay = articleSummaryList.splice(
      0,
      MAX_ARTICLES_TO_DISPLAY
    );
    return (
      <Box sx={STYLE}>
        <Stack key={"articles-" + timeLatestRefresh} spacing={2}>
          {articleSummaryListToDisplay.map(function (articleSummary) {
            const fileName = articleSummary.fileName;
            return (
              <ArticleView key={"article-" + fileName} fileName={fileName} />
            );
          })}
        </Stack>
        <HomePageBottomNavigation
          timeLatestRefresh={timeLatestRefresh}
          onClickRefresh={this.onClickRefresh.bind(this)}
        />
      </Box>
    );
  }
}
