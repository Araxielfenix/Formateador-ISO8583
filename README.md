
# Analizador

Este proyecto es un analizador de mensajes ISO 8583 que extrae información específica de un mensaje ISO de longitud fija.

## Features
La función analizarIso05() extrae la información del mensaje ISO que se ingresa en el campo de texto con id mensajeIso. La información extraída incluye:

-Tarjeta: número de cuenta de la tarjeta (pan).
-Bitmap: indicador de los elementos de datos presentes en el mensaje.
-Código de transacción: identificador de la transacción.
-Processing code: código que describe el tipo de transacción.
-Amount: monto de la transacción.
-Settlement amount: monto que se cargará en la cuenta del banco del adquirente.
-Transmission date and time: fecha y hora de la transacción en formato MMDDhhmmss.
-Conversion rate cardholder billing: tasa de conversión para la moneda del tarjetahabiente.
-System trace audit number: número de seguimiento de la transacción.
-Local transaction time: hora de la transacción en formato hhmmss.
-Local transaction date: fecha de la transacción en formato MMDD.

## Usage/Examples

Para usar esta función, es necesario tener un mensaje ISO de longitud fija que contenga la información deseada. Se puede ingresar el mensaje en el campo de texto con id mensajeIso.

-Entra a https://araxielfenix.github.io/Analizador/

Después de ingresar el mensaje, se debe llamar la función analizarIso05() para que extraiga la información del mensaje y la muestre en las variables correspondientes.

Es importante tener en cuenta que la función fue creada específicamente para extraer información de mensajes ISO de longitud fija que cumplen con ciertos requisitos, por lo que no se garantiza que funcione correctamente con otros mensajes ISO.
## Contributing

Si deseas contribuir a este proyecto, haz un fork del repositorio, crea una rama nueva, haz tus cambios y envía una pull request.

## Authors

- [@araxielfenix](https://github.com/Araxielfenix)
