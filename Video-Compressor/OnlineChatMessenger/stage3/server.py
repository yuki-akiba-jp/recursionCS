import socket
from multiprocessing import Process, Manager

# Server Configuration
SERVER_IP = '127.0.0.1'
SERVER_PORT = 12345
BUFFER_SIZE = 4096

def handle_chat_room(chat_room_name, chat_room_clients, server_socket):
    while True:
        for client_address in chat_room_clients:
            message, addr = server_socket.recvfrom(BUFFER_SIZE)
            if addr == client_address:
                for other_client in chat_room_clients:
                    if other_client != client_address:
                        server_socket.sendto(message, other_client)

def main():
    # Create a UDP socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_socket.bind((SERVER_IP, SERVER_PORT))

    clients = {}
    chat_rooms = {}

    manager = Manager()
    chat_room_processes = {}

    print(f"Server started at {SERVER_IP}:{SERVER_PORT}")

    try:
        while True:
            message, client_address = server_socket.recvfrom(BUFFER_SIZE)
            decoded_msg = message.decode('utf-8')
            command, *args = decoded_msg.split()

            if command == "/create":
                chat_room_name = args[0]
                if chat_room_name not in chat_rooms:
                    chat_rooms[chat_room_name] = manager.list([client_address])
                    chat_room_processes[chat_room_name] = Process(target=handle_chat_room, args=(chat_room_name, chat_rooms[chat_room_name], server_socket))
                    chat_room_processes[chat_room_name].start()
                    clients[client_address] = chat_room_name
                    print(f"Chat room '{chat_room_name}' created by {client_address}")
                    server_socket.sendto(f"Chat room '{chat_room_name}' created!".encode('utf-8'), client_address)
                else:
                    server_socket.sendto(f"Chat room '{chat_room_name}' already exists!".encode('utf-8'), client_address)

            elif command == "/join":
                chat_room_name = args[0]
                if chat_room_name in chat_rooms:
                    chat_rooms[chat_room_name].append(client_address)
                    clients[client_address] = chat_room_name
                    print(f"{client_address} joined chat room '{chat_room_name}'")
                    server_socket.sendto(f"Joined chat room '{chat_room_name}'".encode('utf-8'), client_address)
                else:
                    server_socket.sendto(f"Chat room '{chat_room_name}' does not exist!".encode('utf-8'), client_address)

    except KeyboardInterrupt:
        print("\nServer shutting down...")
        for process in chat_room_processes.values():
            process.terminate()
        server_socket.close()

if __name__ == "__main__":
    main()
