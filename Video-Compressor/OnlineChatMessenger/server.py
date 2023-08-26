import socket
import threading

from chatroom import ChatClient, ChatRoom


class ChatServer:
    def __init__(self, host, port):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((host, port))
        self.server_socket.listen(5)
        self.rooms = {}

    def get_room(self, room_name):
        if room_name not in self.rooms:
            room = ChatRoom(room_name)
            self.rooms[room_name] = room
        return self.rooms[room_name]

    def run(self):
        print("Chat server started...")
        while True:
            client_socket, client_address = self.server_socket.accept()
            client = ChatClient(self, client_socket, client_address)
            threading.Thread(target=client.handle).start()


if __name__ == "__main__":
    HOST, PORT = "localhost", 3000
    server = ChatServer(HOST, PORT)
    server.run()
