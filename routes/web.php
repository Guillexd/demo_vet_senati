<?php

use Illuminate\Support\Facades\Route;
use App\Providers\RouteServiceProvider;
use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmailVerificationPromptController;
use App\Http\Controllers\EmailVerificationNotificationController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\GraphicController;
use App\Http\Controllers\IdentityDocumentController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\VerifyEmailController;
use App\Http\Controllers\PasswordResetLinkController;
use App\Http\Controllers\NewPasswordController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\PetHistoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureCashRegisterIsOpen;
use App\Http\Middleware\EnsureJustOneCashRegisterIsOpen;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::redirect('/', RouteServiceProvider::HOME);

Route::middleware('guest')->group(function () {
    Route::get('/login', fn () => view('Guest.welcome'))->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('throttle:6,1');;
    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email')->middleware('throttle:6,1');;
    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.update')->middleware('throttle:6,1');;
});

Route::get('/email/verify', EmailVerificationPromptController::class)->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verification-notification', EmailVerificationNotificationController::class)->middleware(['auth', 'throttle:6,1'])->name('verification.send');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth')->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', fn () => view('App.home'));

    Route::view('/usuarios', 'App.User.index')->middleware(['can:admin']);
    Route::middleware(['can:admin'])->prefix('users')->group(function () {
        Route::get('/list', [UserController::class, 'list']);
        Route::post('/store', [UserController::class, 'store']);
        Route::put('/update', [UserController::class, 'update']);
        Route::delete('/destroy', [UserController::class, 'destroy']);
    });

    Route::view('/clientes', 'App.Customer.index');
    Route::prefix('customers')->group(function () {
        Route::get('/list', [CustomerController::class, 'list']);
        Route::post('/store', [CustomerController::class, 'store']);
        Route::put('/update', [CustomerController::class, 'update']);
        Route::delete('/destroy', [CustomerController::class, 'destroy'])->middleware(['can:admin']);
    });

    Route::view('/mascotas', 'App.Pet.index');
    Route::prefix('pets')->group(function () {
        Route::get('/list', [PetController::class, 'list']);
        Route::post('/store', [PetController::class, 'store']);
        Route::post('/update', [PetController::class, 'update']);
        Route::delete('/destroy', [PetController::class, 'destroy'])->middleware(['can:admin']);
    });

    Route::view('/servicios', 'App.Service.index');
    Route::prefix('services')->group(function () {
        Route::get('/list', [ServiceController::class, 'list']);
        Route::post('/store', [ServiceController::class, 'store']);
        Route::put('/update', [ServiceController::class, 'update']);
        Route::delete('/destroy', [ServiceController::class, 'destroy'])->middleware(['can:admin']);
    });

    Route::view('/razas', 'App.Breed.index');
    Route::prefix('breeds')->group(function () {
        Route::get('/list', [BreedController::class, 'list']);
        Route::post('/store', [BreedController::class, 'store']);
        Route::put('/update', [BreedController::class, 'update']);
        Route::delete('/destroy', [BreedController::class, 'destroy'])->middleware(['can:admin']);
    });

    Route::view('/historial-de-mascotas', 'App.PetHistory.index');
    Route::prefix('pet_histories')->group(function () {
        Route::get('/list', [PetHistoryController::class, 'list']);
        Route::post('/store', [PetHistoryController::class, 'store']);
        Route::post('/update', [PetHistoryController::class, 'update']);
        Route::delete('/destroy', [PetHistoryController::class, 'destroy'])->middleware(['can:admin']);
        Route::get('/get_next_date', [PetHistoryController::class, 'getNextDate']);
        Route::get('/get_plan_pdf', [PetHistoryController::class, 'getPlanPdf']);
    });

    Route::view('/inventario', 'App.Product.index');
    Route::prefix('products')->group(function () {
        Route::get('/list', [ProductController::class, 'list']);
        Route::post('/store', [ProductController::class, 'store'])->middleware(['can:admin']);
        Route::post('/update', [ProductController::class, 'update'])->middleware(['can:admin']);
        Route::delete('/destroy', [ProductController::class, 'destroy'])->middleware(['can:admin']);
        Route::get('/by_due_date', [ProductController::class, 'getProductsByDueDate']);
    });

    Route::view('/razones-de-egreso', 'App.Expense.index');
    Route::prefix('expenses')->group(function () {
        Route::get('/list', [ExpenseController::class, 'list']);
        Route::post('/store', [ExpenseController::class, 'store']);
        Route::put('/update', [ExpenseController::class, 'update']);
        Route::delete('/destroy', [ExpenseController::class, 'destroy'])->middleware(['can:admin']);
    });

    Route::view('/cajas', 'App.CashRegister.index');
    Route::prefix('cash_registers')->group(function () {
        Route::get('/list', [CashRegisterController::class, 'list']);
        Route::get('/get_products/{cash_register}', [CashRegisterController::class, 'getProducts']);
        Route::get('/get_services/{cash_register}', [CashRegisterController::class, 'getServices']);
        Route::get('/get_expenses/{cash_register}', [CashRegisterController::class, 'getExpenses']);
        Route::get('/get_all_vouchers', [CashRegisterController::class, 'getAllVouchers']);
        Route::get('/get_voucher/{cash_register}', [CashRegisterController::class, 'getVoucher']);
        Route::post('/store', [CashRegisterController::class, 'storeInitialCashRegister'])->middleware(['can:admin', EnsureJustOneCashRegisterIsOpen::class]);
        Route::post('/store_movements', [CashRegisterController::class, 'storeMovements'])
            ->middleware(EnsureCashRegisterIsOpen::class);
        Route::put('/update', [CashRegisterController::class, 'update'])
            ->middleware(['can:admin', EnsureJustOneCashRegisterIsOpen::class]);
        Route::put('/update_state', [CashRegisterController::class, 'updateState']);
        Route::delete('/destroy', [CashRegisterController::class, 'destroy'])
            ->middleware(['can:admin', EnsureCashRegisterIsOpen::class]);
        Route::delete('/destroy_movement', [CashRegisterController::class, 'destroyMovement'])
            ->middleware(['can:admin', EnsureCashRegisterIsOpen::class]);
        Route::delete('/destroy_voucher', [CashRegisterController::class, 'destroyVoucher'])
            ->middleware(['can:admin', EnsureCashRegisterIsOpen::class]);
        Route::get('/get_voucher_id', [CashRegisterController::class, 'getVoucherId']);
        Route::get('/get_voucher_pdf/{cash_register}', [CashRegisterController::class, 'pdfVoucher']);
        Route::get('/get_excel_by_cash_register', [CashRegisterController::class, 'excelProducts'])->middleware(['can:admin']);
        Route::get('/get_excel_by_month', [CashRegisterController::class, 'excelByMonth'])->middleware(['can:admin']);
    });

    Route::view('/graficos', 'App.Graphics.index')->middleware(['can:admin']);
    Route::prefix('graphics')->middleware(['can:admin'])->group(function(){
        Route::get('/list',[GraphicController::class, 'list']);
        Route::get('/get_excel_products_by_month',[GraphicController::class, 'excelProductsByMonth']);
    });

    Route::prefix('identity-documents')->group(function () {
        Route::get('/list', [IdentityDocumentController::class, 'list']);
    });

    Route::prefix('inquiry')->group(function () {
        Route::get('/ruc', [InquiryController::class, 'getRUC']);
        Route::get('/dni', [InquiryController::class, 'getDNI']);
    });
});
