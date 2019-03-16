import React, { Component, Fragment } from "react";
import { Transition, animated, config } from "react-spring/renderprops";

import FeedItem from "../feedItem/FeedItem";
import moment from "moment";

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      startIndex: 0,
      //   startIndexArticles: 0,
      //   startIndexVideos: 0,
      content: [],
      articles: [],
      videos: [],
      toDisplay: [],
      comments: [],
      fetchingComments: false,
    };

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

  componentDidMount() {
    this.loadArticles();
  }

  componentDidUpdate(prevState, prevProps) {
    if (
      prevState.filter !== this.props.filter ||
      prevProps.startIndex !== this.state.startIndex
    ) {
      setTimeout(() => {
        let newDisplay =
          this.props.filter === `latest`
            ? [...this.state.content]
            : [...this.state[this.props.filter]];
        this.setState({
          toDisplay: newDisplay,
        });
      }, 300);
    }
  }

  fetchCommentNumber = () => {
    let commentsurl = `https://ign-apis.herokuapp.com/comments?ids=`;
    for (let i = this.state.startIndex - 20; i < this.state.startIndex; i++) {
      if (i + 1 === this.state.startIndex) {
        commentsurl += `${this.state.content[i].id}`;
      } else {
        commentsurl += `${this.state.content[i].id},`;
      }
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + commentsurl)
      .then(res => res.json())
      .then(results => {
        const newComments = results.content;

        this.setState(state => ({
          comments: [...state.comments, ...newComments],
          fetchingComments: false,
        }));
      });
  };

  loadArticles = () => {
    if (!this.state.fetchingComments) {
      this.setState({ isLoading: true }, () => {
        //The api given returns a access-cross-origin-header error.
        //Therefore I'm using a proxy to convince the api it is sending the data to itself.
        //I know this is a bit hacky and if I have time after building all the projects I'll try for a more elegant solution.
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        console.log(
          proxyurl +
            `https://ign-apis.herokuapp.com/content?startIndex=${
              this.state.startIndex
            }&count=20`
        );
        fetch(
          proxyurl +
            `https://ign-apis.herokuapp.com/content?startIndex=${
              this.state.startIndex
            }&count=20`
        )
          // .then(res => console.log(res));
          .then(res => res.json())
          .then(results => {
            console.log(results.data);

            moment.updateLocale("en", {
              relativeTime: {
                future: "in %s",
                past: "%s",
                s: function(number, withoutSuffix, key, isFuture) {
                  return number + "s";
                },
                m: "1m",
                mm: function(number, withoutSuffix, key, isFuture) {
                  return number + "m";
                },
                h: "1h",
                hh: "%dh",
                d: "1d",
                dd: "%dd",
                M: "1m",
                MM: "%dm",
                y: "1y",
                yy: "%dy",
              },
            });
            let newContent = results.data.map(content => ({
              id: content.contentId,
              contentType: content.contentType,
              img: content.thumbnails[0],
              title: content.metadata.headline,
              description: content.metadata.description,
              //   publishDate: content.metadata.publishDate,
              publishDate: moment(content.metadata.publishDate).fromNow(),
              comments: null,
            }));
            console.log(results.data[0].thumbnails[0].url);
            let nextArticles = [];
            let nextVideos = [];
            for (let i = 0; i < newContent.length; i++) {
              if (newContent[i].contentType === "article") {
                nextArticles.push(newContent[i]);
              } else if (newContent[i].contentType === "video") {
                nextVideos.push(newContent[i]);
              }
            }
            this.setState(
              state => ({
                hasMore: state.content.length < 300,
                isLoading: false,
                startIndex: state.startIndex + 20,
                content: [...state.content, ...newContent],
                articles: [...state.articles, ...nextArticles],
                videos: [...state.videos, ...nextVideos],
                fetchingComments: true,
              }),
              () => {
                this.fetchCommentNumber();
              }
            );
          })
          .catch(err => {
            this.setState({
              err: err.message,
              isLoading: false,
            });
          });
      });
    }
  };

  render() {
    const {
      error,
      hasMore,
      isLoading,
      content,
      articles,
      videos,
      comments,
    } = this.state;
    return (
      //     <Transition
      //     items={this.props.filter}
      //     from={{ opacity: 0 }}
      //     enter={{ opacity: 1 }}
      //     leave={{ opacity: 0 }}
      //     config={config.stiff}
      //   >
      //     {show =>
      //       show &&
      //       (props => (
      //         <div style={props}>
      //           {this.state.toDisplay.map(video => (
      //             <Fragment key={video.id}>
      //               <FeedItem
      //                 id={video.id}
      //                 date={video.publishDate}
      //                 img={video.img}
      //                 title={video.title}
      //                 description={video.description}
      //                 comments={comments}
      //                 filter={this.props.filter}
      //               />
      //             </Fragment>
      //           ))}
      //         </div>
      //       ))
      //     }
      //   </Transition>
      <div>
        {this.props.filter === `videos` ? (
          <Transition
            items={this.props.vidFilter}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            config={config.stiff}
          >
            {show =>
              show &&
              (props => (
                <div style={props}>
                  {this.state.toDisplay.map(video => (
                    <Fragment key={video.id}>
                      <FeedItem
                        id={video.id}
                        date={video.publishDate}
                        img={video.img}
                        title={video.title}
                        description={video.description}
                        comments={comments}
                        filter={this.props.filter}
                      />
                    </Fragment>
                  ))}
                </div>
              ))
            }
          </Transition>
        ) : this.props.filter === `articles` ? (
          <Transition
            items={this.props.artFilter}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            config={config.stiff}
          >
            {show =>
              show &&
              (props => (
                <div style={props}>
                  {this.state.toDisplay.map(article => (
                    <Fragment key={article.id}>
                      <FeedItem
                        id={article.id}
                        date={article.publishDate}
                        img={article.img}
                        title={article.title}
                        description={article.description}
                        comments={comments}
                        filter={this.props.filter}
                      />
                    </Fragment>
                  ))}
                </div>
              ))
            }
          </Transition>
        ) : (
          <Transition
            items={this.props.latFilter}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            config={config.stiff}
          >
            {show =>
              show &&
              (props => (
                <div style={props}>
                  {this.state.toDisplay.map(content => (
                    <Fragment key={content.id}>
                      <FeedItem
                        id={content.id}
                        date={content.publishDate}
                        img={content.img}
                        title={content.title}
                        description={content.description}
                        comments={comments}
                        filter={this.props.filter}
                      />
                    </Fragment>
                  ))}
                </div>
              ))
            }
          </Transition>
        )}
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {!hasMore && <div>No more content!</div>}
      </div>
    );
  }
}

export default Feed;
