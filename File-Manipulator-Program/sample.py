
import sys

food = input()
sys.stdout.flush()
sys.stdout.write(food + "\n")
food = sys.stdin.readline()
print(food)
