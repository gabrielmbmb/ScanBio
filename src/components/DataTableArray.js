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

  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  renderTable() {
    const { titles, data, type } = this.props;
    const { page } = this.state;

    const itemsPerPage = 5;
    const start = page * itemsPerPage;
    const end = (page + 1) * itemsPerPage;

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
            {
              data.map((item, key) => {
                return(
                  <MapView.Marker
                    key={key}
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude
                    }}
                    title={item.name}
                    description={item.percentage}
                  />
                );
              })
            }
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

          {data.slice(start, end).map((item, key) => (
            <DataTable.Row key={key}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.value}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination 
            page={page}
            numberOfPages={Math.floor(data.length / itemsPerPage)}
            onPageChange={page => {
              this.setState({ page });
            }}
            label={`${start + 1}-${end} of ${data.length}`}
          />
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