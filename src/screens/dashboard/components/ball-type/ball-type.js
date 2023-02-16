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

  const normalStyles = {color: '#153e75'};
  const selectedStyles = {color: 'white', backgroundColor: '#153e75'};
  const selectedTitleStyles = {color: 'white', backgroundColor: '#153e75'};

  return (
    <Card wrapperStyle={CommonStyles.horizontalWithSpace}>
      <Button
        type={wide ? 'solid' : 'outline'}
        onPress={toggleWide}
        titleStyle={wide ? selectedTitleStyles : normalStyles}
        buttonStyle={wide ? selectedStyles : normalStyles}
        title="Wide"
      />
      <Button
        type={noBall ? 'solid' : 'outline'}
        onPress={toggleNoBall}
        title="No Ball"
        titleStyle={noBall ? selectedTitleStyles : normalStyles}
        buttonStyle={noBall ? selectedStyles : normalStyles}
      />
      <Button
        type={byes ? 'solid' : 'outline'}
        onPress={toggleByes}
        titleStyle={byes ? selectedTitleStyles : normalStyles}
        buttonStyle={byes ? selectedStyles : normalStyles}
        title="Byes"
      />
      <Button
        type={legByes ? 'solid' : 'outline'}
        onPress={toggleLegByes}
        titleStyle={legByes ? selectedTitleStyles : normalStyles}
        buttonStyle={legByes ? selectedStyles : normalStyles}
        title="Leg Byes"
      />
      <Button
        type={wicket ? 'solid' : 'outline'}
        onPress={toggleWicket}
        titleStyle={wicket ? selectedTitleStyles : normalStyles}
        buttonStyle={wicket ? selectedStyles : normalStyles}
        title="Wicket"
      />
    </Card>
  );
};

export default BallType;
