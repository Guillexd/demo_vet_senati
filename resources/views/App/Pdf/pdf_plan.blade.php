<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recetario Veterinario</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            color: #333;
        }

        .pet-info-container {

            margin-bottom: 20px;
        }

        .pet-info {
            float: left;
            width: 70%;
        }

        .pet-info p {
            margin: 10px 0 0 0;
            font-size: 18px;
            color: #555;
        }

        .reason {
            clear: both;
            /* margin-bottom: 20px; */
            margin-top: 100px;
        }

        .reason p {
            margin: 0;
            font-size: 18px;
            color: #555;
        }

        .plan {
            position: relative;
            font-size: 18px;
            color: #333;
            line-height: 1.5;
            white-space: pre-line;
        }

        .plan p {
            position: absolute;
            top: 0;
            font-size: 18px;
            color: #555;
        }

        .pet-image {
            float: left;
            width: 30%;
        }

        .pet-image img {
            float: right;
            object-fit: contain;
            border-radius: 10%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="text-decoration: underline;">Recetario Veterinario</h1>
        </div>
        <div class="pet-info-container">
            <div class="pet-info">
                <p> <span style="text-decoration: underline;">Nombre de la mascota:</span> {{ $pet_history->pet?->name }}</p>
                <p> <span style="text-decoration: underline;">Dueño(a):</span> {{ $pet_history->pet?->customer?->name }}</p>
            </div>
            <div class="pet-image">
                @if ($pet_history->pet && $pet_history->pet->pet_image_url)
                    <img src="{{ $pet_history->pet->pet_image_url }}" alt="{{ $pet_history->pet->name }}" width="150px"
                    height="150px">
                @endif
            </div>
        </div>
        <div class="reason">
            <p> <span style="text-decoration: underline;">Razón de la visita:</span> <br> {{ $pet_history->reason }}</p>
        </div>
        <div class="plan">
            <p> <span style="text-decoration: underline;">Plan de tratamiento:</span> </p>
            {{ $pet_history->plan }}
        </div>
    </div>
</body>
</html>
