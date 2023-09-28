class ChatRoom:
    def __init__(self, name, host):
        self.name = name
        self.host = host
        self.clients = [host]
        self.messages = []

    def send_message(self, sender, message_content):
        from client import Message
        message = Message(self.name, sender, message_content)
        self.messages.append(message)
        for client in self.clients:
            client.receive_message(message)

    def add_client(self, client):
        self.clients.append(client)

    def remove_client(self, client):
        self.clients.remove(client)
