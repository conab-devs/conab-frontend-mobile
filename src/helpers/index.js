export const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('photo_path', photo);

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};
