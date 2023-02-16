import React, {useState} from 'react';
import {
  Modal,
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
  ModalTitle,
} from 'react-native-modals';
import {Dimensions} from 'react-native';
import AutoSuggest from '../../../../components/auto-suggest/auto-suggest';

const InitPlayersDialog = ({isVisible, updateInitPlayers, globalPlayers}) => {
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
        <AutoSuggest
          onChange={updateStriker}
          errorMessage={SER}
          label={'Striker Name'}
          data={globalPlayers}
          value={striker}
        />
        <AutoSuggest
          onChange={updateNonStriker}
          errorMessage={NSER}
          label={'Non Striker Name'}
          data={globalPlayers}
          value={nonStriker}
        />
        <AutoSuggest
          onChange={updateBowler}
          errorMessage={BER}
          label={'Bowler Name'}
          data={globalPlayers}
          value={bowler}
        />
      </ModalContent>
      <ModalFooter>
        <ModalButton onPress={clearAndUpdate} text="Start Match" />
      </ModalFooter>
    </Modal>
  );
};

export default InitPlayersDialog;
