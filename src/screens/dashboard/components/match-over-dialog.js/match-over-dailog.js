import React from 'react';

import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import {Text} from 'react-native-elements';
import {Dimensions} from 'react-native';
import CommonStyles from '../../../../stylesheet';

const MatchOverDialog = ({name, message, visible, hide}) => {
  return (
    <Dialog
      width={Dimensions.get('window').width * 0.9}
      onTouchOutside={hide}
      dialogTitle={<DialogTitle title={'CONGRATULATIONS!!'} />}
      visible={visible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <DialogContent>
        <Text style={CommonStyles.bigTextGreen}>{name}</Text>
        <Text style={CommonStyles.centerText}>won the match</Text>
        <Text />
        <Text style={[CommonStyles.centerText, CommonStyles.serif]}>
          {message}
        </Text>
      </DialogContent>
      <DialogFooter>
        <DialogButton onPress={hide} text="Close" />
      </DialogFooter>
    </Dialog>
  );
};

export default MatchOverDialog;
