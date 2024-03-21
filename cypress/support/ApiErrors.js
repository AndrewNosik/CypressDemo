class ApiErrors {
  MESSAGE = {
    BAD_INPUT: "bad input",
    USER_NOT_FOUND: "User not found",
    ERROR: "something bad happened",
    NO_DATA: 'no data',
    NOT_AUTHORIZED: 'not authorized'
  };
  ERROR_CODES = {
    USER: {
      ApiErrors: 'api',
    },
    PET: {
      pet: 'pet'
    },
    COMMON: {
      FORBIDDEN: 'FORBIDDEN',
      HEADER_REQUIRED: 'HEADER_REQUIRED',
      NOT_FOUND: 'NOT_FOUND',
      NOT_AUTHORIZED: 'NOT_AUTHORIZED'
    },
  };

  /**
   * 
   * @param {*} source in string format e.g. 'account' or empty
   * @returns 
   */
  expect(response, statusCode, message, source) {
    expect(response.status).to.eql(statusCode);
    expect(response.body.message).to.eql(message);
    if (source != undefined && source.length > 0) {
      expect(response.body.source).to.eql(source);
    }
    return response
  };
}

export default new ApiErrors()      