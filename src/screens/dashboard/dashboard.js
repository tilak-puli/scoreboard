import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import ScoreboardMini from './components/scoreboard-mini/scoreboard-mini-container';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  SlideAnimation,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {Input} from 'react-native-elements';
import CommonStyles from '../../stylesheet';
import CurrentPlayers from './components/current-players/current-players-container';

const Dashboard = ({updateInitPlayers}) => {
  const [striker, updateStriker] = useState('');
  const [nonStriker, updateNonStriker] = useState('');
  const [bowler, updateBowler] = useState('');
  const [isVisible, updateVisible] = useState(true);

  return (
    <SafeAreaView style={CommonStyles.basicPage}>
      <ScoreboardMini />
      <CurrentPlayers />
      <Dialog
        dialogTitle={
          <DialogTitle title="One Last form....before exciting match" />
        }
        width={'90%'}
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
            onPress={() => {
              updateInitPlayers(striker, nonStriker, bowler);
              updateVisible(false);
            }}
            text="Start Match"
          />
        </DialogFooter>
      </Dialog>
    </SafeAreaView>
  );
};

export default Dashboard;
