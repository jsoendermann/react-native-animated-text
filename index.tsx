import * as React from 'react'
import { Animated, Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native'

export interface AnimatedTextProps {
  children: string
  textStyle?: TextStyle
  slideDuration?: number
  slideHeight?: number
}

export interface AnimatedTextState {
  previousText: string
  currentText: string
  slide: Animated.Value
  hidden: boolean
}

export default class AnimatedText extends React.Component<AnimatedTextProps, AnimatedTextState> {
  static defaultProps: Partial<AnimatedTextProps> = {
    textStyle: {},
    slideDuration: 500,
    slideHeight: 15,
  }

  constructor(props: AnimatedTextProps) {
    super(props)

    this.state = {
      previousText: '',
      currentText: props.children,
      slide: new Animated.Value(1),
      hidden: false,
    } as AnimatedTextState
  }

  componentWillReceiveProps(newProps: AnimatedTextProps) {
    if (this.props.children !== newProps.children) {
      this.setState(
        {
          previousText: this.props.children,
          currentText: newProps.children,
          hidden: true,
        },
        () => {
          this.setState({ slide: new Animated.Value(0), hidden: false }, () => {
            Animated.timing(this.state.slide, {
              toValue: 1,
              duration: this.props.slideDuration!,
            }).start()
          })
        },
      )
    }
  }

  render() {
    const previousTextYOffset = this.state.slide.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -this.props.slideHeight!],
    })

    const previousOpacity = this.state.slide.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })

    const currentTextYOffset = this.state.slide.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.slideHeight!, 0],
    })

    const currentOpacity = this.state.slide.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: previousOpacity,
              transform: [{ translateY: previousTextYOffset }],
            },
          ]}
        >
          <Text style={this.props.textStyle}>{this.state.previousText}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: currentOpacity,
              transform: [{ translateY: currentTextYOffset }],
            },
          ]}
        >
          <Text style={this.props.textStyle}>{this.state.currentText}</Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textContainer: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
})
