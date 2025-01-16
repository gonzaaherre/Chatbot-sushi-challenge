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
    
Instalar Dependencias

    En la terminal, ejecuta:
    npm install
    Esto instalará todas las dependencias necesarias para el proyecto.

Cargar Datos Iniciales en la Base de Datos
    
    1. En una terminal, ejecuta el siguiente comando para cargar los datos de prueba:
    npx ts-node src/seed/FAQ-seed.ts
    2. Esto cargará el menú, FAQs y algunos pedidos de ejemplo en la base de datos.
    3. una vez instalada la semilla, entrar a http://localhost:8081 para ver la interfaz en mongo-express y poder ver los datos

Iniciar el Servidor

    Para iniciar el servidor, usa el comando:
    npm run start
    El backend estará disponible en http://localhost:3000.

Testing

    Para ejecutar los tests implementados:

    Abre una terminal en el directorio del proyecto.

    Ejecuta el comando:
    npm test