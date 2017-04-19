import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  state = {
    filter: '',
  };

  handleChange = event => {
    this.setState({ filter: event.target.value });
    this.props.filterFunction(event.target.value);
  };

  handleSubmit = event => {
    if (
      this.state.filter !== '' && this.props.location.pathname !== '/search'
    ) {
      this.props.history.push('/search');
    }
    event.preventDefault();
  };

  render() {
    return (
      <header className="header">
        <nav className="links">
          <ul>
            <li>
              <Link className="title link" to="/">
                <img className="logo" alt="DW" src="/images/logo.svg" />
              </Link>
            </li>
            <li>
              <Link className="link" to="/archive">POSTS</Link>
            </li>
            <li>
              <a className="link" href="/atom.xml">RSS</a>
            </li>
            <li>
              <a className="link" href="https://twitter.com/_donniewest">
                TWITTER
              </a>
            </li>
            <li className="search">
              <form onSubmit={this.handleSubmit}>
                <label>
                  SEARCH:{' '}
                  <input
                    type="text"
                    value={this.state.filter}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="" style={{ display: 'none' }} />
              </form>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
