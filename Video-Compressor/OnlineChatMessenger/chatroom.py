class ChatRoom:
    def __init__(self, name):
        self.clients = []  # List of clients in this room
        self.name = name

    def broadcast(self, msg, from_client):
        for client in self.clients:
            if client != from_client:
                client.send_message(msg)

    def add_client(self, client):
        self.clients.append(client)

    def remove_client(self, client):
        self.clients.remove(client)

class ChatClient:
    def __init__(self, server, socket, address):
        self.server = server
        self.socket = socket
        self.address = address
        self.room = None

    def send_message(self, msg):
        self.socket.sendall(msg.encode())

    def handle(self):
        while True:
            msg = self.socket.recv(1024).decode()
            if msg == "/quit":
                if self.room:
                    self.room.remove_client(self)
                    self.room.broadcast(f"{self.address} has left the chat.", self)
                break
            elif msg.startswith("/join "):
                _, room_name = msg.split(" ", 1)
                if self.room:
                    self.room.remove_client(self)
                self.room = self.server.get_room(room_name)
                self.room.add_client(self)
                self.send_message(f"You have joined the room: {room_name}")
            else:
                if self.room:
                    self.room.broadcast(f"{self.address}: {msg}", self)
        self.socket.close()
