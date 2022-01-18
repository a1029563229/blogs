class CancelError extends Error {
  constructor(...options: any) {
    super(...options);
    this.name = 'CancelError';
  }
}

class CancelToken {
  private static list: any[] = [];

  // 每次返回一个 CancelToken 实例，用于取消请求
  public static source(): CancelToken {
    const cancelToken = new CancelToken();
    CancelToken.list.push(cancelToken);
    return cancelToken;
  }

  // 通过检测是否有 message 字段来确定该请求是否被取消
  public static checkIsCancel(token: number | null) {
    if (typeof token !== 'number') return false;
    
    const cancelToken: CancelToken = CancelToken.list[token];
    if (!cancelToken.message) return false;

    // 抛出 CancelError 类型，在后续请求中处理该类型错误
    throw new CancelError(cancelToken.message);
  }

  public token = 0;
  private message: string = '';
  constructor() {
    // 使用列表长度作为 token id
    this.token = CancelToken.list.length;
  }

  // 取消请求，写入 message
  public cancel(message: string) {
    this.message = message;
  }
}

export default CancelToken;