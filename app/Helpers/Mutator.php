<?php

namespace App\Helpers;

class Mutator
{
    public static function toLegend($decimal): string
    {
        $entero = floor($decimal);
        $decimalSeparado = round($decimal - $entero, 2) * 100;
        $fmt = new \NumberFormatter('es', \NumberFormatter::SPELLOUT);
        return strtoupper($fmt->format($entero)) . " CON $decimalSeparado /100 SOLES";
    }
}
