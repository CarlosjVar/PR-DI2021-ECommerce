import axios from 'axios';

/**
 * Uploads an image file to the server
 * @param {object} file File object to upload
 * @returns The image file name that was saved in the server
 */
const uploadImageFile = async (file) => {
  const requestFormData = new FormData();
  requestFormData.append('imageFile', file);
  try {
    const { data } = await axios.post(
      '/api/utils/image/upload',
      requestFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return data.imageName;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImageFile;
