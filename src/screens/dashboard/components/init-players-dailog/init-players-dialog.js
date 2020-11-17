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

const InitPlayersDialog = ({isVisible, updateInitPlayers}) => {
  const [striker, updateStriker] = useState('');
  const [nonStriker, updateNonStriker] = useState('');
  const [bowler, updateBowler] = useState('');

  return (
    <Dialog
      dialogTitle={<DialogTitle title="Let's start" />}
      width={Dimensions.get('window').width * 0.9}
      visible={isVisible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <DialogContent>
        <Input
          onChangeText={updateStriker}
          label={'Striker Name'}
          placeholder="Enter Striker Name"
        />
        <Input
          onChangeText={updateNonStriker}
          label={'Non Striker Name'}
          placeholder="Enter Non Striker Name"
        />
        <Input
          onChangeText={updateBowler}
          label={'Bowler Name'}
          placeholder="Enter Bowler Name"
        />
      </DialogContent>
      <DialogFooter>
        <DialogButton
          onPress={() => updateInitPlayers(striker, nonStriker, bowler)}
          text="Start Match"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default InitPlayersDialog;
