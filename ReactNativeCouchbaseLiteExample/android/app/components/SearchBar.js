'use strict';

var React = require('react-native');
var {
  Image,
  Platform,
  ProgressBarAndroid,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} = React;

// look up what this is for
var IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21;

var SearchBar = React.createClass({
  render: function() {
    var loadingView = <View style={styles.spinner} />
    var background = IS_RIPPLE_EFFECT_SUPPORTED ?
      TouchableNativeFeedback.SelectableBackgroundBorderless() :
      TouchableNativeFeedback.SelectableBackground();
    return (
      <View style={styles.searchBar}>
      <TouchableNativeFeedback
          background={background}
          >
        <View>
          <Image
            source={require('image!android_search_white')}
            style={styles.icon}
          />
        </View>
      </TouchableNativeFeedback>
      <TextInput
        ref="input"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onChange={this.props.onSearchChange}
        placeholder="Search a book..."
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        style={styles.searchBarInput}
      />
      {loadingView}
    </View>
    );
  }
});

var styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    padding: 0,
    backgroundColor: 'transparent'
  },
  spinner: {
    width: 30,
    height: 30,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
});

module.exports = SearchBar;
