import socket

SERVER_IP = '127.0.0.1'
SERVER_PORT = 9001
BUFFER_SIZE = 4096

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind((SERVER_IP, SERVER_PORT))

clients = set()

print(f"Server started at {SERVER_IP}:{SERVER_PORT}")

try:
    while True:
        message, client_address = server_socket.recvfrom(BUFFER_SIZE)
        clients.add(client_address)

        print(f"Received message from {client_address}: {message.decode('utf-8')}")

        # Relay the message to all connected clients
        for client in clients:
            if client != client_address:
                server_socket.sendto(message, client)

except KeyboardInterrupt:
    print("\nServer shutting down...")
    server_socket.close()
