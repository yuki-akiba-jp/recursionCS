import socket
import threading
import time
from datetime import datetime

MAX_MESSAGE_SIZE = 4096
PORT = 8888

class ChatServer:
    def __init__(self, port):
        self.clients = {}  # {address: last_received_time}
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  # Make this an instance variable
        self.server_socket.bind(('127.0.0.1', self.port))

    def handle_client(self, data, addr):
        username_len = data[0]
        username = data[1:1+username_len].decode('utf-8')
        message = data[1+username_len:].decode('utf-8')
        self.clients[addr] = datetime.now()

        print(f"{username}: {message}")

        for client_addr in self.clients.keys():
            if client_addr != addr:
                try:
                    self.server_socket.sendto(data, client_addr)  
                except:
                    del self.clients[client_addr]

    def cleanup_clients(self):
        while True:
            now = datetime.now()
            for addr, last_received in list(self.clients.items()):
                if (now - last_received).seconds > 60:  
                    del self.clients[addr]
            time.sleep(10)

    def start(self):
        threading.Thread(target=self.cleanup_clients).start()

        while True:
            data, addr = self.server_socket.recvfrom(MAX_MESSAGE_SIZE)  
            threading.Thread(target=self.handle_client, args=(data, addr)).start()

if __name__ == '__main__':
    server = ChatServer(port=PORT)
    server.start()
