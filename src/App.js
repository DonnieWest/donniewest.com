import React, { Component } from 'react';
import './sanitize.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Newsletter from './components/Newsletter';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import Post from './components/Post';
import Archive from './components/Archive';
import NotFound from './components/NotFound';
import Search from './components/Search';
import posts from './posts.json';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      filter: '',
    };
  }

  setFilter = filter => {
    this.setState({ filter });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header filterFunction={this.setFilter} />
            <div className="main">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => <PostList posts={posts} />}
                />
                <Route
                  exact
                  path="/archive"
                  component={() => <Archive posts={posts} />}
                />
                <Route
                  exact
                  path="/search"
                  component={() => (
                    <Search posts={posts} filter={this.state.filter} />
                  )}
                />
                {posts.map(post => (
                  <Route
                    path={`/${post.slug}`}
                    component={() => <Post post={post} />}
                  />
                ))}
                <Route component={NotFound} />
              </Switch>
              <Route exact path="/" component={Newsletter} />
              <Footer />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
