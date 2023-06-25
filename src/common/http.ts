type Data = any | null;

abstract class ResponseObject {
  constructor(
    public success: boolean,
    public message: string,
    public data: Data = null,
  ) {}
}

export class PaginatedResponseObject extends ResponseObject {
  constructor(
    message: string,
    data: Data = null,
    total: number,
    perPage: number,
    page: number,
  ) {
    super(true, message, {
      ...data,
      total,
      page: Number(page),
      per_page: Number(perPage),
    });
  }
}

export class SuccessResponseObject extends ResponseObject {
  constructor(message: string, data: Data = null) {
    super(true, message, data);
  }
}

export class ErrorResponseObject extends ResponseObject {
  constructor(message: string, data: Data = null) {
    super(false, message, data);
  }
}
