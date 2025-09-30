type LogicalOperation = 'AND' | 'OR' | 'XOR' | 'NOT' | 'NAND' | 'NOR';

interface LogicalNode {
    operation?: LogicalOperation;
    value?: boolean;
    children: LogicalNode[];
    parent?: LogicalNode;
}

class LogicalTree {
    private root: LogicalNode | null = null;

    constructor(rootOperation?: LogicalOperation, rootValue?: boolean) {
        if (rootOperation || rootValue !== undefined) {
            this.root = {
                operation: rootOperation,
                value: rootValue,
                children: []
            };
        }
    }

    getRoot(): LogicalNode | null {
        return this.root;
    }

    addOperationNode(parent: LogicalNode, operation: LogicalOperation): LogicalNode {
        const child: LogicalNode = {
            operation: operation,
            children: [],
            parent: parent
        };
        parent.children.push(child);
        return child;
    }

    addValueNode(parent: LogicalNode, value: boolean): LogicalNode {
        const child: LogicalNode = {
            value: value,
            children: [],
            parent: parent
        };
        parent.children.push(child);
        return child;
    }

    private evaluateNode(node: LogicalNode): boolean {
        if (node.value !== undefined) {
            return node.value;
        }

        if (node.operation) {
            const childValues = node.children.map(child => this.evaluateNode(child));

            switch (node.operation) {
                case "AND":
                    return childValues.every(val => val);
                case "OR":
                    return childValues.some(val => val);
                case "XOR":
                    return childValues.reduce((acc, val) => acc !== val, false);
                case 'NOT':
                    return !childValues[0];
                case 'NAND':
                    return !childValues.every(val => val);
                case 'NOR':
                    return !childValues.some(val => val);
                default:
                    return false;
            }
        }

        return false;
    }

    evaluate(): boolean {
        if (!this.root) return false;
        return this.evaluateNode(this.root);
    }
}

const tree = new LogicalTree('AND');
const root = tree.getRoot()!;

const orNode = tree.addOperationNode(root, 'OR');
const xorNode = tree.addOperationNode(root, 'XOR');

tree.addValueNode(orNode, true);
tree.addValueNode(orNode, false);

tree.addValueNode(xorNode, true);
tree.addValueNode(xorNode, true);

const result = tree.evaluate();
console.log(result);