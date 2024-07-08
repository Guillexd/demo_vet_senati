<?php

namespace App\Imports;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProductsImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        unset($rows[0]);
        foreach ($rows as $row)
        {
            Product::create([
                'name' => $row[0],
                'stock' => $row[1],
                'price' => $row[2],
                'purchase_price' => $row[3],
                'utility' => (float) $row[2] - (float) $row[3],
                'due_date' => $row[4] ? Carbon::createFromFormat('d/m/Y H:i:s', $row[4])->format('Y-m-d H:i:s') : null,
                'serie' => $row[5],
                'description' => $row[6],
            ]);
        }
    }
}
