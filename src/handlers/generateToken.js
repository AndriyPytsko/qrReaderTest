const rand = function () {
  return Math.random().toString(36).substr(2);
};

export const generateToken = function () {
  return rand() + rand() + "-" + rand() + rand();
};
