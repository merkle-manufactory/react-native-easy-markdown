import {
    Text,
    View,
} from 'react-native-web';

type Node = {
    type?: {
        displayName?: string,
        name?: string,
    },
}


export function concatStyles(extras, newStyle) {
    console.log('concatStyles', extras, newStyle)
    let newExtras;
    if (extras) {
        newExtras = JSON.parse(JSON.stringify(extras));

        if (extras.style) {
            newExtras.style.push(newStyle);
        } else {
            newExtras.style = [newStyle];
        }
    } else {
        newExtras = {
            style: [newStyle]
        };
    }
    return newExtras;
}

// Make sure every node is of text type
// If we don't know how to identify a node, assume it is not text
export function isTextOnly(nodes: Array<Node>) {
    console.log('isTextOnly');
    console.dir(nodes);
    try {
        if (nodes.length) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i] &&
                    typeof nodes[i].hasOwnProperty === 'function' &&
                    nodes[i].hasOwnProperty('type') &&
                    typeof nodes[i].type.hasOwnProperty === 'function' &&
                    (
                        nodes[i].type.hasOwnProperty('displayName') ||
                        // https://github.com/lappalj4/react-native-easy-markdown/issues/17#issuecomment-387807021
                        nodes[i].type.hasOwnProperty('name')
                    )
                ) {
                    if (nodes[i].type.displayName !== 'Text' && nodes[i].type.name !== 'Text') {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
    } catch (e) {
        return false;
    }

    console.log('TRUE');
    return true;
}

// View components can never be inside Text components
// Sibling Text components will wrap when they're nested, unless they are all wrapped in a Text component
function getSafeWrapper(nodes: Array<Node>) {
    return isTextOnly(nodes) ? Text : View;
}

export function logDebug(nodeTree, level = 0) {
    for (let i = 0; i < nodeTree.length; i++) {
        const node = nodeTree[i];

        if (node) {
            let prefix = Array(level).join('-');
            console.log(prefix + '> ' + node.key + ', NODE TYPE: ' + node.type.displayName);
            if (Array.isArray(node.props.children)) {
                this.logDebug(node.props.children, level + 1);
            }
        }
    }
}
