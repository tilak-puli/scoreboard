import React, {useState} from 'react';
import {
  Modal,
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
  ModalTitle,
} from 'react-native-modals';
import {Dimensions, Keyboard, ScrollView} from 'react-native';
import AutoSuggest from '../../../../components/auto-suggest/auto-suggest';

const NextPlayerDialog = ({
  playerType = 'player',
  isVisible,
  hide,
  onContinue,
  globalPlayers,
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
      modalStyle={{overflow: 'visible'}}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <ModalContent>
        <AutoSuggest
          onChange={updatePlayerName}
          errorMessage={errorMessage}
          label={'Enter next ' + playerType}
          data={globalPlayers}
          value={playerName}
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
