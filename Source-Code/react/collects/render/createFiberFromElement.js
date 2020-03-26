export function createFiberFromElement(
  element: ReactElement,
  mode: TypeOfMode,
  expirationTime: ExpirationTime,
): Fiber {
  let owner = null;
  const type = element.type;
  const key = element.key;
  const pendingProps = element.props;
  const fiber = createFiberFromTypeAndProps(
    type,
    key,
    pendingProps,
    owner,
    mode,
    expirationTime,
  );
  return fiber;
}

export function createFiberFromTypeAndProps(
  type: any, // React$ElementType
  key: null | string,
  pendingProps: any,
  owner: null | Fiber,
  mode: TypeOfMode,
  expirationTime: ExpirationTime,
): Fiber {
  let fiber;

  let fiberTag = IndeterminateComponent;
  let resolvedType = type;
  if (typeof type === 'function') {
    if (shouldConstruct(type)) {
      fiberTag = ClassComponent;
    }
  } else if (typeof type === 'string') {
    fiberTag = HostComponent;
  } else {
    getTag: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(
          pendingProps.children,
          mode,
          expirationTime,
          key,
        );
      case REACT_CONCURRENT_MODE_TYPE:
        fiberTag = Mode;
        mode |= ConcurrentMode | BlockingMode | StrictMode;
        break;
      case REACT_STRICT_MODE_TYPE:
        fiberTag = Mode;
        mode |= StrictMode;
        break;
      case REACT_PROFILER_TYPE:
        return createFiberFromProfiler(pendingProps, mode, expirationTime, key);
      case REACT_SUSPENSE_TYPE:
        return createFiberFromSuspense(pendingProps, mode, expirationTime, key);
      case REACT_SUSPENSE_LIST_TYPE:
        return createFiberFromSuspenseList(
          pendingProps,
          mode,
          expirationTime,
          key,
        );
      default: {
        if (typeof type === 'object' && type !== null) {
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE:
              fiberTag = ContextProvider;
              break getTag;
            case REACT_CONTEXT_TYPE:
              // This is a consumer
              fiberTag = ContextConsumer;
              break getTag;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = ForwardRef;
              if (__DEV__) {
                resolvedType = resolveForwardRefForHotReloading(resolvedType);
              }
              break getTag;
            case REACT_MEMO_TYPE:
              fiberTag = MemoComponent;
              break getTag;
            case REACT_LAZY_TYPE:
              fiberTag = LazyComponent;
              resolvedType = null;
              break getTag;
            case REACT_BLOCK_TYPE:
              fiberTag = Block;
              break getTag;
            case REACT_FUNDAMENTAL_TYPE:
              if (enableFundamentalAPI) {
                return createFiberFromFundamental(
                  type,
                  pendingProps,
                  mode,
                  expirationTime,
                  key,
                );
              }
              break;
            case REACT_SCOPE_TYPE:
              if (enableScopeAPI) {
                return createFiberFromScope(
                  type,
                  pendingProps,
                  mode,
                  expirationTime,
                  key,
                );
              }
          }
        }
        let info = '';
        invariant(
          false,
          'Element type is invalid: expected a string (for built-in ' +
            'components) or a class/function (for composite components) ' +
            'but got: %s.%s',
          type == null ? type : typeof type,
          info,
        );
      }
    }
  }

  fiber = createFiber(fiberTag, pendingProps, key, mode);
  fiber.elementType = type;
  fiber.type = resolvedType;
  fiber.expirationTime = expirationTime;

  return fiber;
}