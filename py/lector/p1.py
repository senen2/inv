# envia una instruccion al servidor y recibe su respuesta
import socket

def http_get(url):
    _, _, host, path = url.split('/', 3)
    host = 'myfinan.com'
    addr = socket.getaddrinfo(host, 8085)[0][-1]
    s = socket.socket()
    s.connect(addr)
    s.send(bytes('GET /%s HTTP/1.0\r\nHost: %s\r\n\r\n' % (path, host), 'utf8'))
    while True:
        data = s.recv(100)
        if data:
            print(str(data, 'utf8'), end='')
        else:
            break
    s.close()

http_get("http://myfinan.com:8085/function/MovimientosI('oscartienda@gmail.com','oscar','2019-10-13')?pagina=invmov")
