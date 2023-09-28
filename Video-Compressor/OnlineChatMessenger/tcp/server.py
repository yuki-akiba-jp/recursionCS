import os
import socket

sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

server_address = './socket_file'

try:
    os.unlink(server_address)
except FileNotFoundError:
    pass

print('Starting up on {}'.format(server_address))

sock.bind(server_address)

sock.listen(1)

while True:
    connection, client_address = sock.accept()
    try:
        print('connection from', client_address)

        while True:
            # 16 bytes data is the maximum size of data that can be received at once
            data = connection.recv(16)

            data_str =  data.decode('utf-8')

            print('Received ' + data_str)

            if data:
                response = 'Processing ' + data_str

                connection.sendall(response.encode())

            else:
                print('no data from', client_address)
                break

    finally:
        print("Closing current connection")
        connection.close()
