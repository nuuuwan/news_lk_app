import { Component } from "react";

import TranslatedArticle from "../../nonview/core/TranslatedArticle";

import ArticleViewMolecule from "../../view/molecules/ArticleViewMolecule";

export default class ArticleView extends Component {
  constructor(props) {
    super(props);
    this.state = { article: null };
  }

  async componentDidMount() {
    const { articleSummary } = this.props;
    const translatedArticle = await TranslatedArticle.loadTranslatedArticle(
      articleSummary.fileName
    );
    this.setState({
      translatedArticle,
    });
  }

  render() {
    const { articleSummary } = this.props;
    const { translatedArticle } = this.state;
    return (
      <ArticleViewMolecule
        articleSummary={articleSummary}
        translatedArticle={translatedArticle}
      />
    );
  }
}
