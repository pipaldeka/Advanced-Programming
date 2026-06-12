# Assignment 14

## Question

Create a scenario where objects are 'dead' but still have a reference count higher than zero, then force the Garbage Collector to clean them up. Do in Python only.

Implementation Steps:
1. Create a Node class with a name and a link attribute.
2. Create a Cycle: Instantiate Node A and Node B. Set A.link = B and B.link = A.
3. Check References: Use sys.getrefcount() to show that both objects have multiple references.
4. The Deletion: Use del A and del B.
5. The Investigation: Use the gc module to show that these objects still exist in memory because of the cycle.
6. The Cleanup: Call gc.collect() and print the number of unreachable objects collected.
