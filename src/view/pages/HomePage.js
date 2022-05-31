import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import ArticleSummary from "../../nonview/core/ArticleSummary";

import RefreshButton from "../../view/atoms/RefreshButton";
import ArticleView from "../../view/organisms/ArticleView";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

const MAX_ARTICLES_TO_DISPLAY = 10;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { articleSummaryList: null };
  }

  async componentDidMount() {
    this.setState({
      articleSummaryList: await ArticleSummary.loadArticleSummaryList(),
    });
  }

  render() {
    const { articleSummaryList } = this.state;
    if (!articleSummaryList) {
      return <CircularProgress />;
    }

    const articleSummaryListToDisplay = articleSummaryList.splice(
      0,
      MAX_ARTICLES_TO_DISPLAY
    );
    return (
      <Box sx={STYLE}>
        <RefreshButton />
        {articleSummaryListToDisplay.map(function (articleSummary) {
          const fileName = articleSummary.fileName;
          return (
            <ArticleView key={"article-" + fileName} fileName={fileName} />
          );
        })}
      </Box>
    );
  }
}
