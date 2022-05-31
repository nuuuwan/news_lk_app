import * as React from "react";
import { Component } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import ArticleSummary from "../../nonview/core/ArticleSummary";
import ArticleView from "../../view/organisms/ArticleView";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

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
    return (
      <Box sx={STYLE}>
        {articleSummaryList.map(function (articleSummary) {
          const fileName = articleSummary.fileName;
          return (
            <ArticleView key={"article-" + fileName} fileName={fileName} />
          );
        })}
      </Box>
    );
  }
}
