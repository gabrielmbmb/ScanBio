import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { withTheme, DataTable, Headline, Divider } from 'react-native-paper';
import { MapView } from 'expo';
import Emoji from 'react-native-emoji';

const styles = StyleSheet.create({
  dataTable: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ebebeb',
    backgroundColor: 'white',
    elevation: 1
  },
  emoji : {
    fontSize: 25,
    alignSelf: 'center'
  },
  headline: {
    marginLeft: 10,
    fontWeight: 'bold'
  },
  mapview: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height / 2,
    alignSelf: 'center',
  },
});

class DataTableArray extends Component {

  renderTable() {
    const { titles, data, type } = this.props;

    if (type === 'sports') {
      return(
        <DataTable>
          <Headline style={styles.headline}>
            <Emoji name="sports_medal" style={styles.emoji} /> Deportes:
          </Headline>
          <Divider />
          <DataTable.Header>
            {titles.map((title, key) => {
              if (title.numeric) {
                return(
                  <DataTable.Title numeric key={key}>{title.title}</DataTable.Title>
                );
              }

              return(
                <DataTable.Title key={key}>{title.title}</DataTable.Title>
              );
            })}
          </DataTable.Header>

          {data.map((item, key) => {
            return(
              <DataTable.Row key={key}>
                <DataTable.Cell>
                  <Emoji name={item.emoji} style={styles.emoji} />
                </DataTable.Cell>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.performance}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      );
    }

    if (type === 'diseases') {
      return(
        <DataTable>
          <Headline style={styles.headline}>
            <Emoji name="earth_africa" style={styles.emoji} /> Enfermedades:
          </Headline>
          <Divider />
          <DataTable.Header>
            {titles.map((title, key) => {
              if (title.numeric) {
                return(
                  <DataTable.Title numeric key={key}>{title.title}</DataTable.Title>
                );
              }

              return(
                <DataTable.Title key={key}>{title.title}</DataTable.Title>
              );
            })}
          </DataTable.Header>

          {data.map((item, key) => {
            return(
              <DataTable.Row key={key}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.probability}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      );
    }

    if (type === 'ethnic') {
      return(
        <DataTable>
          <Headline style={styles.headline}>
            <Emoji name="earth_africa" style={styles.emoji} /> Origen Étnico:
          </Headline>
          <Divider />
          <MapView style={styles.mapview}>
            <MapView.Marker coordinate={{
              latitude: 40.463669,
              longitude: -3.749220
            }} />
          </MapView>
          <Divider />          
          <DataTable.Header>
            {titles.map((title, key) => {
              if (title.numeric) {
                return(
                  <DataTable.Title numeric key={key}>{title.title}</DataTable.Title>
                );
              }

              return(
                <DataTable.Title key={key}>{title.title}</DataTable.Title>
              );
            })}
          </DataTable.Header>

          {data.map((item, key) => {
            return(
              <DataTable.Row key={key}>
                <DataTable.Cell>
                  <Emoji name={item.emoji} style={styles.emoji} />
                </DataTable.Cell>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.percentage}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      );
    }

    if (type === 'analytics') {
      return(
        <DataTable>
          <Headline style={styles.headline}>
            <Emoji name="syringe" style={styles.emoji} /> Analítica:
          </Headline>          
          <Divider />
          <DataTable.Header>
            {titles.map((title, key) => {
              if (title.numeric) {
                return(
                  <DataTable.Title numeric key={key}>{title.title}</DataTable.Title>
                );
              }

              return(
                <DataTable.Title key={key}>{title.title}</DataTable.Title>
              );
            })}
          </DataTable.Header>

          {data.map((item, key) => {
            return(
              <DataTable.Row key={key}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.value}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      );
    }
  }

  render() {

    return(
      <View style={styles.dataTable}>
        {this.renderTable()}
      </View>
    );
  }
}

export default withTheme(DataTableArray);