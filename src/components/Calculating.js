import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { ProgressBar, Headline , withTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height
  },
  box: {
    padding: 35
  },
  image: {
    width: 450,
    height: 450,
    alignSelf: 'center'
  },
  headline: {
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});

class Calculating extends Component {
  state = {
    progress: 0
  };

  componentDidMount() {
    this._interval = setInterval(
      () => 
      this.setState(state => ({
        progress: state.progress < 1 ? state.progress + 0.01 : 0,
      })),
      50
    );
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  componentDidUpdate() {
    const { progress } = this.state;
    if (progress > 1) {
      this.navigateToShowData();
    }
  }

  renderCalculate() {
    const { progress } = this.state;

    if (progress < 0.3) {
      return(
        <View style={styles.box}>
          <Headline>Obteniendo datos...</Headline>
          <ProgressBar progress={progress} />
        </View>
      );
    } else if (progress < 0.5 && progress > 0.3) {
      return(
        <View style={styles.box}>
          <Headline>Calculando género y edad...</Headline>
          <ProgressBar progress={progress} />
        </View>
      );
    } else if (progress < 0.65 && progress > 0.5) {
      return(
        <View style={styles.box}>
          <Headline>Calculando deportes...</Headline>
          <ProgressBar progress={progress} />
        </View>
      );
    } else if (progress < 0.85 && progress > 0.65) {
      return(
        <View style={styles.box}>
          <Headline>Calculando origen étnico...</Headline>
          <ProgressBar progress={progress} />
        </View>
      );
    } else {
      return(
        <View style={styles.box}>
          <Headline>Calculando enfermedades y analítica...</Headline>
          <ProgressBar progress={progress} />
        </View>
      );
    }
  }

  navigateToShowData() {
    const { navigation } = this.props;
    const sports = navigation.getParam('sports', true);
    const diseases = navigation.getParam('diseases', true);
    const ethnic = navigation.getParam('ethnic', true);
    const analytics = navigation.getParam('analytics', true);

    navigation.navigate('ShowData', {
      analytics, sports, diseases, ethnic
    });
  }

  render () {
    const { colors } = this.props.theme;
    return(
      <View style={[{backgroundColor: colors.background}, styles.container]}>
        <Image 
          source={require('../../assets/logo_transparent.png')}
          style={styles.image}
        />
        <Headline style={styles.headline}>Ya puede retirar el dedo</Headline>
        {this.renderCalculate()}
      </View>
    );  
  }
}

export default withTheme(Calculating);