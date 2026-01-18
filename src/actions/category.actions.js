import axios from "../helpers/axios";
import { categoryConstants } from "./constants";
import { toast } from "react-toastify";

//action to get all category details
export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

    try {
      const res = await axios.get("category/getcategories");
      console.log(res);

      if (res.status === 200) {
        const { categories } = res.data;

        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories: categories },
        });
      } else {
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.error || "Something went wrong!");
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: {
          error: error?.response?.data.error,
        },
      });
    }

  };
};
