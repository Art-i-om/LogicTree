import { logicalOperations } from "./operations/operations";

type LogicalFunction = (values: boolean[]) => boolean;
type LogicalOperation = 'AND' | 'OR' | 'XOR' | 'NOT' | 'NAND' | 'NOR';

interface LogicalNode {
    operation?: LogicalOperation;
    evaluator?: LogicalFunction;
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
            const operationFunction = logicalOperations[node.operation];
            return operationFunction ? operationFunction(childValues) : false;
        }

        return false;
    }

    evaluate(): boolean {
        if (!this.root) return false;
        return this.evaluateNode(this.root);
    }
}

const tree = new LogicalTree('XOR');
const root = tree.getRoot()!;

tree.addValueNode(root, true);
tree.addValueNode(root, true);

const result = tree.evaluate();
console.log(result);
