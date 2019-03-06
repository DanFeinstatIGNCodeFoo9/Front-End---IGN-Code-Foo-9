import React, { Component, Fragment } from "react";
import FeedItem from "../feedItem/FeedItem";

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      startIndex: 0,
      content: [],
      articles: [],
      videos: [],
    };
    //bind scroll event handler
    window.onscroll = () => {
      const {
        loadArticles,
        state: { error, isLoading, hasMore },
      } = this;

      if (error || isLoading || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 60
      ) {
        loadArticles();
      }
    };
  }

  componentWillMount() {
    this.loadArticles();
  }
  loadArticles = () => {
    this.setState({ isLoading: true }, () => {
      //The api given returns a access-cross-origin-header error.
      //Therefore I'm using a proxy to convince the api it is sending the data to itself.
      //I know this is a bit hacky and if I have time after building all the projects I'll try for a more elegant solution.
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      fetch(
        proxyurl +
          `https://ign-apis.herokuapp.com/content?startIndex=${
            this.state.startIndex
          }&count=20`
      )
        .then(res => res.json())
        .then(results => {
          const newContent = results.data.map(content => ({
            id: content.contentId,
            contentType: content.contentType,
            img: content.thumbnails[0].url,
            title: content.metadata.headline,
            description: content.metadata.description,
            publishDate: content.metadata.publishDate,
          }));
          let nextArticles = [];
          let nextVideos = [];
          for (let i = 0; i < newContent.length; i++) {
            if (newContent[i].contentType === "article") {
              nextArticles.push(newContent[i]);
            } else if (newContent[i].contentType === "video") {
              nextVideos.push(newContent[i]);
            }
          }

          this.setState(state => ({
            hasMore:
              this.state.articles.length + this.state.videos.length < 300,
            isLoading: false,
            startIndex: state.startIndex + 20,
            content: [...state.content, ...newContent],
            articles: [...state.articles, ...nextArticles],
            videos: [...state.videos, ...nextVideos],
          }));
        })
        .catch(err => {
          this.setState({
            err: err.message,
            isLoading: false,
          });
        });
    });
  };
  render() {
    const { error, hasMore, isLoading, content, articles, videos } = this.state;
    return (
      <div>
        {content.map(content => (
          <Fragment key={content.id}>
            <FeedItem
              date={content.publishDate}
              img={content.img}
              title={content.title}
              description={content.description}
            />
          </Fragment>
        ))}
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div>Loading...</div>}
      </div>
    );
  }
}

export default Feed;
