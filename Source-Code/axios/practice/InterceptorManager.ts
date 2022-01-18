class InterceptorManager {
  private handlers: any[] = [];

  // 注册拦截器
  public use(handler: Function): number {
    this.handlers.push(handler);
    return this.handlers.length - 1;
  }

  // 移除拦截器
  public eject(id: number) {
    this.handlers[id] = null;
  }

  // 获取所有拦截器
  public getAll() {
    return this.handlers.filter(h => h);
  }
}

export default InterceptorManager;