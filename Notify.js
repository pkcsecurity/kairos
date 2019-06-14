import Toast from 'react-native-simple-toast';

const notify = msg => {
  Toast.showWithGravity(msg, Toast.SHORT, Toast.CENTER);
};

module.exports = {
  notify,
};
