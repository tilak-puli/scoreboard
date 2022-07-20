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
        backgroundColor: '#2a69ac',
      }}
    />
    <Button
      title={'Swap'}
      onPress={swap}
      buttonStyle={{
        backgroundColor: '#2a69ac',
      }}
    />
    <Button
      title={'Retire'}
      onPress={retire}
      buttonStyle={{
        backgroundColor: '#2a69ac',
      }}
    />
  </Card>
);

export default Actions;
