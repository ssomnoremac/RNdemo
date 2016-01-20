
'use strict';

var React = require('react-native');
var SearchBar = require('./SearchBar')

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} = React;

import {manager, ReactCBLite} from 'react-native-couchbase-lite'
ReactCBLite.init(5984, 'admin', 'password');

var CatalogCell = require('./CatalogCell');
var Home = React.createClass({
  getInitialState() {
    return {
      text: 'initial text',
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },
  componentDidMount() {

    var database = new manager('http://admin:password@localhost:5984/', 'demoapp');
    database.createDatabase()
      .then((res) => {
        database.replicate('https://ssomnoremac:bookworms@ssomnoremac.cloudant.com/demoapp', 'demoapp')
      })
      .then((res) => {
        return database.getAllDocuments()
      })
      .then((res) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.rows)
        });
        console.log(res.rows)
      })
      .catch((ex) => {file:///android_asset/
        console.log(ex)
      })
  },
  selectBook(book) {
    // fix for iOS/Android dismiss keyboard needs to be added
    this.props.navigator.push({
      title: book.title,
      name: 'reader',
      book: book,
    });
  },
  renderRow(data) {
    var book = data.doc
    return (
      <CatalogCell
        key= {book.id}
        onSelect={() => this.selectBook(book)}
        book={book}
        style={styles.catalogCell} />
    );
  },

  // search functionality
  onSearchChange: function(event: Object) {
    var filter = event.nativeEvent.text.toLowerCase();
    this.searchMovies(filter)
  },
  searchMovies: function(query: string) {
    this.setState({ text: query })
  },

  render() {
    return (
      <View>
        <SearchBar
        isLoading={this.state.isLoading}
        onSearchChange={this.onSearchChange}
        />
        <Text>{this.state.text}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.listView} />
      </View>
    )
  },
});


var styles = StyleSheet.create({
  catalogCell: {
    flex: 1
  },
  listView: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Home;
