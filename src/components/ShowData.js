import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { DataTable, Appbar, withTheme } from 'react-native-paper';

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

  render(){
    const { navigation, theme } = this.props;
    const { colors } = theme;


    return(
      <ScrollView style={[{backgroundColor: colors.background}, styles.container]}>
        <Appbar.Header>
          <Appbar.BackAction 
            onPress={() => navigation.navigate('Home')}
          />
          <Appbar.Content 
            title="ScanBio"
            subtitle="Resultados"
          />
        </Appbar.Header>

        <View style={styles.dataTable}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Persona</DataTable.Title>
              <DataTable.Title>Género</DataTable.Title>
              <DataTable.Title numeric>Edad</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>Gabriel</DataTable.Cell>
              <DataTable.Cell>Hombre</DataTable.Cell>
              <DataTable.Cell numeric>20</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Pagination
              page={1}
              numberOfPages={1}
              onPageChange={() => {}}
            />
          </DataTable>        
        </View>

      </ScrollView>
    );
  }
}

export default withTheme(ShowData);