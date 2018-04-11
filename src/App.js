/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';





export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptors: [],
      descriptorID: [],
      renderedID: 149642,
      statusRender: ""

    }
  }


  componentWillMount() {
    fetch('https://jimmy.ampermusic.com/v1/data/descriptors')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(responseJson.descriptors[0].id);

        for (var i = 0; i < responseJson.descriptors.length; i++) {
          this.setState({
            descriptors: [...this.state.descriptors, responseJson.descriptors[i].name],
            descriptorID: [...this.state.descriptorID, responseJson.descriptors[i].id]
          })

        }
        console.log(this.state.descriptors);

      } )
      .catch((error) => { console.error(error)});
  }

  createProject() {
    fetch('https://jimmy.ampermusic.com/v1/projects', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer BS8pE7kQLjOauEDBSFnQ7kEbw4V2XSTsK5lHtF69I7rLIFVNfemBdbhIhXJ8cXQV',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "title": "Mobile Test4",
        "timeline": {
          "events": [
            {
              "event": "region",
              "time": 0,
              "descriptor": "happy_modern_folk"
            },
            {
              "event": "silence",
              "time": 30
            }
          ]
        }
    }),})
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    this.setState({
      renderedID: responseJson.id
    })
  })
  .catch((error) => {console.error(error)});

  }

  projectStatus() {
    fetch('https://jimmy.ampermusic.com/v1/projects/' + this.state.renderedID, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer BS8pE7kQLjOauEDBSFnQ7kEbw4V2XSTsK5lHtF69I7rLIFVNfemBdbhIhXJ8cXQV',
        'Content-Type': 'application/json',
      },})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
            statusRender: responseJson.status
        })
        console.log(this.state.statusRender);

        })
      .catch((error) => { console.error(error)});

  }

  renderStatus() {
    if (this.state.statusRender == 'created') {
      return ( <Text style={{fontSize: 20}}> Created! </Text> );
    } else if (this.state.statusRender == 'waiting_created') {
      return (<Text style={{fontSize: 20}}> Your song is still being created! </Text>);
    }
  }

  getFile() {
    console.log("YOYOYOY");
    fetch('https://jimmy.ampermusic.com/v1/render_files/' + this.state.renderedID, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer BS8pE7kQLjOauEDBSFnQ7kEbw4V2XSTsK5lHtF69I7rLIFVNfemBdbhIhXJ8cXQV',
        'Content-Type': 'application/json',
      },})
      .then((response) => console.log(response))
      .catch((error) => { console.error(error)});


  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Ampers first Mobile App!
        </Text>



        <TouchableOpacity onPress={this.createProject.bind(this)} style={styles.getDesc}>
            <Text>
              Render a project template!
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.projectStatus.bind(this)} style={styles.getDesc}>
            <Text>
              Get Project Status
            </Text>
        </TouchableOpacity>


        <View>
          {this.renderStatus()}
        </View>

        <TouchableOpacity onPress={this.getFile.bind(this)} style={styles.getDesc}>
            <Text>
              Get the created Song!
            </Text>
        </TouchableOpacity>








        <Text style={{fontSize: 25}}>
          Here are all the possible descriptors!
        </Text>

        <FlatList
          data={this.state.descriptors}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({item}) => <Text> {item} </Text>}
        />


      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    paddingTop: 20,
    fontSize: 20,
    margin: 10,
  },
  getDesc: {
    borderWidth: 1,
    padding: 5,
    borderColor: 'lightblue',

  }

};
