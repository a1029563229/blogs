type Container = any;
type React$Element < T > = any;

export function render(
    element: React$Element < any > ,
    container: Container,
    callback: ? Function,
) {
    return legacyRenderSubtreeIntoContainer(
        null,
        element,
        container,
        false,
        callback,
    );
}

function legacyRenderSubtreeIntoContainer(
    parentComponent: ? React$Component < any, any > ,
    children : ReactNodeList,
    container: Container,
    forceHydrate: boolean,
    callback: ? Function,
) {
    let root: RootType = (container._reactRootContainer: any);
    let fiberRoot;
    if (!root) {
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
            container,
            forceHydrate,
        );
        fiberRoot = root._internalRoot;
        if (typeof callback === 'function') {
            const originalCallback = callback;
            callback = function() {
                const instance = getPublicRootInstance(fiberRoot);
                originalCallback.call(instance);
            };
        }
        unbatchedUpdates(() => {
            updateContainer(children, fiberRoot, parentComponent, callback);
        });
    } else {
        fiberRoot = root._internalRoot;
        if (typeof callback === 'function') {
            const originalCallback = callback;
            callback = function() {
                const instance = getPublicRootInstance(fiberRoot);
                originalCallback.call(instance);
            };
        }
        // Update
        updateContainer(children, fiberRoot, parentComponent, callback);
    }
    return getPublicRootInstance(fiberRoot);
}