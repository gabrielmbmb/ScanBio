import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import { withTheme, Headline } from 'react-native-paper';

const styles = StyleSheet.create({
  view: {
    height: Dimensions.get('window').height,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 600,
    height: 600
  }
});

class SplashWindow extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(
      () => navigation.navigate('Home'),
      3000
    );
  }

  componentWillUnmount() {
    clearInterval(this._intervalSplash);
  }

  render() {
    const { colors } = this.props.theme;
  
    return(
      <View style={[{backgroundColor: colors.primary}, styles.view]}>
        <Image 
          source={require('../../assets/logo_transparent.png')}
          style={styles.image}
        />
      </View>
    );
  }
}

export default withTheme(SplashWindow);

