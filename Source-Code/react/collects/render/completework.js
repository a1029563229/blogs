function completeWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderExpirationTime: ExpirationTime
): Fiber | null {
    popHostContext(workInProgress);
    const rootContainerInstance = getRootHostContainer();
    const type = workInProgress.type;
    if (current !== null && workInProgress.stateNode != null) {
        updateHostComponent(
            current,
            workInProgress,
            type,
            newProps,
            rootContainerInstance
        );

        if (enableDeprecatedFlareAPI) {
            const prevListeners = current.memoizedProps.DEPRECATED_flareListeners;
            const nextListeners = newProps.DEPRECATED_flareListeners;
            if (prevListeners !== nextListeners) {
                markUpdate(workInProgress);
            }
        }

        if (current.ref !== workInProgress.ref) {
            markRef(workInProgress);
        }
    } else {
        if (!newProps) {
            invariant(
                workInProgress.stateNode !== null,
                "We must have new props for new mounts. This error is likely " +
                "caused by a bug in React. Please file an issue."
            );
            // This can happen when we abort work.
            return null;
        }

        const currentHostContext = getHostContext();
        let wasHydrated = popHydrationState(workInProgress);
        if (wasHydrated) {
            if (
                prepareToHydrateHostInstance(
                    workInProgress,
                    rootContainerInstance,
                    currentHostContext
                )
            ) {
                // If changes to the hydrated node need to be applied at the
                // commit-phase we mark this as such.
                markUpdate(workInProgress);
            }
            if (enableDeprecatedFlareAPI) {
                const listeners = newProps.DEPRECATED_flareListeners;
                if (listeners != null) {
                    updateDeprecatedEventListeners(
                        listeners,
                        workInProgress,
                        rootContainerInstance
                    );
                }
            }
        } else {
            let instance = createInstance(
                type,
                newProps,
                rootContainerInstance,
                currentHostContext,
                workInProgress
            );

            appendAllChildren(instance, workInProgress, false, false);

            // This needs to be set before we mount Flare event listeners
            workInProgress.stateNode = instance;

            if (enableDeprecatedFlareAPI) {
                const listeners = newProps.DEPRECATED_flareListeners;
                if (listeners != null) {
                    updateDeprecatedEventListeners(
                        listeners,
                        workInProgress,
                        rootContainerInstance
                    );
                }
            }

            // Certain renderers require commit-time effects for initial mount.
            // (eg DOM renderer supports auto-focus for certain elements).
            // Make sure such renderers get scheduled for later work.
            if (
                finalizeInitialChildren(
                    instance,
                    type,
                    newProps,
                    rootContainerInstance,
                    currentHostContext
                )
            ) {
                markUpdate(workInProgress);
            }
        }

        if (workInProgress.ref !== null) {
            // If there is a ref on a host node we need to schedule a callback
            markRef(workInProgress);
        }
    }
    return null;
}