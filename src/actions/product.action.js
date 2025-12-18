import axios from "../helpers/axios";
import { productConstants } from "./constants";
import { toast } from "react-toastify";

//geting products belong to a specific category by url slug
export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/products/${slug}`);

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
          payload: res.data,
        });
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error?.response?.data);
      toast.error("Something went wrong!");
    }

  };
};

//get details of a single product according to url slug
export const getSpecificProductBySlug = (slug) => {
  return async (dispatch) => {

    try {
      const res = await axios.get(`/products/product/${slug}`);

      dispatch({ type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_REQUEST });

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error?.response?.data);
      toast.error("Something went wrong!");
      dispatch({
        type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_FAILURE,
        payload: error?.response?.data.error,
      });
    }

  };
};
