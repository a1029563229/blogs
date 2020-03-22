function insertOrAppendPlacementNodeIntoContainer(
    node: Fiber,
    before: ? Instance,
    parent : Container,
): void {
    const { tag } = node;
    const isHost = tag === HostComponent || tag === HostText;
    if (isHost || (enableFundamentalAPI && tag === FundamentalComponent)) {
        const stateNode = isHost ? node.stateNode : node.stateNode.instance;
        if (before) {
            insertInContainerBefore(parent, stateNode, before);
        } else {
            appendChildToContainer(parent, stateNode);
        }
    } else if (tag === HostPortal) {} else {
        const child = node.child;
        if (child !== null) {
            insertOrAppendPlacementNodeIntoContainer(child, before, parent);
            let sibling = child.sibling;
            while (sibling !== null) {
                insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
                sibling = sibling.sibling;
            }
        }
    }
}