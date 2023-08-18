import os

pid = os.fork()
if pid>0:
    print("it's parent process",os.getpid(),pid)
else:
    print("it's child process",os.getpid(),pid)

