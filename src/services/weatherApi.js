import api from "./api";

export const getForecast = async (city) => {
  const response = await api.get(`/weather/${encodeURIComponent(city)}`);
  return response.data;
};

// New function to handle real-world coordinates if you want to add a Laravel route for it
export const getForecastByCoords = async (lat, lon) => {
  const response = await api.get(`/weather/coords?lat=${lat}&lon=${lon}`);
  return response.data;
};
