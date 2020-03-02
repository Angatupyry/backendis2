# Backend del proyecto IS2
## Inicializar

1. Instalar dependencias

    ```
    cd path/to/backenis2
    npm install
    ```

2. Iniciar la APP

    ```
    npm run dev
    ```
3. Crear el archivo config.js

    ```
    cd path/to/backenis2 touch config.js
    ```
4. Agregar al archivo config.js

    ```
    module.exports = {
    api :{
        port: process.env.API_PORT || 3000
    }
}
    ```
    
