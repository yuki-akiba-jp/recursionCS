import subprocess

subprocess.run(["python3", "file_manipulator.py",'reverse','in','out'])
subprocess.run(["python3", "file_manipulator.py",'copy','in','out'])
subprocess.run(["python3", "file_manipulator.py",'duplicate-contents','in','3'])
subprocess.run(["python3", "file_manipulator.py",'find-needle','in','newstring'])
