export const uploadImage = (app, rootName, fileName, userId) => {
  let file = fileName;
  let avatar = file && file[0];
  let storageRef = avatar && app.storage().ref(`${rootName}/${userId}`);
  /* eslint-disable no-unused-vars */
  let uploadTask = storageRef && storageRef.put(avatar);
  /* eslint-disable no-unused-vars */
  return avatar;
};

export const getImage = (app,  rootName, userId) => {
  let storageRef = app.storage().ref();
  let spaceRef = storageRef.child(`${rootName}/${ userId }`);
  const storageRefChild = storageRef.child(`${rootName}/${ userId }`);
  return storageRefChild;
}
