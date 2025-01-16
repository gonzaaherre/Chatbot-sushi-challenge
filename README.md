# Chatbot-sushi-challenge

1. Código

Repositorio en GitHub: https://github.com/gonzaaherre/Chatbot-sushi-challenge

2. Instalación y Ejecución del Proyecto

Requisitos Previos

    .Docker Desktop (para levantar la base de datos y mongo-express).

    .Node.js y npm instalados en tu sistema.

    .IDE recomendado: Visual Studio Code.

Pasos para Configurar y Ejecutar

    a. Clonar el Repositorio
    git clone https://github.com/gonzaaherre/Chatbot-sushi-challenge.git

    Abre el proyecto con tu IDE preferido.

    Configurar Variables de Entorno

        Crea un archivo .env en la raíz del proyecto.

        Copia y pega el contenido del archivo .env.example proporcionado.
        
Levantar el Contenedor de la Base de Datos

Abre una terminal y ejecuta el siguiente comando:

docker-compose up

Una vez que el contenedor esté en ejecución, puedes acceder a la interfaz de mongo-express para ver la base de datos:

URL de acceso: http://localhost:8081