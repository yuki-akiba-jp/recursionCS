import math
import random


class BinaryTree:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

    def printInOrder(self):
        self.inOrderWalk(self)
        print("")

    def inOrderWalk(self, tRoot):
        if tRoot is not None:
            self.inOrderWalk(tRoot.left)
            print(str(tRoot.data), end=' ')
            self.inOrderWalk(tRoot.right)

    def printReverseOrder(self):
        self.reverseOrderWalk(self)
        print("")

    def reverseOrderWalk(self, tRoot):
        if tRoot is not None:
            self.reverseOrderWalk(tRoot.right)
            print(str(tRoot.data), end=' ')
            self.reverseOrderWalk(tRoot.left)

    def printPreOrder(self):
        self.preOrderWalk(self)
        print("")

    def preOrderWalk(self, tRoot):
        if tRoot is not None:
            print(str(tRoot.data), end=' ')
            self.preOrderWalk(tRoot.left)
            self.preOrderWalk(tRoot.right)

    def insert(self, value):
        iterator = self.root
        while iterator is not None:
            if iterator.data > value and iterator.left == None:
                iterator.left = BinaryTree(value)
            elif iterator.data < value and iterator.right == None:
                iterator.right = BinaryTree(value)
            iterator = iterator.left if iterator.data > value else iterator.right

    def transplant(self, nodeParent, node, target):
        if nodeParent == None:
            self.root = target
        elif nodeParent.left == node:
            nodeParent.left = target
        else:
            nodeParent.right = target

    def deleteNode(self, key):
        if self.root == None:
            return None
        node = self.search(key)
        if self.keyExist(key) == False:
            return self.root

        parent = self.findParent(node)
        # case 1: ノードNの左が空
        if node.left == None:
            self.transplant(parent, node, node.right)
        # case 2: ノードNの右が空
        elif node.right == None:
            self.transplant(parent, node, node.left)
        # case 3: 2つの子を持っている場合
        else:
            successor = self.findSuccessor(node)
            successorP = self.findParent(successor)

            # case 3 後続ノードSがすぐ右側にいる場合 : この場合、ノードNが後続ノードSの親になっているため、case4は必要ありません。単純にNの親であるPの部分木とSを移植すればokです。
            # 特別なケース (case 4) 後続ノードSがすぐ右側にいない場合 : この場合、後続Sの親も変更しなければいけません。
            if successor != node.right:
                # 後続ノードSをSの右部分木で移植します。Sをアップデートします。
                self.transplant(successorP, successor, successor.right)
                # Sの右側はノードNの右側になっている必要があります。
                successor.right = node.right

            # ノードNを後続Sで移植します。Sの左部分木をノードNの左部分木にします。
            self.transplant(parent, node, successor)
            successor.left = node.left

        def findParent(self, node):
            iterator = self.root
            parent = None
            while iterator != node:
                parent = iterator
                iterator = iterator.left if iterator.data > node.data else iterator.right
            return parent

        def findSuccessor(self, node):
            # 部分木
            targetNode = node
            # keyがBST内に存在しない場合、nullを返します。
            if targetNode == None:
                return None
            # keyのノードの右にある最小値を探します。
            if targetNode.right != None:
                return self.minimumNode(targetNode.right)

            successor = None
            iterator = self.root

            while iterator != None:
                if targetNode.data == iterator.data:
                    return successor
                # successorを左方向へずらしていきます。
                if targetNode.data < iterator.data and (successor == None or iterator.data < successor.data):
                    successor = iterator
                if targetNode.data < iterator.data:
                    iterator = iterator.left
                else:
                    iterator = iterator.right

            return successor

        def minimumNode(self, node):
            iterator = node
            while iterator != None and iterator.left != None:
                iterator = iterator.left
            return iterator

        def printSorted(self):
            self.root.printInOrder()

        def generateRandomBST(self, arrList):
            if not arrList:
                self.root = None
            else:
                BinarySearchTree.shuffle(arrList)
                self.root = BinaryTree(arrList[0])
            for i in range(len(arrList)):
                #　シャッフルした配列の要素を一つずつinsertでBSTに挿入します。
                self.insert(arrList[i])

        # in-placeでシャッフルする関数
        @staticmethod
        def shuffle(list):
            for i in range(len(list) - 1, -1, -1):
                j = math.floor(random.randint(0, i + 1))
                [list[i], list[j]] = [list[j], list[i]]

        return list


class BinarySearchTree:
    def __init__(self, arrList):
        sortedList = sorted(arrList)
        self.root = BinarySearchTree.sortedArrayToBST(sortedList)

    @staticmethod
    def sortedArrayToBST(array):
        if len(array) == 0:
            return None
        return BinarySearchTree.sortedArrayToBSTHelper(array, 0, len(array)-1)

    @staticmethod
    def sortedArrayToBSTHelper(arr, start, end):
        if start == end:
            return BinaryTree(arr[start], None, None)

        mid = math.floor((start+end)/2)

        left = None
        if mid-1 >= start:
            left = BinarySearchTree.sortedArrayToBSTHelper(arr, start, mid-1)

        right = None
        if mid+1 <= end:
            right = BinarySearchTree.sortedArrayToBSTHelper(arr, mid+1, end)

        root = BinaryTree(arr[mid], left, right)
        return root

    def keyExist(self, key):
        iterator = self.root
        while iterator is not None:
            if iterator.data == key:
                return True
            if iterator.data > key:
                iterator = iterator.left
            else:
                iterator = iterator.right

        return False

    def search(self, key):
        iterator = self.root
        while iterator is not None:
            if iterator.data == key:
                return iterator
            if iterator.data > key:
                iterator = iterator.left
            else:
                iterator = iterator.right

        return None


def bstInsert(root, key):
    if keyExist(root, key):
        return root

    iterator = root
    while iterator is not None:
        if iterator.data > key and iterator.left == None:
            iterator.left = BinaryTree(key)
        elif iterator.data < key and iterator.right == None:
            iterator.right = BinaryTree(key)
        iterator = iterator.left if iterator.data > key else iterator.right
    return root


def keyExist(root, key):
    iterator = root
    while iterator is not None:
        if iterator.data == key:
            return True
        if iterator.data > key:
            iterator = iterator.left
        else:
            iterator = iterator.right

    return False


def validateBST(root):
    def validateBSTHelper(root, minValue, maxValue):

        if root == None:
            return True
        data = root.data

        if minValue is not None and minValue >= data:
            return False
        if maxValue is not None and maxValue <= data:
            return False

        left = validateBSTHelper(
            root.left, minValue, data) if root.left is not None else True
        right = validateBSTHelper(
            root.right, data, maxValue) if root.right is not None else True
        return left and right
    return validateBSTHelper(root, None, None)




def symmetricTree(root):
    def getListOfLeft(root):
        return getLeftHelper(root.left, [])

    def getLeftHelper(root, li: list):
        if root is not None:
            li.append(root.data)
            getLeftHelper(root.left, li)
            getLeftHelper(root.right, li)
        else:
            li.append(None)
        return li

    def getListOfRight(root):
        return getRightHelper(root.right, [])

    def getRightHelper(root, li: list):
        if root is not None:
            li.append(root.data)
            getRightHelper(root.right, li)
            getRightHelper(root.left, li)
        else:
            li.append(None)
        return li
    if not root:
        return True
    left = getListOfLeft(root)
    right = getListOfRight(root)
    if left == right:
        return True
    else:
        return False



def levelOrderTraversal(root):
