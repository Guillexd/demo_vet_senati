<?php

namespace Database\Seeders;

use App\Models\IdentityDocument;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IdentityDocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        IdentityDocument::create([
            'code' => '1',
            'abbreviation' => 'DNI',
            'description' => 'Documento Nacional de Identidad',
        ]);
        IdentityDocument::create([
            'code' => '6',
            'abbreviation' => 'RUC',
            'description' => 'Registro Unico de Contribuyentes',
        ]);
        IdentityDocument::create([
            'code' => '0',
            'abbreviation' => 'SIN-RUC',
            'description' => 'DOC.TRIB.NO.DOM.SIN.RUC',
        ]);
        IdentityDocument::create([
            'code' => '4',
            'abbreviation' => 'Carnet de extranjería',
            'description' => 'Carnet de extranjería',
        ]);
        IdentityDocument::create([
            'code' => '7',
            'abbreviation' => 'Pasaporte',
            'description' => 'Pasaporte',
        ]);
        IdentityDocument::create([
            'code' => 'A',
            'abbreviation' => 'CDI',
            'description' => 'Cédula Diplomática de identidad',
        ]);
        IdentityDocument::create([
            'code' => 'B',
            'abbreviation' => 'DIPR',
            'description' => 'DOC.IDENT.PAIS.RESIDENCIA-NO.D',
        ]);
        IdentityDocument::create([
            'code' => 'C',
            'abbreviation' => 'TIN',
            'description' => 'Tax Identification Number - TIN – Doc Trib PP.NN',
        ]);
        IdentityDocument::create([
            'code' => 'D',
            'abbreviation' => 'IN',
            'description' => 'Identification Number - IN – Doc Trib PP. JJ',
        ]);
        IdentityDocument::create([
            'code' => 'E',
            'abbreviation' => 'TAM',
            'description' => 'TAM- Tarjeta Andina de Migración',
        ]);
        IdentityDocument::create([
            'code' => 'F',
            'abbreviation' => 'PTP',
            'description' => 'Permiso Temporal de Permanencia - PTP',
        ]);
        IdentityDocument::create([
            'code' => 'G',
            'abbreviation' => 'Salvoconducto',
            'description' => 'Salvoconducto',
        ]);
        IdentityDocument::create([
            'code' => 'H',
            'abbreviation' => 'CPP',
            'description' => 'Carné Permiso Temp.Perman. - CPP',
        ]);
    }
}
