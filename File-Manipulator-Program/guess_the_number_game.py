import random

min_val = int(input("Enter the minimum value: "))
max_val = int(input("Enter the maximum value: "))

answer = random.randint(min_val, max_val)

while True:
    user_answer = int(input("Guess a number: "))
    if user_answer == answer:
        print(user_answer, "is the correct answer")
        break

    if user_answer< answer:
        print(user_answer, "is too low")
    elif user_answer > answer:
        print(user_answer, "is too high")

