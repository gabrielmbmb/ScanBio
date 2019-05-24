import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import { randomSports, randomEthnic } from '../lib/Random';
import DataTableArray from './DataTableArray';

const styles = StyleSheet.create({
  dataTable: {
    margin: 20,
    borderWidth: 2,
    borderColor: '#ebebeb',
    backgroundColor: 'white',
    elevation: 1
  },
  container: {
    height: Dimensions.get('window').height,
  }
});

class ShowData extends Component {

  sportTitles = [
    {
      numeric: false,
      title: 'Deporte'
    },
    {
      numeric: false,
      title: 'Nombre'
    },    
    {
      numeric: false,
      title: 'Rendimiento'
    },
  ];

  sportData = randomSports();

  ethnicTitles = [
    {
      numeric: false,
      title: 'País'
    },
    {
      numeric: false,
      title: 'Nombre'
    },
    {
      numeric: false,
      title: 'Porcentaje'
    },
  ];

  ethnicData = randomEthnic();

  analyticsTitles = [
    {
      numeric: false,
      title: 'Indicador'
    },
    {
      numeric: false,
      title: 'Valor'
    }
  ];

  analyticsData = [
    {
      name: 'Globulos',
      value: '15mg'
    },
  ];

  diseasesTitles = [
    {
      numeric: false,
      title: 'Enfermedad'
    },
    {
      numeric: false,
      title: 'Probabilidada'
    }
  ];

  diseasesData = [
    {
      name: 'Cancer',
      probability: '100%'
    }
  ];

  renderSportsTable = () => {
    const { navigation } = this.props;
    const sports = navigation.getParam('sports', true);

    if (sports) {
      return(
        <DataTableArray
          type="sports"
          titles={this.sportTitles}
          data={this.sportData}
        />
      );
    }

    return null;
  };

  renderEthnicTable = () => {
    const { navigation } = this.props;
    const ethnic = navigation.getParam('ethnic', true);

    if (ethnic) {
      return(
        <DataTableArray
          type="ethnic"
          titles={this.ethnicTitles}
          data={this.ethnicData}
        />
      );
    }

    return null;
  };

  renderAnalyticsTable = () => {
    const { navigation } = this.props;
    const analytics = navigation.getParam('analytics', true);

    if (analytics) {
      return(
        <DataTableArray
          type="analytics"
          titles={this.analyticsTitles}
          data={this.analyticsData}
        />
      );
    }

    return null;
  };

  renderDiseasesTable = () => {
    const { navigation } = this.props;
    const diseases = navigation.getParam('diseases', true);

    if (diseases) {
      return(
        <DataTableArray
          type="diseases"
          titles={this.diseasesTitles}
          data={this.diseasesData}
        />
      );
    }

    return null;

  };

  render(){
    const { navigation, theme } = this.props;
    const { colors } = theme;
    return(
      <View style={[{backgroundColor: colors.background}, styles.container]}>        
        <Appbar.Header>
        <Appbar.BackAction 
          onPress={() => navigation.navigate('Home')}
        />
        <Appbar.Content 
          title="ScanBio"
          subtitle="Resultados"
        />
        </Appbar.Header>
        <ScrollView>
          {this.renderSportsTable()}
          {this.renderEthnicTable()}
          {this.renderAnalyticsTable()}
          {this.renderDiseasesTable()}
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(ShowData);