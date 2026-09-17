"""Starts the Astro `preview` server once per test session and tears it down after.

Skips launching its own server if one is already listening on the expected
port (e.g. when CI starts `npm run preview` itself before running pytest).
"""

import socket
import subprocess
import time
from pathlib import Path

import pytest

PROJECT_ROOT = Path(__file__).resolve().parent.parent
HOST = "127.0.0.1"
PORT = 4321


def _port_open() -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.5)
        return sock.connect_ex((HOST, PORT)) == 0


def _wait_for_port(timeout: float = 30.0) -> None:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if _port_open():
            return
        time.sleep(0.5)
    raise RuntimeError(f"Preview server did not start listening on {HOST}:{PORT} within {timeout}s")


@pytest.fixture(scope="session", autouse=True)
def preview_server():
    if _port_open():
        # Already running (e.g. started by CI, or a previous local run).
        yield
        return

    process = subprocess.Popen(
        ["npm", "run", "preview", "--", "--host", HOST, "--port", str(PORT)],
        cwd=PROJECT_ROOT,
        shell=True,
    )
    try:
        _wait_for_port()
        yield
    finally:
        process.terminate()
        try:
            process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            process.kill()
