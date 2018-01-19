import React, { Component } from 'react'

class Layout extends Component {
  render() {
    return (
        <div id="wrapper">
            <div id="main-container">
                <div id="main-content">
                    <section className="right-section">{this.props.children}</section>
                </div>
            </div>
        </div>
    );
  }
}

export default Layout;
