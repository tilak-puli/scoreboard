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
import {Dimensions} from 'react-native';

const WicketDialog = ({
  isVisible,
  addBall,
  cancel,
  nextBatsman,
  updateSelectedType,
}) => {
  const [wicketType, updateWicketType] = useState(WICKET_TYPES.CATCH);
  const [batsman, updateBatsman] = useState('');
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
        <Input onChangeText={updateBatsman} label={'Enter next batsman name'} />
      </DialogContent>
      <DialogFooter>
        <DialogButton onPress={cancel} text="Cancel" />
        <DialogButton
          onPress={() => {
            updateSelectedType('wicketType', wicketType);
            addBall();
            nextBatsman(batsman);
            cancel();
          }}
          text="Let's continue"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default WicketDialog;
