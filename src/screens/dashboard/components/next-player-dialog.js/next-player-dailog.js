import React, {useState} from 'react';

import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import {Input} from 'react-native-elements';
import {Dimensions} from 'react-native';

const NextPlayerDialog = ({
  playerType = 'player',
  isVisible,
  hide,
  onContinue,
}) => {
  const [playerName, updatePlayerName] = useState('');
  const clearAndHide = () => {
    updatePlayerName('');
    hide();
  };
  return (
    <Dialog
      width={Dimensions.get('window').width * 0.9}
      onTouchOutside={hide}
      dialogTitle={<DialogTitle title="Next Player" />}
      visible={isVisible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <DialogContent>
        <Input
          onChangeText={updatePlayerName}
          label={'Enter next ' + playerType}
        />
      </DialogContent>
      <DialogFooter>
        <DialogButton onPress={clearAndHide} text="Cancel" />
        <DialogButton
          onPress={() => {
            onContinue(playerName);
            clearAndHide();
          }}
          text="Continue"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default NextPlayerDialog;
