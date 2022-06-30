import { Component } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import I18N, { t } from "../../nonview/base/I18N";
import URLContext from "../../nonview/base/URLContext";
import ArticleSummary from "../../nonview/core/ArticleSummary";
import { ENT_ALL } from "../../nonview/core/Ent";

import CustomAppBar from "../../view/molecules/CustomAppBar";
import HomePageBottomNavigation from "../../view/molecules/HomePageBottomNavigation";
import ProgressiveList from "../../view/molecules/ProgressiveList";
import ArticleView from "../../view/organisms/ArticleView";

const STYLE = {
  width: 400,
  maxWidth: "90%",
  margin: "auto",
  marginTop: 5,
  marginBottom: 10,
};

const N_ARTICLE_INCR = 10;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = this.getContext();
    this.state = {
      context,
      articleSummaryList: null,
      entToGroup: null,
      groupToArticles: null,
    };
    this.isComponentMounted = false;
    this.setContext(context);
  }

  getContext() {
    let context = URLContext.getContext();
    if (!context.lang) {
      context.lang = I18N.getLang();
    }
    if (!context.ent) {
      context.ent = ENT_ALL;
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
    const { context } = this.state;
    const { ent } = context;

    let articleSummaryList;
    if (ent === ENT_ALL) {
      articleSummaryList = await ArticleSummary.loadArticleSummaryList();
    } else {
      articleSummaryList = await ArticleSummary.loadArticleSummaryListForEnt(
        ent
      );
    }

    this.setState({
      articleSummaryList,
    });
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.refreshData();
  }

  async onSelectLanguage(lang) {
    this.setContext({ lang });
  }

  render() {
    const { articleSummaryList, context } = this.state;
    if (!articleSummaryList) {
      return <CircularProgress />;
    }

    if (articleSummaryList.length === 0) {
      return <Alert severity="warning">No Articles</Alert>;
    }

    const { ent } = context;
    let entText;
    if (ent === ENT_ALL) {
      entText = null;
    } else {
      entText = (
        <Typography variant="body1" sx={{ m: 0, p: 0 }}>
          {t('Articles mentioning "000"', ent)}
        </Typography>
      );
    }

    return (
      <Box sx={STYLE}>
        <CustomAppBar />
        <Stack spacing={2}>
          {entText}
          <ProgressiveList
            list={articleSummaryList}
            nItemIncrement={N_ARTICLE_INCR}
            renderListItem={(articleSummary) => {
              const fileName = articleSummary.fileName;
              return (
                <ArticleView
                  key={"article-" + fileName}
                  articleSummary={articleSummary}
                />
              );
            }}
          />
        </Stack>
        <HomePageBottomNavigation
          onSelectLanguage={this.onSelectLanguage.bind(this)}
        />
      </Box>
    );
  }
}
