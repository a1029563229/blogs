function updateHostComponent(current, workInProgress, renderExpirationTime) {
    pushHostContext(workInProgress);

    if (current === null) {
        tryToClaimNextHydratableInstance(workInProgress);
    }

    const type = workInProgress.type;
    const nextProps = workInProgress.pendingProps;
    const prevProps = current !== null ? current.memoizedProps : null;

    let nextChildren = nextProps.children;
    const isDirectTextChild = shouldSetTextContent(type, nextProps);

    if (isDirectTextChild) {
        nextChildren = null;
    } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
        workInProgress.effectTag |= ContentReset;
    }

    markRef(current, workInProgress);

    if (
        workInProgress.mode & ConcurrentMode &&
        renderExpirationTime !== Never &&
        shouldDeprioritizeSubtree(type, nextProps)
    ) {
        if (enableSchedulerTracing) {
            markSpawnedWork(Never);
        }
        // Schedule this fiber to re-render at offscreen priority. Then bailout.
        workInProgress.expirationTime = workInProgress.childExpirationTime = Never;
        return null;
    }

    reconcileChildren(
        current,
        workInProgress,
        nextChildren,
        renderExpirationTime,
    );
    return workInProgress.child;
}