import React from 'react';
import {Button, Card} from 'react-native-elements';
import CommonStyles from '../../../../stylesheet';

const BallType = ({selectedTypes, updateSelectedType}) => {
  const {wide, noBall, byes, legByes, wicket} = selectedTypes;

  const toggleWide = () => updateSelectedType('wide', !wide);

  const toggleNoBall = () => updateSelectedType('noBall', !noBall);

  const toggleByes = () => {
    if (!legByes) updateSelectedType('byes', !byes);
  };

  const toggleLegByes = () => {
    if (!byes) updateSelectedType('legByes', !legByes);
  };

  const toggleWicket = () => updateSelectedType('wicket', !wicket);

  return (
    <Card wrapperStyle={CommonStyles.horizontalWithSpace}>
      <Button
        type={wide ? 'solid' : 'outline'}
        onPress={toggleWide}
        titleStyle={{color: '#153e75'}}
        title="Wide"
      />
      <Button
        type={noBall ? 'solid' : 'outline'}
        onPress={toggleNoBall}
        title="No Ball"
        titleStyle={{color: '#153e75'}}
      />
      <Button
        type={byes ? 'solid' : 'outline'}
        onPress={toggleByes}
        titleStyle={{color: '#153e75'}}
        title="Byes"
      />
      <Button
        type={legByes ? 'solid' : 'outline'}
        onPress={toggleLegByes}
        titleStyle={{color: '#153e75'}}
        title="Leg Byes"
      />
      <Button
        type={wicket ? 'solid' : 'outline'}
        onPress={toggleWicket}
        titleStyle={{color: '#153e75'}}
        title="Wicket"
      />
    </Card>
  );
};

export default BallType;
