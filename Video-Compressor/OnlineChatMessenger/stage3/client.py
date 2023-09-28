import socket
import threading
import tkinter as tk
from tkinter import scrolledtext

SERVER_IP = '127.0.0.1'
SERVER_PORT = 12345
BUFFER_SIZE = 4096

# Create a UDP socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

def receive_messages():
    while True:
        data, server = client_socket.recvfrom(BUFFER_SIZE)
        chat_display.insert(tk.END, data.decode('utf-8') + '\n')

def send_message(event=None):
    message = message_entry.get()
    if not message:
        return
    full_message = f"{username}: {message}"
    client_socket.sendto(full_message.encode('utf-8'), (SERVER_IP, SERVER_PORT))
    message_entry.delete(0, tk.END)

# GUI Setup
root = tk.Tk()
root.title("Chat Client")

frame = tk.Frame(root)
scrollbar = tk.Scrollbar(frame)
chat_display = scrolledtext.ScrolledText(frame, height=20, width=50, yscrollcommand=scrollbar.set)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
chat_display.pack(side=tk.LEFT, fill=tk.BOTH)
chat_display.pack()
frame.pack()

message_entry = tk.Entry(root, width=40)
message_entry.bind("<Return>", send_message)
message_entry.pack()

send_button = tk.Button(root, text="Send", command=send_message)
send_button.pack()

username = input("Enter your username: ")
threading.Thread(target=receive_messages).start()

root.mainloop()
