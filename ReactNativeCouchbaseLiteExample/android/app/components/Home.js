
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} = React;


import {manager, ReactCBLite} from 'react-native-couchbase-lite'
ReactCBLite.init(5984, 'admin', 'password');


var Home = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  },
  componentDidMount() {
    
    var database = new manager('http://admin:password@localhost:5984/', 'myapp');

    database.createDatabase()
      .then((res) => {
        database.replicate('http://localhost:4984/demoapp', 'myapp')
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
      .catch((ex) => {
        console.log(ex)
      })

  
  },
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBookList}
        style={styles.listView}/>
    )
  },
  renderBookList(book) {
    var book = book.doc;
    var thumbnailPath = require('../img/' + book.posters.thumbnail)
    var icon = this.props.active ? require('./my-icon-active.png') : require('./my-icon-inactive.png');
    return (
      <View style={styles.container}>
        <Image 
          source={thumbnailPath} 
          style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.year}>{book.year}</Text>
        </View>
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
  },
  listView: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Home;