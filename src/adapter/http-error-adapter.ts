import { StatusCodes } from "http-status-codes";
import BusinessException from "../error/business-exception";

import Exception from "../error/exception";
import InfrastructureException from "../error/infrastructure-exception";

type HTTPError = { name: string; description: string; id: string };

class HTTPErrorAdapter {
  static getError(
    exception: Exception
  ): [error: HTTPError | null, status: number] {
    // return [
    //   {
    //     name: exception.name,
    //     description: exception.message,
    //     id: exception.id,
    //   },
    //   StatusCodes.BAD_REQUEST,
    // ];

    const error = {
      name: "Unknown exception",
      description: `An unknown exception happend. Please, contact the suport informing this id: '${exception.id}'`,
      id: exception.id,
    };

    if (exception instanceof BusinessException) {
      return [
        {
          ...error,
          name: exception.name,
          description: exception.message,
        },
        StatusCodes.BAD_REQUEST,
      ];
    }
    return [error, StatusCodes.INTERNAL_SERVER_ERROR];
  }
}

export default HTTPErrorAdapter;
