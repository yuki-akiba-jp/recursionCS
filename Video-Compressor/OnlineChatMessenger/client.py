import socket

class ChatClient:
    def __init__(self, host, port):
        self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.client.connect((host, port))
        self.receive()

    def send_msg(self):
        while True:
            message = f'{nickname}: {input("")}'
            self.client.send(message.encode('utf-8'))

    def receive(self):
        while True:
            try:
                message = self.client.recv(1024).decode('utf-8')
                if message == 'NICK':
                    self.client.send(nickname.encode('utf-8'))
                else:
                    print(message)
            except:
                print("An error occurred!")
                self.client.close()
                break

if __name__ == "__main__":
    nickname = input("Choose a nickname: ")
    chat_client = ChatClient('127.0.0.1', 5555)
