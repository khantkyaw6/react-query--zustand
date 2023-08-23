import axios from "axios";

const url = "http://127.0.0.1:3500/api/v1/tours";

export const getAllTour = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error occured", error);
    throw error;
  }
};

export const getTour = async (tour_id) => {
  try {
    const response = await axios.get(`${url}/${tour_id}`);
    return response;
  } catch (error) {
    console.log("Error occured", error);
    throw error;
  }
};

// export const createTour = async (newTour) => {
//   try {
//     const response = await axios.post(`${url}`, newTour);
//     return response;
//   } catch (error) {
//     console.log("Error occured.");
//     throw error;
//   }
// };

export const createTour = (newTour) => {
  return axios.post(`${url}`, newTour);
};

export const deleteTour = (tour_id) => {
  return axios.delete(`${url}/${tour_id}`);
};

export const updateTour = (updateTour) => {
  return axios.patch(`${url}/${updateTour._id}`, updateTour);
};
