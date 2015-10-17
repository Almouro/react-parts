/*jshint esnext:true, browserify:true, unused:true */
'use strict';

import React from 'react/addons';
import StylingMixin from '../helpers/styling-mixin.jsx';
import ComponentItem from './item-component.jsx';

let PureRenderMixin = React.addons.PureRenderMixin;

let NoComponents = React.createClass({
  mixins: [StylingMixin, PureRenderMixin],
  render() {
    let styles = {
      container: {
        background: "#fff",
        margin: 1,
        padding: this.remCalc(15, 20),
        color: "#999",
      },
      message: {
        width: "100%",
        textAlign: "center",
      }
    };
    return (
      <div style={styles.container}>
        <p style={styles.message}>No components found.</p>
      </div>
    );
  }
});

let LoadingComponents = React.createClass({
  mixins: [StylingMixin, PureRenderMixin],
  render() {
    let styles = {
      container: {
        background: "#fff",
        margin: 1,
        padding: this.remCalc(20, 0, 15),
        textAlign: "center",
        width: "100%"
      },
      img: {
        width: this.remCalc(50),
        opacity: 0.2
      }
    };
    return (
      <div style={styles.container}>
        <img style={styles.img} src="/loader.gif" alt="Loading…" />
      </div>
    );
  }
});

let ComponentList = React.createClass({
  mixins: [StylingMixin, PureRenderMixin],
  propTypes: {
    components: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool,
    debugMode: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      debugMode: false
    };
  },
  render() {
    let styles = {
      listStyle: "none",
      margin: 0,
      padding: 0
    };
    let components = this.props.components.map((item, index) => {
      return (
        <li key={index}>
          <ComponentItem {...item} debugMode={ this.props.debugMode } />
        </li>
      );
    });

    if (this.props.loading) {
      return (
        <LoadingComponents />
      );
    } else if (components.length === 0) {
      return (
        <NoComponents />
      );
    }

    return (
      <ul style={styles}>
        {components}
      </ul>
    );
  }
});

export default ComponentList;
