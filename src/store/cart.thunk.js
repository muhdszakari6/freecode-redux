import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
  return async (dispatch, getState) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://freecode-redux-http-default-rtdb.firebaseio.com/cartItems.json"
      );

      const data = await res.json();
      return data;
    };

    try {
      const data = await fetchHandler();
      console.log(data);
      dispatch(cartActions.replaceData(data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request failed",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch, getState) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending request...",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      const res = await fetch(
        "https://freecode-redux-http-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request Sent",
          type: "success",
        })
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request failed",
          type: "error",
        })
      );
    }
  };
};
