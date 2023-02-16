import {Button, Card} from 'react-native-elements';
import React from 'react';
import CommonStyles from '../../../../stylesheet';

const Actions = ({undo, swap, retire}) => (
  <Card
    containerStyle={CommonStyles.actionsContainer}
    wrapperStyle={CommonStyles.actionsWrapper}>
    <Button
      title={'Undo'}
      onPress={undo}
      buttonStyle={{
        backgroundColor: '#153e75',
      }}
    />
    <Button
      title={'Swap'}
      onPress={swap}
      buttonStyle={{
        backgroundColor: '#153e75',
      }}
    />
    <Button
      title={'Retire'}
      onPress={retire}
      buttonStyle={{
        backgroundColor: '#153e75',
      }}
    />
  </Card>
);

export default Actions;
