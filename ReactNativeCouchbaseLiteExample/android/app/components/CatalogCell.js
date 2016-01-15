
'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;

var CatalogCell = React.createClass({
  render: function() {
  	var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
    	<View>
	      <TouchableElement
	        onPress={this.props.onSelect}>
		      <View style={styles.container}>
		        <Image 
		          source={{uri:'http://127.0.0.1:5984/demoapp/cb96ef7523e03e8303c75d7eb93d65c4/pic100.jpg'}} 
		          style={styles.thumbnail} />
		        <View style={styles.rightContainer}>
		          <Text style={styles.title}>{this.props.book.title}</Text>
		          <Text style={styles.year}>{this.props.book.year}</Text>
		        </View>
		      </View>
		    </TouchableElement>
		  </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {  
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  }
});

module.exports = CatalogCell;