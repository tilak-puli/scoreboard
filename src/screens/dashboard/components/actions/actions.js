import {Button, Card} from 'react-native-elements';
import React from 'react';
import CommonStyles from '../../../../stylesheet';

const Actions = ({undo, swap, retire}) => (
  <Card
    containerStyle={CommonStyles.actionsContainer}
    wrapperStyle={CommonStyles.actionsWrapper}>
    <Button title={'Undo'} onPress={undo} />
    <Button title={'Swap'} onPress={swap} />
    <Button title={'Retire'} onPress={retire} />
  </Card>
);

export default Actions;
