
# Comparador

El proyecto está diseñado para leer dos archivos y compararlos entre sí. Uno de los archivos es un registro de recargas de telefónica y el otro es un archivo complementario de BBVA. El resultado de la comparación se muestra en una tabla con los registros que son diferentes entre los dos archivos.


## Features
- getFileName1(): Lee el primer archivo, lo divide en un array, y luego en un array multidimensional.

- getFileName2(): Lee el segundo archivo, lo divide en un array, y luego en un array multidimensional.

- removeDuplicatesAndEmpty(array): Filtra los duplicados y las cadenas vacías del array.

- loading(): Cambia el cursor a un icono de carga, cambia el texto del botón a "Comparando...", espera un segundo, ejecuta la función comparacion(), cambia el texto del botón a "Validando...", ejecuta la función addData(), cambia el texto del botón a "Comparar", oculta la animación de carga, y cambia el cursor de nuevo al valor predeterminado.


## Usage/Examples

- Entra a https://araxielfenix.github.io/Comparador/
- La comparación puede tardar unos segundos en completarse.
- El archivo de registro de llamadas de telefónica debe tener el siguiente formato: fecha, hora, número de teléfono, duración de la llamada, costo de la llamada, etc.
- El archivo complementario de BBVA debe tener el siguiente formato: fecha, hora, número de teléfono, importe, etc.

## Contributing

Si deseas contribuir a este proyecto, haz un fork del repositorio, crea una rama nueva, haz tus cambios y envía una pull request.


## Authors

- [@araxielfenix](https://github.com/Araxielfenix)
