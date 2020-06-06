# envia lectura al servidor
# sudo timedatectl set-timezone America/Bogota
import socket
import json

def http_get(url):
    _, _, host, path = url.split('/', 3)
    host = 'myfinan.com'
    addr = socket.getaddrinfo(host, 8085)[0][-1]
    s = socket.socket()
    s.connect(addr)
    print(addr, path)
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

def grabaMovimiento(IDlector, codigo, fecha, concepto, preciov, precioc, cantidad):
# def agregaLecturaI(email, clave, IDlector, concepto, cb, cantidad, precioc, preciov, fecha):
    http_get("http://myfinan.com:8085/function/GrabaMovimientoI('oscartienda@gmail.com','oscar',%s,'%s','%s', %s, %s,%s,'%s')?pagina=invadmov" 
                % (IDlector, concepto, codigo, cantidad, precioc, preciov, fecha))

grabaMovimiento(1, '622300124526', '2019-10-13', 's', 600, 500, 1) # galleta ritz
# agregaLectura(1, '702914164009', '2019-10-14', 's', 700, 600, 1) # chocoramo mini
