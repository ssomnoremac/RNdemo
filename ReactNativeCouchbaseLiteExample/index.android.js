/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Home = require('./android/app/components/Home');
var {
  AppRegistry,
  StyleSheet,
  View
  } = React;



var ReactNativeCouchbaseLiteExample = React.createClass({
  render: function () {
    return (
      <Home></Home>
    );
  }
});


AppRegistry.registerComponent('ReactNativeCouchbaseLiteExample', () => ReactNativeCouchbaseLiteExample);
