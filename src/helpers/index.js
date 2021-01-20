export const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('photo_path', {
    type: photo.mime,
    uri: photo.path,
    name: `${new Date().getTime()}`,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};
