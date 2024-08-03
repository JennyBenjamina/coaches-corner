import axiosInstance from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosInstance.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log("from useRefreshTOken", JSON.stringify(prev));
      console.log("from useRefreshTOken", response.data.accessToken);
      // return {
      //   ...prev,
      //   roles: response.data.roles,
      //   accessToken: response.data.accessToken,
      // };
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        isAuthenticated: true,
        startDate: response.data.startDate,
        handicap: response.data.handicap,
        email: response.data.email,
        username: response.data.username,
        id: response.data.id,
        homeCourse: response.data.homeCourse,
        yearsPlayed: response.data.yearsPlayed,
        takenLessons: response.data.takenLessons,
        whatToImprove: response.data.whatToImprove,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
