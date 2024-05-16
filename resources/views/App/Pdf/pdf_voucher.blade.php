<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprobante de Pago</title>
    <style>
        *,
        :root {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 30px;
        }

        .container {
            width: 100%;
            height: 150px;
        }

        .column {
            width: 50%;
            height: 100%;
            float: left;
        }

        .column__section {
            height: 50%;
            position: relative;
        }

        .logo {
            transform: translateX(10%);
        }

        .enterprice {
            font-family: cursive;
            font-size: 28px;
            font-weight: 900;
        }

        .enterprice__info {
            border: 1px solid black;
            border-radius: 5%;
            padding: 0 10px;
            font-size: 10px;
        }

        .enterprice__info__title {
            text-align: center;
            margin: 5px 0;
            font-size: 14px;
        }

        .voucher__container {
            border: 1px solid black;
            height: 100%;
            margin: 0 0 0 50px;
            border-radius: 5%;
            text-align: center;
        }

        .voucher__container__table {
            width: 100%;
            height: 100%;
            border-collapse: collapse;
            text-align: center;
        }

        .table_column {
            padding: 15px;
        }

        .customer {
            width: 100%;
            border: 1px solid black;
            margin-top: 10px;
            position: relative;
            font-size: 10px;
            border-radius: 2%;
        }

        .customer_column {
            width: 50%;
            float: left;
            padding: 10px;
        }

        .voucher__details {
            width: 100%;
            margin-top: 10px;
            border: 1px solid black;
            border-radius: 2%;
            font-size: 10px;
        }

        .voucher__details table {
            width: 100%;
            border-collapse: collapse;
        }

        .voucher__details th,
        .voucher__details td {
            border-bottom: 1px solid black;
            padding: 5px;
            text-align: center;
            max-width: 200px;
        }

        .voucher__details table tr:last-child td {
            border-bottom: none;
        }

        .voucher__main {
            width: 100%;
            font-size: 10px;
            margin-top: 15px;
        }

        .voucher__main section {
            width: 50%;
            float: left;
        }

        .voucher__main table {
            margin-left: 10px;
            border-collapse: collapse;
        }

        .voucher__main section:first-child table tr td {
            border-bottom: 1px solid black;
            padding: 5px;
        }

        .operations {
            margin-left: 40%;
        }

        .operations td {
            padding: 5px;
            text-align: right;
        }

        .operations table tr td:last-child {
            border-bottom: 1px solid black;
            min-width: 100px;
        }

    </style>
</head>

<body>
    <div class="container">
        <div class="column">
            <section class="column__section logo">
                <img src="https://res.cloudinary.com/dfpspbjlq/image/upload/v1711808737/ReyCan/v7kcbxlifwhw57h7m3f3.png" alt="xd" height="50px"
                    style="transform: translate(10%, 25%);">
                <span class="enterprice">Scriptify perú</span>
            </section>
        </div>
        <div class="column">
            <section class="voucher__container">
                <table class="voucher__container__table">
                    <tr>
                        <td class="table_column">
                            <h2 style="text-transform: uppercase; padding: 0 20px;">{{ $voucher_name }}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_column">
                            <p style="font-size: 1.5rem;">{{ $code }}</p>
                        </td>
                    </tr>
                </table>
            </section>
        </div>
        <div style="clear: both;"></div>
    </div>

    <div class="customer">
        <section class="customer_column">
            <p>
                <strong>Razón social: </strong>
                <span>{{ $customer->name ?? "-" }}</span>
            </p>
            <p>
                <strong>Fecha de emisión: </strong>
                <span>{{ $date }}</span>
            </p>
            <p>
                <strong>Tipo de moneda: </strong>
                <span>SOLES</span>
            </p>
        </section>
        <section class="customer_column">
            <p>
                <strong>{{ $customer->identity_document?->abbreviation ?? "DNI" }}: </strong>
                <span>{{ $customer->document_number ?? "-" }}</span>
            </p>
            <p>
                <strong>Dirección: </strong>
                <span style="text-transform: uppercase;">{{ $customer->direction ?? "-" }}</span>
            </p>
        </section>
        <div style="clear: both;"></div>
    </div>

    <div class="voucher__details">
        <table>
            <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Código / Serie</th>
                    <th>Descripción</th>
                    <th>Valor unitario</th>
                    <th>Valor total</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($products_services as $ps)
                    <tr>
                        <td>{{ $ps->pivot->quantity }}</td>
                        <td>{{ $ps->serie ?? $ps->code }}</td>
                        <td>{{ $ps->name }}</td>
                        <td>S/ {{ $ps->price }}</td>
                        <td>S/ {{ $ps->pivot->subtotal }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="voucher__main">
        <section>
            <p style="text-align: center; text-transform: uppercase;">
                <strong>
                    {{ $legend }}
                </strong>
            </p>
            <table>
                <tr>
                    <td colspan="2">
                        <strong>Información adicional</strong>
                    </td>
                </tr>
                <tr>
                    <td>
                        LEYENDA:
                    </td>
                    <td>
                        <p>
                            MONTO EN LETRAS
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        FORMA DE PAGO:
                    </td>
                    <td>
                        Contado
                    </td>
                </tr>
                <tr>
                    <td>
                        VENDEDOR:
                    </td>
                    <td>
                        <p>
                            {{ $seller->name ?? "-" }}
                        </p>
                    </td>
                </tr>
            </table>
        </section>
        <section>
            <div class="operations">
                <table>
                    <tr>
                        <td>
                            <strong>Precio de venta:</strong>
                        </td>
                        <td>
                            S/ {{ number_format($total, 2) }}
                        </td>
                    </tr>
                </table>
            </div>
        </section>
        <div style="clear: both;"></div>
    </div>

</body>

</html>
