import React, {useState} from 'react';
import {
  Modal,
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
  ModalTitle,
} from 'react-native-modals';
import {Input} from 'react-native-elements';
import {Dimensions, Keyboard} from 'react-native';

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
    <Modal
      width={Dimensions.get('window').width * 0.9}
      onTouchOutside={() => {
        hide();
        Keyboard.dismiss();
      }}
      modalTitle={<ModalTitle title="Next Player" />}
      visible={isVisible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <ModalContent>
        <Input
          onChangeText={updatePlayerName}
          label={'Enter next ' + playerType}
          value={playerName}
          errorMessage={errorMessage}
        />
      </ModalContent>
      <ModalFooter>
        <ModalButton onPress={clearAndHide} text="Cancel" />
        <ModalButton onPress={submit} text="Continue" />
      </ModalFooter>
    </Modal>
  );
};

export default NextPlayerDialog;
