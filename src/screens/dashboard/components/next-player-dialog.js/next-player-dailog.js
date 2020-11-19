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
  const [errorMessage, updateErrorMessage] = useState('');
  const clearAndHide = () => {
    updatePlayerName('');
    hide();
  };

  const submit = () => {
    if (!playerName.trim()) {
      updateErrorMessage('Please enter player name');
      return;
    }

    updateErrorMessage('');
    onContinue(playerName.trim());
    clearAndHide();
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
          value={playerName}
          errorMessage={errorMessage}
        />
      </DialogContent>
      <DialogFooter>
        <DialogButton onPress={clearAndHide} text="Cancel" />
        <DialogButton onPress={submit} text="Continue" />
      </DialogFooter>
    </Dialog>
  );
};

export default NextPlayerDialog;
