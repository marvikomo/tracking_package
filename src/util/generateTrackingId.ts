var unique = new Date().valueOf();

export const generateTrackingId = (): string => {
  var unique = new Date().valueOf();
  return "CT" + unique;
};
