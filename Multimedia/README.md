El proyecto que hemos creado se trata de un pipeline que consigue superponer dos vídeos. Para compilar el código hemos usado el siguiente comando

gcc -Wall entrega1.c -o entrega1 $(pkg-config --cflags --libs gstreamer-1.0)

y para que se reproduzcan los dos simultaneamente el siguiente

./entrega1 -f video1.mp4 -g video2.mp4

Por problemas de la máquina virtual y de la memoria dinámica, puede que sea necesario ejecutar el código compilado más de una vez.
