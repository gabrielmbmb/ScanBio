import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Title, Button, withTheme, Text } from 'react-native-paper';
import TextSwitch from './TextSwitch';
import FingerDialog from './FingerDialog';
import { LocalAuthentication } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 30
  },
  button: {
    marginTop: 50,
    alignSelf: 'center',
  },
  buttonDimensions: {
    height: 75,
    width: 250
  },
  view: {
    height: Dimensions.get('window').height
  },
  viewSelectors: {
    borderWidth: 1,
    borderColor: '#ebebeb',
    padding: 30,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    elevation: 1
  }
});


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      analytics: true,
      sports: true,
      diseases: true,
      ethnic: true,
      dialogVisible: false,
    };
  }

  _onChangeSport() {
    this.setState({ sports: !this.state.sports });
  }

  _onChangeDiseases() {
    this.setState({ diseases: !this.state.diseases });
  }

  _onChangeEthnic() {
    this.setState({ ethnic: !this.state.ethnic });
  }

  _onChangeAnalytics() {
    this.setState({ analytics: !this.state.analytics });
  }

  doAuth = () => {
    this.setState({ dialogVisible: true});
    this.scanFingerPrint();
  };

  onDismiss = () => {
    this.setState({ hasTouchSensor: false });
    this.finishAuth();
  };

  finishAuth = () => {
    this.setState({ dialogVisible: false });
    LocalAuthentication.cancelAuthenticate();
  };

  checkDeviceFingerPrint = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkSavedFingerPrint = async () => {
    let fingerPrints = await LocalAuthentication.isEnrolledAsync();
    this.setState({ fingerPrints });
  };

  scanFingerPrint = async () => {
    const { 
      analytics, 
      sports, 
      diseases, 
      ethnic,
      hasTouchSensor
    } = this.state;
    
    const { navigation } = this.props;

    let result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      navigation.navigate('Calculating', {
        analytics, sports, diseases, ethnic
      });
    } else if (result.error && hasTouchSensor) {
      navigation.navigate('Calculating', {
        analytics, sports, diseases, ethnic
      });    
    }

    this.finishAuth();
  };

  componentDidMount () {
    this.checkDeviceFingerPrint();
    this.checkSavedFingerPrint();
  }

  render() {
    const { 
      analytics, 
      sports, 
      diseases, 
      ethnic, 
      dialogVisible, 
      fingerPrints, 
      compatible 
    } = this.state;

    const { colors } = this.props.theme;

    return (
      <View style={[{ backgroundColor: colors.background}, styles.view ]}>
        <Appbar.Header>
          <Appbar.Content
            title="ScanBio"
          />
        </Appbar.Header>

        <View style={styles.container}>
          <View style={styles.viewSelectors}>
            <Title style={styles.title}>Información a mostrar</Title>
            <TextSwitch 
              text="Deportes" 
              value={sports}
              onValueChange={() => this._onChangeSport()}
            />
            <TextSwitch 
              text="Enfermedades" 
              value={diseases}
              onValueChange={() => this._onChangeDiseases()}
            />
            <TextSwitch 
              text="Origen étnico" 
              value={ethnic}
              onValueChange={() => this._onChangeEthnic()}
            />
            <TextSwitch 
              text="Analítica" 
              value={analytics}
              onValueChange={() => this._onChangeAnalytics()}
            />
          </View>

          <Button 
            icon="fingerprint" 
            style={styles.button}
            contentStyle={styles.buttonDimensions}
            mode="contained"
            disabled={!(fingerPrints && compatible)}
            onPress={() => this.doAuth()}
          >
            Comenzar
          </Button>
        </View>

        <FingerDialog 
          visible={dialogVisible}
          onDismiss={() => this.onDismiss()}
        />
      </View>
    );
  }
}

export default withTheme(HomeScreen);