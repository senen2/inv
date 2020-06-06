# obtiene datos del servidor
import socket
import json

def http_get(url):
    _, _, host, path = url.split('/', 3)
    host = 'myfinan.com'
    addr = socket.getaddrinfo(host, 8085)[0][-1]
    s = socket.socket()
    s.connect(addr)
    print(path)
    s.send(bytes('GET /%s HTTP/1.0\r\nHost: %s\r\n\r\n' % (path, host), 'utf8'))
    result = ''
    while True:
        data = s.recv(100)
        if data:
            result = result + str(data, 'utf8')
        else:
            break
    s.close()
    return result

def grabaLectura(IDlector, codigo, fecha):
    # http_get("http://myfinan.com:8085/function/AgregaLecturaI('oscartienda@gmail.com','oscar',1,'622300124526','2019-10-14','s',1)?pagina=invadmov")
    return http_get("http://myfinan.com:8085/function/TomaLecturaI('oscartienda@gmail.com','oscar',%s,'%s','%s')?pagina=invadmov" 
                % (IDlector, codigo, fecha))

def poneModo(IDlector, modo):
    # http_get("http://myfinan.com:8085/function/AgregaLecturaI('oscartienda@gmail.com','oscar',1,'622300124526','2019-10-14','s',1)?pagina=invadmov")
    http_get("http://myfinan.com:8085/function/PoneModoI('oscartienda@gmail.com','oscar',%s,'%s')?pagina=invmodo" 
                % (IDlector, modo))

poneModo(1, 'c')
a = grabaLectura(1, '62230012453326', '2019-10-13') # galleta ritz
# a = grabaLectura(1, '702914164009', '2019-10-14') # chocoramo mini
# a = grabaLectura(1, '555555555555', '2019-10-13')
print(a)