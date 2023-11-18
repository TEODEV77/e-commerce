export const success = (res, body, message, status) => {
  res.status(status).json({
    payload: {
      status,
      message,
      body,
    },
  });
};

export const error = (res, err, message, status) => {
  res.status(status).json({
    payload: {
      status,
      err,
      message,
    },
  });
};
