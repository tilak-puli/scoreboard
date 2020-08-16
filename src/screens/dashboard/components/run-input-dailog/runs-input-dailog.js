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

const RunsInputDialog = ({isVisible, hide, addRuns}) => {
  const [runs, updateRuns] = useState(0);
  const clearAndHide = () => {
    updateRuns();
    hide();
  };
  return (
    <Dialog
      onTouchOutside={hide}
      dialogTitle={<DialogTitle title="Woah!! more tha 6" />}
      width={Dimensions.get('window').width * 0.9}
      visible={isVisible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <DialogContent>
        <Input onChangeText={updateRuns} label={'Enter runs'} />
      </DialogContent>
      <DialogFooter>
        <DialogButton onPress={clearAndHide} text="Cancel" />
        <DialogButton
          onPress={() => {
            addRuns(+runs);
            clearAndHide();
          }}
          text="Add runs"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default RunsInputDialog;
