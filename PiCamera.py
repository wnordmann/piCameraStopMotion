from picamera import PiCamera
from time import sleep

camera = PiCamera()

camera.start_preview()
sleep(3)
camera.capture('home/pi/image_test/image3.jpg')
camera.stop_preview()