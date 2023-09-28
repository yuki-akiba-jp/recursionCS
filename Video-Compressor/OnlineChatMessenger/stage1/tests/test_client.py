# Assuming the refactored client code is in 'client.py'
import pytest
import socket
import threading
from client import run_client

# Mock UDP Server
def mock_udp_server():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_socket.bind(('127.0.0.1', 12345))
    while True:
        data, addr = server_socket.recvfrom(4096)
        server_socket.sendto(data, addr)  # Echo the received data

@pytest.fixture(scope="module")
def start_mock_server():
    server_thread = threading.Thread(target=mock_udp_server)
    server_thread.daemon = True  # Daemonize thread
    server_thread.start()

def test_client_send_receive_message(start_mock_server, monkeypatch):
    # Mock user inputs
    monkeypatch.setattr('builtins.input', lambda _: 'testuser' if _ == "Enter your username: " else 'Hello')

    # Mock print to capture printed messages
    printed_messages = []
    monkeypatch.setattr('builtins.print', lambda msg: printed_messages.append(msg))

    try:
        run_client()  # This will run until an empty message is sent
    except KeyboardInterrupt:
        pass

    # Check if the client printed the received message
    assert printed_messages[0] == 'testuser: Hello'
