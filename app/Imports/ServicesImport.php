<?php

namespace App\Imports;

use App\Models\Service;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ServicesImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        unset($rows[0]);
        foreach ($rows as $row)
        {
            Service::create([
                'name' => $row[0],
                'price' => $row[1],
            ]);
        }
    }
}
