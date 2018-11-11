import React, { Component } from 'react';

import {
  View, TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

import Tweet from '../components/tweet';

export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Início',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon style={{ marginRight: 20 }} name="add-circle-outline" size={24} color="#4BB0EE" />
      </TouchableOpacity>
    ),
  });

  state = {
    tweets: [],
  };

  async componentDidMount() {
    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  render() {
    const { tweets } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={tweet => tweet._id}
          data={tweets}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
