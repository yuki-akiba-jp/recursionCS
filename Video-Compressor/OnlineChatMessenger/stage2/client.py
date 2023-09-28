import socket


class Client:
    def __init__(self, token, server_host='127.0.0.1', server_port=12345):
        self.token = token
        self.current_room = None
        self.server_host = server_host
        self.server_port = server_port
        self.tcp_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def connect_to_server(self):
        self.tcp_socket.connect((self.server_host, self.server_port))

    def disconnect_from_server(self):
        self.tcp_socket.close()

    def create_chat_room(self, room_name):
        # Send a request to the server over TCP to create a chat room
        pass

    def join_chat_room(self, room_name):
        # Send a request to the server over TCP to join a chat room
        pass

    def leave_chat_room(self):
        # Send a request to the server over TCP to leave the current chat room
        pass

    def send_message(self, message_content):
        # Send a message to the current chat room over UDP
        pass

    def receive_message(self, message):
        print(f"{message.sender}: {message.content}")

class Message:
    def __init__(self, room_name, sender, content):
        from datetime import datetime
        self.room_name = room_name
        self.sender = sender
        self.content = content
        self.timestamp = datetime.now()
