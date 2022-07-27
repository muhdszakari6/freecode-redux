import { Alert } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
const Notification = ({ type, message }) => {
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      uiActions.showNotification({
        open: false,
        message: "",
        type: "",
      })
    );
  };

  useEffect(() => {
    let timeout;
    if (notification?.type === "success") {
      timeout = setTimeout(() => {
        dispatch(
          uiActions.showNotification({
            open: false,
            message: "",
            type: "",
          })
        );
      }, 3000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [notification, dispatch]);

  return (
    <>
      {notification?.open && (
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      )}
    </>
  );
};

export default Notification;
