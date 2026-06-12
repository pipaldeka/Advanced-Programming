import gc
import sys

class Node:
    def __init__(self, name):
        self.name = name
        self.link = None
    def __repr__(self):
        return f"Node({self.name!r})"

A = Node("A")
B = Node("B")
A.link = B
B.link = A

print(sys.getrefcount(A))
print(sys.getrefcount(B))

gc.disable()
del A
del B

print("\nInvestigating memory...")
found = [obj for obj in gc.get_objects() if isinstance(obj, Node)]
print("Objects still in memory:", found)

print("\nCleaning...")
print("Collected:", gc.collect())