function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
      const effectTag = nextEffect.effectTag;
      if ((effectTag & Snapshot) !== NoEffect) {
          setCurrentDebugFiberInDEV(nextEffect);
          recordEffect();

          const current = nextEffect.alternate;
          commitBeforeMutationEffectOnFiber(current, nextEffect);

          resetCurrentDebugFiberInDEV();
      }
      if ((effectTag & Passive) !== NoEffect) {
          if (!rootDoesHavePassiveEffects) {
              rootDoesHavePassiveEffects = true;
              scheduleCallback(NormalPriority, () => {
                  flushPassiveEffects();
                  return null;
              });
          }
      }
      nextEffect = nextEffect.nextEffect;
  }
}

function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  while (nextEffect !== null) {
      const effectTag = nextEffect.effectTag;

      if (effectTag & ContentReset) {
          commitResetTextContent(nextEffect);
      }

      if (effectTag & Ref) {
          const current = nextEffect.alternate;
          if (current !== null) {
              commitDetachRef(current);
          }
      }

      let primaryEffectTag =
          effectTag & (Placement | Update | Deletion | Hydrating);
      switch (primaryEffectTag) {
          case Placement:
              {
                  commitPlacement(nextEffect);
                  nextEffect.effectTag &= ~Placement;
                  break;
              }
          case PlacementAndUpdate:
              {
                  commitPlacement(nextEffect);
                  nextEffect.effectTag &= ~Placement;

                  // Update
                  const current = nextEffect.alternate;
                  commitWork(current, nextEffect);
                  break;
              }
          case Hydrating:
              {
                  nextEffect.effectTag &= ~Hydrating;
                  break;
              }
          case HydratingAndUpdate:
              {
                  nextEffect.effectTag &= ~Hydrating;

                  // Update
                  const current = nextEffect.alternate;
                  commitWork(current, nextEffect);
                  break;
              }
          case Update:
              {
                  const current = nextEffect.alternate;
                  commitWork(current, nextEffect);
                  break;
              }
          case Deletion:
              {
                  commitDeletion(root, nextEffect, renderPriorityLevel);
                  break;
              }
      }

      recordEffect();

      resetCurrentDebugFiberInDEV();
      nextEffect = nextEffect.nextEffect;
  }
}