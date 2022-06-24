import { Component } from "react";

import Article from "../../nonview/core/Article";

import ArticleViewMolecule from "../../view/molecules/ArticleViewMolecule";

export default class ArticleView extends Component {
  constructor(props) {
    super(props);
    this.state = { article: null };
  }

  async componentDidMount() {
    const { articleSummary } = this.props;
    const article = await Article.loadArticle(articleSummary.fileName);
    this.setState({
      article,
    });
  }

  render() {
    const { articleSummary } = this.props;
    const { article } = this.state;
    if (!article) {
      return null;
    }
    return (
      <ArticleViewMolecule articleSummary={articleSummary} article={article} />
    );
  }
}
