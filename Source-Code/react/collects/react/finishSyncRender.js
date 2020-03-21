function commitRootImpl(root, renderPriorityLevel) {
    do {
        flushPassiveEffects();
    } while (rootWithPendingPassiveEffects !== null);
    flushRenderPhaseStrictModeWarningsInDEV();

    const finishedWork = root.finishedWork;
    const expirationTime = root.finishedExpirationTime;
    if (finishedWork === null) {
        return null;
    }
    root.finishedWork = null;
    root.finishedExpirationTime = NoWork;

    root.callbackNode = null;
    root.callbackExpirationTime = NoWork;
    root.callbackPriority = NoPriority;
    root.nextKnownPendingLevel = NoWork;

    startCommitTimer();

    const remainingExpirationTimeBeforeCommit = getRemainingExpirationTime(
        finishedWork,
    );
    markRootFinishedAtTime(
        root,
        expirationTime,
        remainingExpirationTimeBeforeCommit,
    );

    if (root === workInProgressRoot) {
        workInProgressRoot = null;
        workInProgress = null;
        renderExpirationTime = NoWork;
    }

    let firstEffect;
    if (finishedWork.effectTag > PerformedWork) {
        if (finishedWork.lastEffect !== null) {
            finishedWork.lastEffect.nextEffect = finishedWork;
            firstEffect = finishedWork.firstEffect;
        } else {
            firstEffect = finishedWork;
        }
    } else {
        firstEffect = finishedWork.firstEffect;
    }

    if (firstEffect !== null) {
        const prevExecutionContext = executionContext;
        executionContext |= CommitContext;
        const prevInteractions = pushInteractions(root);

        ReactCurrentOwner.current = null;

        startCommitSnapshotEffectsTimer();
        prepareForCommit(root.containerInfo);
        nextEffect = firstEffect;
        do {
            try {
                commitBeforeMutationEffects();
            } catch (error) {
                invariant(nextEffect !== null, 'Should be working on an effect.');
                captureCommitPhaseError(nextEffect, error);
                nextEffect = nextEffect.nextEffect;
            }
        } while (nextEffect !== null);
        stopCommitSnapshotEffectsTimer();

        if (enableProfilerTimer) {
            recordCommitTime();
        }

        startCommitHostEffectsTimer();
        nextEffect = firstEffect;
        do {
            if (__DEV__) {
                invokeGuardedCallback(
                    null,
                    commitMutationEffects,
                    null,
                    root,
                    renderPriorityLevel,
                );
                if (hasCaughtError()) {
                    invariant(nextEffect !== null, 'Should be working on an effect.');
                    const error = clearCaughtError();
                    captureCommitPhaseError(nextEffect, error);
                    nextEffect = nextEffect.nextEffect;
                }
            } else {
                try {
                    commitMutationEffects(root, renderPriorityLevel);
                } catch (error) {
                    invariant(nextEffect !== null, 'Should be working on an effect.');
                    captureCommitPhaseError(nextEffect, error);
                    nextEffect = nextEffect.nextEffect;
                }
            }
        } while (nextEffect !== null);
        stopCommitHostEffectsTimer();
        resetAfterCommit(root.containerInfo);

        // The work-in-progress tree is now the current tree. This must come after
        // the mutation phase, so that the previous tree is still current during
        // componentWillUnmount, but before the layout phase, so that the finished
        // work is current during componentDidMount/Update.
        root.current = finishedWork;

        // The next phase is the layout phase, where we call effects that read
        // the host tree after it's been mutated. The idiomatic use case for this is
        // layout, but class component lifecycles also fire here for legacy reasons.
        startCommitLifeCyclesTimer();
        nextEffect = firstEffect;
        do {
            if (__DEV__) {
                invokeGuardedCallback(
                    null,
                    commitLayoutEffects,
                    null,
                    root,
                    expirationTime,
                );
                if (hasCaughtError()) {
                    invariant(nextEffect !== null, 'Should be working on an effect.');
                    const error = clearCaughtError();
                    captureCommitPhaseError(nextEffect, error);
                    nextEffect = nextEffect.nextEffect;
                }
            } else {
                try {
                    commitLayoutEffects(root, expirationTime);
                } catch (error) {
                    invariant(nextEffect !== null, 'Should be working on an effect.');
                    captureCommitPhaseError(nextEffect, error);
                    nextEffect = nextEffect.nextEffect;
                }
            }
        } while (nextEffect !== null);
        stopCommitLifeCyclesTimer();

        nextEffect = null;

        // Tell Scheduler to yield at the end of the frame, so the browser has an
        // opportunity to paint.
        requestPaint();

        if (enableSchedulerTracing) {
            popInteractions(((prevInteractions: any): Set < Interaction > ));
        }
        executionContext = prevExecutionContext;
    } else {
        // No effects.
        root.current = finishedWork;
        // Measure these anyway so the flamegraph explicitly shows that there were
        // no effects.
        // TODO: Maybe there's a better way to report this.
        startCommitSnapshotEffectsTimer();
        stopCommitSnapshotEffectsTimer();
        if (enableProfilerTimer) {
            recordCommitTime();
        }
        startCommitHostEffectsTimer();
        stopCommitHostEffectsTimer();
        startCommitLifeCyclesTimer();
        stopCommitLifeCyclesTimer();
    }