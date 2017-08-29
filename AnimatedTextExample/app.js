import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import AnimatedText from 'react-native-animated-text'

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(
  ' ',
)

const generateText = () =>
  Array(3 + Math.floor(Math.random() * 20))
    .fill(null)
    .map(() => LOREM_IPSUM[Math.floor(Math.random() * LOREM_IPSUM.length)])
    .join(' ')

export default class AnimatedTextExample extends Component {
  state = {
    text: 'Hello World',
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 100 }}>
          <Button
            title="Change Text"
            onPress={() =>
              this.setState({
                text: generateText(),
              })}
          />
        </View>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#ccc',
            width: 200,
            height: 100,
          }}
        >
          <AnimatedText>{this.state.text}</AnimatedText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
})
