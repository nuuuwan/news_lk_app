import { Component } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import Article from "../../nonview/core/Article";
import TranslatedArticle from "../../nonview/core/TranslatedArticle";

import ArticleViewMolecule from "../../view/molecules/ArticleViewMolecule";

export default class ArticleView extends Component {
  constructor(props) {
    super(props);
    this.state = { article: null };
  }

  async componentDidMount() {
    const { articleSummary } = this.props;
    const article = await Article.loadArticle(articleSummary.fileName);

    let translatedArticle = null;
    if (articleSummary.isTranslated) {
      translatedArticle = await TranslatedArticle.loadTranslatedArticle(
        articleSummary.fileName
      );
    }

    this.setState({
      article,
      translatedArticle,
    });
  }

  render() {
    const { articleSummary } = this.props;
    const { translatedArticle, article } = this.state;
    if (!article) {
      return <CircularProgress />;
    }
    return (
      <ArticleViewMolecule
        articleSummary={articleSummary}
        article={article}
        translatedArticle={translatedArticle}
      />
    );
  }
}
