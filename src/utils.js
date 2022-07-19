import RNFetchBlob from 'react-native-fetch-blob';
import {Toast} from 'native-base';
// import {jsonToCSV} from 'react-native-csv';

export const downloadJson = (data, name = 'scoredboard') => {
  // const headerString = 'score-board '+ new Date().toISOString();
  const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/${name}.json`;
  // const csv = jsonToCSV(data);

  RNFetchBlob.fs
    .writeFile(pathToWrite, JSON.stringify(data), 'utf8')
    .then(() => {
      console.log(`wrote file ${pathToWrite}`);

      Toast.show({
        text: 'Exported match json to download folder!',
        buttonText: 'Okay',
        duration: 3000,
        type: 'success',
      });
    })
    .catch((error) => console.error(error));
};
