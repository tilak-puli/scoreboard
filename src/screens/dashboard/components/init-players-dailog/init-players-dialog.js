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
import {Dimensions} from 'react-native';

const InitPlayersDialog = ({isVisible, updateInitPlayers}) => {
  const [striker, updateStriker] = useState('');
  const [nonStriker, updateNonStriker] = useState('');
  const [bowler, updateBowler] = useState('');
  const [SER, updateSER] = useState('');
  const [NSER, updateNSER] = useState('');
  const [BER, updateBER] = useState('');

  const clearAndUpdate = () => {
    let error = false;
    if (striker.trim().length === 0) {
      updateSER('Please enter striker name');
      error = true;
    } else {
      updateSER('');
    }
    if (nonStriker.trim().length === 0) {
      updateNSER('Please enter non striker name');
      error = true;
    } else {
      updateNSER('');
    }
    if (bowler.trim().length === 0) {
      updateBER('Please enter bowler name');
      error = true;
    } else {
      updateBER('');
    }

    if (error) {
      return;
    }

    updateInitPlayers(striker.trim(), nonStriker.trim(), bowler.trim());
    updateBowler('');
    updateNonStriker('');
    updateStriker('');
  };

  return (
    <Modal
      modalTitle={<ModalTitle title="Let's start" />}
      width={Dimensions.get('window').width * 0.9}
      visible={isVisible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <ModalContent>
        <Input
          onChangeText={updateStriker}
          label={'Striker Name'}
          value={striker}
          placeholder="Enter Striker Name"
          errorMessage={SER}
        />
        <Input
          onChangeText={updateNonStriker}
          label={'Non Striker Name'}
          value={nonStriker}
          errorMessage={NSER}
          placeholder="Enter Non Striker Name"
        />
        <Input
          onChangeText={updateBowler}
          label={'Bowler Name'}
          value={bowler}
          errorMessage={BER}
          placeholder="Enter Bowler Name"
        />
      </ModalContent>
      <ModalFooter>
        <ModalButton onPress={clearAndUpdate} text="Start Match" />
      </ModalFooter>
    </Modal>
  );
};

export default InitPlayersDialog;
