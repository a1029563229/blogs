import HttpParser, { HttpMessage } from "./HttpParser";

class IncomingMessage {
  private httpParser: HttpParser;
  public httpMessage: HttpMessage;

  constructor(message: string) {
    this.httpParser = new HttpParser(message);
    this.httpMessage = this.httpParser.httpMessage;
  }
}

export default IncomingMessage;