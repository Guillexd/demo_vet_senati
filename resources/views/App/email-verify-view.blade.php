<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verificación de Correo Electrónico</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }

        table {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            border-collapse: collapse;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }

        tr {
            padding: 20px;
        }

        td {
            text-align: center;
        }

        h1 {
            color: #333;
        }

        p {
            color: #666;
        }

        .verification-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #2D3748;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
        }

        .alert {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <td>
                <img src="https://i.ibb.co/K5tq7C8/cetpro.jpg" alt="CETPRO Salesiano">
                <h1>{{ __('dictionary.verify_password') }}</h1>
                <p>
                    {{ __('dictionary.verify_greeting') }}
                </p>
                <a href="{{ $url }}" class="verification-button">{{ __('dictionary.verify_email') }}</a>
                <p class="alert">
                    <strong>¡{{ __('dictionary.important') }}!</strong> {{ __('dictionary.alert_verify') }}
                </p>
            </td>
        </tr>
    </table>
</body>
</html>