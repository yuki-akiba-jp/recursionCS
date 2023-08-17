
import sys


def reverse(contents):
    with open(sys.argv[3], 'w') as f:
        f.write(contents[::-1])

def copy(contents):
    with open(sys.argv[3], 'w') as f:
        f.write(contents)

def dupulicate_contents(contents):
    with open(sys.argv[2], 'w') as f:
        f.write(contents*int(sys.argv[3]))

def find_needle(contents):
    contents = contents.replace('needle',sys.argv[3])
    with open(sys.argv[1], 'w') as f:
        f.write(contents)
    print(contents)


with open(sys.argv[2], 'r') as f:
    contents = f.read().strip()
    if sys.argv[1] == 'reverse':
        reverse(contents)
    elif sys.argv[1] == 'copy':
        copy(contents)
    elif sys.argv[1] == 'duplicate-contents':
        dupulicate_contents(contents)
    elif sys.argv[1] == 'find-needle':
        find_needle(contents)


