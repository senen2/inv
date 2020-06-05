# obtiene datos del servidor
import socket
import json

def http_get(url):
    _, _, host, path = url.split('/', 3)
    host = 'myfinan.com'
    addr = socket.getaddrinfo(host, 8085)[0][-1]
    s = socket.socket()
    s.connect(addr)
    s.send(bytes('GET /%s HTTP/1.0\r\nHost: %s\r\n\r\n' % (path, host), 'utf8'))
    result = ''
    while True:
        data = s.recv(100)
        if data:
            result = result + str(data, 'utf8')
        else:
            break
    s.close()

    d = json.loads('{' + result.split('{', 1)[1])
    return d['datos']

r = http_get("http://myfinan.com:8085/function/MovimientosI('oscartienda@gmail.com','oscar','2019-10-13')?pagina=invmov")
print(r)

