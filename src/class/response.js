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


export const paginateResponseSuccess = (out) => {
  return {
    status: 'success',
    payload: out.docs.map((pr) => pr.toJSON()),
    totalDocs: out.totalDocs,
    limit: out.limit,
    totalPages: out.totalPages,
    page: out.page,
    pagingCounter: out.pagingCounter,
    hasPrevPage: out.hasPrevPage,
    hasNextPage: out.hasNextPage,
    prevPage: `http://localhost:7000/products?limit=${out.limit}&page=${out.prevPage}`,
    nextPage: `http://localhost:7000/products?limit=${out.limit}&page=${out.nextPage}`,
  }
}

export const paginateResponseError = () => {
  return {
    status: 'error',
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }
}

// "http://localhost:7000/api/carts/655bcd7da49cb30b269fe678/6558dd8c4e0a87e8653355f7";