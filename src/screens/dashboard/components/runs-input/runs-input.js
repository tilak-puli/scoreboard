import {Button, Card} from 'react-native-elements';
import React from 'react';
import {RunsInputStyles} from '../../../../stylesheet';

const BallBtn = ({run, onPress}) => (
  <Button
    buttonStyle={RunsInputStyles.runBtn}
    titleStyle={RunsInputStyles.runBtnText}
    type={'outline'}
    title={'' + run}
    onPress={onPress.bind(null, run)}
  />
);

const RunsInput = ({addBall, showRunsDialog}) => {
  return (
    <Card
      containerStyle={RunsInputStyles.card}
      wrapperStyle={RunsInputStyles.innerCard}>
      {[0, 1, 2, 3, 4, 5, 6].map((run, i) => (
        <BallBtn run={run} onPress={addBall} key={i} />
      ))}
      <BallBtn run={'-'} onPress={showRunsDialog} />
    </Card>
  );
};
export default RunsInput;
