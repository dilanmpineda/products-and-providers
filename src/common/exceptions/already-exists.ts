import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyExistsException extends HttpException {

  constructor() {
    super('Already exists', HttpStatus.BAD_REQUEST)
  }
}