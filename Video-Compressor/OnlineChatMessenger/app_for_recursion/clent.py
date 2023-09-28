import socket
import threading

MAX_MESSAGE_SIZE = 4096
PORT = 8888

class ChatClient:
    def __init__(self, server_ip, server_port, username):
        self.server_ip = server_ip
        self.server_port = server_port
        self.username = username
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def send_message(self, message):
        data = bytes([len(self.username)]) + self.username.encode('utf-8') + message.encode('utf-8')
        self.client_socket.sendto(data, (self.server_ip, self.server_port))

    def receive_messages(self):
        while True:
            data, _ = self.client_socket.recvfrom(MAX_MESSAGE_SIZE)
            username_len = data[0]
            username = data[1:1+username_len].decode('utf-8')
            message = data[1+username_len:].decode('utf-8')
            print(f"{username}: {message}")

    def start(self):
        threading.Thread(target=self.receive_messages).start()
        while True:
            message = input("Enter message: ")
            self.send_message(message)

username = input("Enter your username: ")
if __name__ == '__main__':
    client = ChatClient(server_ip='127.0.0.1', server_port=PORT, username=username)
    client.start()
