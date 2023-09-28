import socket

class Server:
    def __init__(self, host='127.0.0.1', port=12345):
        self.chat_rooms = []
        self.host = host
        self.port = port
        self.tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.udp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def start(self):
        # Start the TCP server socket
        self.tcp_server_socket.bind((self.host, self.port))
        self.tcp_server_socket.listen(5)
        print(f"TCP Server started on {self.host}:{self.port}")

        # Start the UDP server socket
        self.udp_server_socket.bind((self.host, self.port + 1))
        print(f"UDP Server started on {self.host}:{self.port + 1}")

        while True:
            client_socket, addr = self.tcp_server_socket.accept()
            # Handle client connection in a separate thread or process
            pass

    def stop(self):
        self.tcp_server_socket.close()
        self.udp_server_socket.close()

    def relay_message(self, message):
        for room in self.chat_rooms:
            if room.name == message.room_name:
                room.send_message(message.sender, message.content)

    def create_chat_room(self, room_name, host):
        from chatroom import ChatRoom
        chat_room = ChatRoom(room_name, host)
        self.chat_rooms.append(chat_room)
        return chat_room

    def join_chat_room(self, room_name, client):
        for room in self.chat_rooms:
            if room.name == room_name:
                room.add_client(client)
                client.current_room = room

    def leave_chat_room(self, room_name, client):
        for room in self.chat_rooms:
            if room.name == room_name:
                room.remove_client(client)
                client.current_room = None
