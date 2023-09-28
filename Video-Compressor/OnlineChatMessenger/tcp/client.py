import socket
import sys

sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

# サーバが待ち受けている特定の場所にソケットを接続します。
server_address = './socket_file'
print('connecting to {}'.format(server_address))

try:
    sock.connect(server_address)
except socket.error as err:
    print(err)
    sys.exit(1)

try:
    message = b'Sending a message to the server side'
    sock.sendall(message)

    sock.settimeout(2)

    try:
        while True:
            #max data size is 32 bytes
            data = str(sock.recv(32))

            if data:
                print('Server response: ' + data)
            else:
                break

    except(TimeoutError):
        print('Socket timeout, ending listening for server messages')

finally:
    print('closing socket')
    sock.close()
