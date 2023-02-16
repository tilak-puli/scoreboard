import React from 'react';
import {
  Modal,
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
  ModalTitle,
} from 'react-native-modals';
import {Text} from 'react-native-elements';
import {Dimensions, Keyboard} from 'react-native';
import CommonStyles from '../../../../stylesheet';

const MatchOverDialog = ({name, message, visible, hide}) => {
  return (
    <Modal
      width={Dimensions.get('window').width * 0.9}
      onTouchOutside={() => {
        hide();
        Keyboard.dismiss;
      }}
      modalTitle={<ModalTitle title={'CONGRATULATIONS!!'} />}
      visible={visible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <ModalContent>
        <Text style={CommonStyles.bigTextGreen}>{name}</Text>
        <Text style={CommonStyles.centerText}>won the match</Text>
        <Text />
        <Text style={[CommonStyles.centerText, CommonStyles.serif]}>
          {message}
        </Text>
      </ModalContent>
      <ModalFooter>
        <ModalButton onPress={hide} text="Close" />
      </ModalFooter>
    </Modal>
  );
};

export default MatchOverDialog;
