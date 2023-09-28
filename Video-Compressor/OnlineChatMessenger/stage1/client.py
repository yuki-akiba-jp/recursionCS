import socket

SERVER_IP = '127.0.0.1'
SERVER_PORT = 9001
BUFFER_SIZE = 4096

# Create a UDP socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

username = input("Enter your username: ")

try:
    while True:
        message = input("Enter your message: ")
        if not message:
            continue

        # Prepend the username to the message
        full_message = f"{username}: {message}"
        client_socket.sendto(full_message.encode('utf-8'), (SERVER_IP, SERVER_PORT))

        # Listen for incoming messages
        data, server = client_socket.recvfrom(BUFFER_SIZE)
        print(data.decode('utf-8'))

except KeyboardInterrupt:
    print("\nDisconnecting from server...")
    client_socket.close()
