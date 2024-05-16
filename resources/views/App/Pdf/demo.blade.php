{{-- <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Voucher</title>
    <style>

    </style>
</head>

<body>
    <h1>Voucher {{ $products_services[0]->pivot->voucher_id }}</h1>
    <h2>
        {{ $customer->name }}
        {{ $customer->dni }}
    </h2>
    @foreach ($products_services as $ps)
        <p>{{ $ps->name }}</p>
        <p>S/ {{ $ps->price }}</p>
        <p>{{ $ps->pivot->quantity }}</p>
        <p>S/ {{ $ps->pivot->subtotal }}</p>
        <p>{{ $ps->pivot->description }}</p>
        <p>{{ $ps->pivot->create_at }}</p>
    @endforeach
</body>

</html> --}}


<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Voucher</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            font-size: 5;
        }

        .container {
            margin: 0 auto;
            overflow: hidden;
        }

        h1 {
            margin-top: 0;
            text-align: center;
            letter-spacing: 2px;
            font-family: 'Poppins';
        }

        h4 {
            margin-bottom: 5px;
            text-align: center;
        }

        .custom-table {
            width: 100%;
            border-collapse: collapse;
        }

        .custom-table th,
        .custom-table td {
            padding: 1;
            border: none;
        }

        .custom-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        .custom-table tbody tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        .div-total {
            text-align: right
        }

        .voucher-text {
            font-size: 5px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Veterinaria ReyCan</h1>
        <h4>
            ReyCan S.A.C. <br>
            Av. Narnia #678 <br>
            telf: 123-123-123 <br>
        </h4>


        <span>------------------------------------------------------------------------------------------</span>
            <p>
                Cliente: {{ $customer->name ?? "-" }}
            </p>
            <p>
                DNI: {{ $customer->dni ?? "-" }}
            </p>
            <p>
                RUC: {{ $customer->ruc ?? "-" }}
            </p>
        <span>------------------------------------------------------------------------------------------</span>

        <table class="custom-table">
            <thead>
                <tr>
                    <th>Producto/Servicio</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($products_services as $ps)
                    <tr class="invoice-row">
                        <td class="invoice-label">{{ $ps->name }} </td>
                        <td class="invoice-label"> S/ {{ $ps->price }}</td>
                        <td class="invoice-label" style="text-align: center">{{ $ps->pivot->quantity }}</td>
                        <td class="invoice-label">S/ {{ $ps->pivot->subtotal }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <span>------------------------------------------------------------------------------------------</span>

        <div class="div-total">
            <strong>Total: S/ {{ $total }}</strong>
        </div>

        <span>------------------------------------------------------------------------------------------</span>
        <div class="voucher-text">
            <strong>Voucher #{{ $products_services[0]->pivot->voucher_id }}</strong>
        </div>
        <span>------------------------------------------------------------------------------------------</span>
    </div>
</body>

</html>


{{-- $pdf = Pdf::loadView('App.Pdf.pdf_voucher', $voucher)->setPaper(array(0, 0, 210, 420));

$GLOBALS['bodyHeight'] = 0;

$pdf->setCallbacks([
    'myCallbacks' => [
        'event' => 'end_frame', 'f' => function ($frame) {
            $node = $frame->get_node();
            if (strtolower($node->nodeName) === "body") {
                $padding_box = $frame->get_padding_box();
                // dd($padding_box['h']);
                $GLOBALS['bodyHeight'] += $padding_box['h'];
            }
        }
    ]
]);

$pdf->stream('invoice.pdf');
unset($pdf);

$docHeight = $GLOBALS['bodyHeight'] + 70;
$pdf = Pdf::loadView('App.Pdf.pdf_voucher', $voucher)->setPaper(array(0, 0, 210, $docHeight));
return $pdf->stream('voucher-' . $id . '.pdf'); --}}
