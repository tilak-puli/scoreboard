import React, {useState} from 'react';

import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import {Picker} from 'native-base';
import {WICKET_TYPES} from '../../../../constants';
import {Input} from 'react-native-elements';
import {Dimensions, View} from 'react-native';

const WicketDialog = ({
  isVisible,
  addBall,
  cancel,
  nextBatsman,
  updateSelectedType,
}) => {
  const [wicketType, updateWicketType] = useState(WICKET_TYPES.CATCH);
  const [helper, updateHelper] = useState('');
  const [batsman, updateBatsman] = useState('');
  const [errorMessage, updateErrorMessage] = useState('');

  const submit = () => {
    if (!batsman.trim()) {
      updateErrorMessage('Please enter player name');
      return;
    }

    updateErrorMessage('');
    updateSelectedType('wicketType', wicketType);
    updateSelectedType('wicketHelper', helper);
    addBall();
    nextBatsman(batsman);
    cancel();
  };

  return (
    <Dialog
      dialogTitle={<DialogTitle title="wooh OUT!! How did that happen?" />}
      width={Dimensions.get('window').width * 0.9}
      visible={isVisible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <DialogContent>
        <Picker
          mode={'dropdown'}
          selectedValue={wicketType}
          onValueChange={updateWicketType}
          label={'Wicket Type'}
          placeholder="Select wicket type">
          <Picker.Item label="Catch" value={WICKET_TYPES.CATCH} />
          <Picker.Item label="Bowled" value={WICKET_TYPES.BOWLED} />
          <Picker.Item label="Run out" value={WICKET_TYPES.RUN_OUT} />
          <Picker.Item label="LBW" value={WICKET_TYPES.LBW} />
          <Picker.Item label="Stump out" value={WICKET_TYPES.STUMP_OUT} />
          <Picker.Item label="Hit wicket" value={WICKET_TYPES.HIT_WICKET} />
          <Picker.Item label="Other" value={WICKET_TYPES.OTHER} />
        </Picker>
        {helperMessages[wicketType] ? (
          <Input
            onChangeText={updateHelper}
            label={helperMessages[wicketType]}
          />
        ) : (
          <View />
        )}
        <Input
          onChangeText={updateBatsman}
          errorMessage={errorMessage}
          label={'Enter next batsman name'}
        />
      </DialogContent>
      <DialogFooter>
        <DialogButton onPress={cancel} text="Cancel" />
        <DialogButton onPress={submit} text="Let's continue" />
      </DialogFooter>
    </Dialog>
  );
};

const helperMessages = {
  [WICKET_TYPES.CATCH]: 'Caught by',
  [WICKET_TYPES.RUN_OUT]: 'Throw by',
  [WICKET_TYPES.STUMP_OUT]: 'Stumped by',
};

export default WicketDialog;
