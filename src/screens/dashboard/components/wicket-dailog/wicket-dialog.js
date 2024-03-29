import React, {useEffect, useState} from 'react';
import {
  Modal,
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
  ModalTitle,
} from 'react-native-modals';
import {Picker, Label} from 'native-base';
import {WICKET_TYPES} from '../../../../constants';
import {Dimensions, Keyboard, ScrollView, View} from 'react-native';
import CommonStyles from '../../../../stylesheet';
import AutoSuggest from '../../../../components/auto-suggest/auto-suggest';

const WicketDialog = ({
  isVisible,
  addBall,
  cancel,
  nextBatsman,
  updateSelectedType,
  striker,
  nonStriker,
  globalPlayers,
}) => {
  const [wicketType, updateWicketType] = useState(WICKET_TYPES.CATCH);
  const [outBatsman, updateOutBatsman] = useState(striker?.name);
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
    updateSelectedType('outBatsman', outBatsman);
    addBall();
    nextBatsman(batsman.trim());
    cancel();
  };

  useEffect(() => {
    updateWicketType(WICKET_TYPES.CATCH);
    updateOutBatsman(striker?.name);
    updateHelper('');
    updateBatsman('');
    updateErrorMessage('');

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <Modal
      modalTitle={<ModalTitle title="wooh OUT!! How did that happen?" />}
      width={Dimensions.get('window').width * 0.9}
      visible={isVisible}
      modalAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }
      modalStyle={{overflow: 'visible'}}
      onTouchOutside={() => Keyboard.dismiss()}>
      <ModalContent>
        <ScrollView
          style={{paddingLeft: 5, marginBottom: 5}}
          keyboardShouldPersistTaps={'handled'}>
          <Label style={CommonStyles.label}>Wicket Type</Label>
          <Picker
            mode={'dropdown'}
            selectedValue={wicketType}
            onValueChange={updateWicketType}
            label={'Wicket Type'}
            placeholder="Select wicket type"
            stackedLabel={true}>
            <Picker.Item label="Catch" value={WICKET_TYPES.CATCH} />
            <Picker.Item label="Bowled" value={WICKET_TYPES.BOWLED} />
            <Picker.Item label="Run out" value={WICKET_TYPES.RUN_OUT} />
            <Picker.Item label="LBW" value={WICKET_TYPES.LBW} />
            <Picker.Item label="Stump out" value={WICKET_TYPES.STUMP_OUT} />
            <Picker.Item label="Hit wicket" value={WICKET_TYPES.HIT_WICKET} />
            <Picker.Item label="Hit Six" value={WICKET_TYPES.HIT_SIX} />
            <Picker.Item label="Other" value={WICKET_TYPES.OTHER} />
          </Picker>
        </ScrollView>
        {wicketType === WICKET_TYPES.RUN_OUT ? (
          <View style={{paddingLeft: 5, marginBottom: 5}}>
            <Label style={CommonStyles.label}>Who is OUT?</Label>
            <Picker
              mode={'dropdown'}
              selectedValue={outBatsman}
              onValueChange={updateOutBatsman}
              label={'Who is out?'}
              stackedLabel={true}
              placeholder="Select batsman">
              <Picker.Item label={striker?.name} value={striker?.name} />
              <Picker.Item label={nonStriker?.name} value={nonStriker?.name} />
            </Picker>
          </View>
        ) : (
          <View />
        )}

        {helperMessages[wicketType] ? (
          <View style={{marginBottom: 5}}>
            <AutoSuggest
              onChange={updateHelper}
              errorMessage={errorMessage}
              label={helperMessages[wicketType]}
              data={globalPlayers}
              value={helper}
            />
          </View>
        ) : (
          <View />
        )}
        <AutoSuggest
          onChange={updateBatsman}
          errorMessage={errorMessage}
          label={'Enter next batsman name'}
          data={globalPlayers}
          value={batsman}
        />
      </ModalContent>
      <ModalFooter>
        <ModalButton onPress={cancel} text="Cancel" />
        <ModalButton onPress={submit} text="Let's continue" />
      </ModalFooter>
    </Modal>
  );
};

const helperMessages = {
  [WICKET_TYPES.CATCH]: 'Caught by',
  [WICKET_TYPES.RUN_OUT]: 'Throw by',
  [WICKET_TYPES.STUMP_OUT]: 'Stumped by',
};

export default WicketDialog;
