# Assuming the refactored server code is in 'server.py'
import socket
import threading

import pytest

from server import run_server


# Mock UDP Client
def mock_udp_client(message):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    client_socket.sendto(message.encode('utf-8'), ('127.0.0.1', 12345))
    data, _ = client_socket.recvfrom(4096)
    client_socket.close()
    return data.decode('utf-8')

@pytest.fixture(scope="module")
def start_server():
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True  # Daemonize thread
    server_thread.start()

def test_server_relay_message(start_server):
    # Send a message from one mock client
    mock_udp_client("Hello from Client 1")

    # Send a message from another mock client and check if it receives the message from the first client
    received_message = mock_udp_client("Hello from Client 2")
    assert received_message == "Hello from Client 1"
