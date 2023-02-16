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
import {Dimensions, Keyboard, ScrollView} from 'react-native';

const RunsInputDialog = ({isVisible, hide, addRuns}) => {
  const [runs, updateRuns] = useState(0);
  const clearAndHide = () => {
    updateRuns();
    hide();
    Keyboard.dismiss();
  };
  return (
    <Modal
      onTouchOutside={hide}
      modalTitle={<ModalTitle title="Woah!! more tha 6" />}
      width={Dimensions.get('window').width * 0.9}
      visible={isVisible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <ModalContent>
        <ScrollView>
          <Input
            onChangeText={updateRuns}
            keyboardType={'numeric'}
            label={'Enter runs'}
          />
        </ScrollView>
      </ModalContent>
      <ModalFooter>
        <ModalButton onPress={clearAndHide} text="Cancel" />
        <ModalButton
          onPress={() => {
            addRuns(+runs);
            clearAndHide();
          }}
          text="Add runs"
        />
      </ModalFooter>
    </Modal>
  );
};

export default RunsInputDialog;
