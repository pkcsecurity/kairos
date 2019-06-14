const {geolocation} = navigator;

geolocation.requestAuthorization();

const position = () => {
  return new Promise((res, rej) => {
    geolocation.getCurrentPosition(x => res(x), err => rej(err), {
      enableHighAccuracy: true,
    });
  });
};

module.exports = {
  position,
};
