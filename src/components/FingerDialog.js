import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Avatar } from 'react-native-paper';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  icon: {
    marginTop: 20
  }
});

const FingerDialog = props => {
  const { visible, onDismiss } = props;
  return(
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Escaneo de huella</Dialog.Title>
        <Dialog.Content style={styles.center}>
          <Paragraph>Coloque su dedo en el sensor de huella dactilar</Paragraph>
          <Avatar.Icon icon="fingerprint" style={styles.icon} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default FingerDialog;