class Node {
    constructor(data) {
        this.data = data;
    }
}

class BinaryTree {

    add(data) {
        if(!this.root) {
            this.root = new Node(data);
            return; 
        }
        
        const newNode = new Node(data);
        let rootNode = this.root;
        while(rootNode){
            if(rootNode.data === newNode.data) {
                rootNode = null;
                return;
            }
            if(rootNode.data > newNode.data) {
                if(!rootNode.left) {
                    newNode.parent = rootNode;
                    rootNode.left = newNode;
                    rootNode = null;
                }else {
                    rootNode = rootNode.left;
                }
            } else if(rootNode.data < newNode.data) {
                 if(!rootNode.right) {
                    newNode.parent = rootNode;                     
                    rootNode.right = newNode;
                    rootNode = null;
                }else {
                    rootNode = rootNode.right;
                }
            }
        }
            
    }

    search(data) {
        if(!this.root) {
            throw new Error("no data in tree");
        }

        let rootNode = this.root;
        while(rootNode){
            if(rootNode.data === data) {
                return rootNode;
            }

            if(rootNode.data > data) {
                if(!rootNode.left) {
                    return;
                }else {
                    rootNode = rootNode.left;
                }
            } else if(rootNode.data < data) {
                 if(!rootNode.right) {
                    return;
                }else {
                    rootNode = rootNode.right;
                }
            }

        }    
    }

    remove(data) {
        let rootNode = this.search(data);
        if(!rootNode) {
            return -1;
        }
        
        let isRemoved = false;
        while(!isRemoved) {
            if(rootNode.left && !rootNode.right) {
                rootNode = rootNode.left;
                isRemoved = true;
            } else if(!rootNode.left && rootNode.right) {
                rootNode = rootNode.right;
                isRemoved = true;            
            } else if(!rootNode.left && !rootNode.right) {
                if(rootNode.parent.left.data === data) {
                    rootNode.parent.left = null;
                } else if(rootNode.parent.right.data === data){
                    rootNode.parent.right = null;
                }
                isRemoved = true;
            }
        }

    }

}

const tree =  new BinaryTree();
tree.add(10);
tree.add(20);
tree.add(5);
tree.add(15);
tree.add(25);
tree.add(7);
tree.add(4);

tree.remove(4);





