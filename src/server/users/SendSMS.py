import serial
import sys
def send_text(number, text, path='COM10'):
    ser = serial.Serial(path, 9600,timeout=1)
    if not ser.isOpen():
        ser.open()
    # set text mode
    ser.write(('AT+CMGF=%d\r' % 1).encode())
    # set number
    ser.write(('AT+CMGS="%s"\r' % number).encode())
    # send message
    ser.write(("%s\x1a" % text).encode())
    print (ser.readlines())
    ser.close()
print (sys.argv[1])
print (sys.argv[2])
send_text(sys.argv[1], sys.argv[2])
