export function createInstance(
    type: string,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: Object
): Instance {
    let parentNamespace: string;
    parentNamespace = ((hostContext: any): HostContextProd);
    const domElement: Instance = createElement(
        type,
        props,
        rootContainerInstance,
        parentNamespace
    );
    precacheFiberNode(internalInstanceHandle, domElement);
    updateFiberProps(domElement, props);
    return domElement;
}

export function createElement(
    type: string,
    props: Object,
    rootContainerElement: Element | Document,
    parentNamespace: string,
): Element {
    let isCustomComponentTag;

    const ownerDocument: Document = getOwnerDocumentFromRootContainer(
        rootContainerElement,
    );
    let domElement: Element;
    let namespaceURI = parentNamespace;
    if (namespaceURI === HTML_NAMESPACE) {
        namespaceURI = getIntrinsicNamespace(type);
    }
    if (namespaceURI === HTML_NAMESPACE) {
        if (type === 'script') {
            const div = ownerDocument.createElement('div');
            div.innerHTML = '<script><' + '/script>'; // eslint-disable-line
            const firstChild = ((div.firstChild: any): HTMLScriptElement);
            domElement = div.removeChild(firstChild);
        } else if (typeof props.is === 'string') {
            domElement = ownerDocument.createElement(type, { is: props.is });
        } else {
            domElement = ownerDocument.createElement(type);
            if (type === 'select') {
                const node = ((domElement: any): HTMLSelectElement);
                if (props.multiple) {
                    node.multiple = true;
                } else if (props.size) {
                    node.size = props.size;
                }
            }
        }
    } else {
        domElement = ownerDocument.createElementNS(namespaceURI, type);
    }

    return domElement;
}