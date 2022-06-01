import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import { TimeX } from "@nuuuwan/utils-js-dev";

import ArticleSummary from "../../nonview/core/ArticleSummary";

import RefreshButton from "../../view/atoms/RefreshButton";
import ArticleView from "../../view/organisms/ArticleView";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

const MAX_ARTICLES_TO_DISPLAY = 100;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { articleSummaryList: null };
  }

  async reloadData() {
    const articleSummaryList = await ArticleSummary.loadArticleSummaryList();
    const timeLatestReload = TimeX.getUnixTime();
    this.setState({
      articleSummaryList,
      timeLatestReload,
    });
  }

  async componentDidMount() {
    await this.reloadData();
  }

  async onClickRefresh() {
    await this.reloadData();
  }

  render() {
    const { articleSummaryList, timeLatestReload } = this.state;
    if (!articleSummaryList) {
      return <CircularProgress />;
    }

    const articleSummaryListToDisplay = articleSummaryList.splice(
      0,
      MAX_ARTICLES_TO_DISPLAY
    );
    return (
      <Box sx={STYLE}>
        <RefreshButton onClick={this.onClickRefresh.bind(this)} />
        <Stack key={"articles-" + timeLatestReload} spacing={2}>
          {articleSummaryListToDisplay.map(function (articleSummary) {
            const fileName = articleSummary.fileName;
            return (
              <ArticleView key={"article-" + fileName} fileName={fileName} />
            );
          })}
        </Stack>
      </Box>
    );
  }
}
