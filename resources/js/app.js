import '@/bootstrap';
import 'react-toastify/dist/ReactToastify.css';

window.addEventListener('DOMContentLoaded', () => {
    const out = new BroadcastChannel('Logout')
    function logOut() {
        out.postMessage({
            action: 'logout',
        })
    }

    document.querySelector('#logout')?.addEventListener('click', logOut)

    out.onmessage = (event) => {
        if(event.data.action === 'logout') {
            setTimeout(() => {
                window.location.reload();
            }, 500)
        }
    }

    if (!!document.getElementById('user')) {
        import('@/Components/User/UserContainer')
    }

    if (!!document.getElementById('customer')) {
        import('@/Components/Customer/CustomerContainer')
    }

    if (!!document.getElementById('pet')) {
        import('@/Components/Pet/PetContainer')
    }

    if (!!document.getElementById('service')) {
        import('@/Components/Services/ServiceContainer')
    }

    if (!!document.getElementById('breed')) {
        import('@/Components/Breed/BreedContainer')
    }

    if (!!document.getElementById('pet_history')) {
        import('@/Components/PetHistory/PetHistoryContainer')
    }

    if (!!document.getElementById('product')) {
        import('@/Components/Product/ProductContainer')
    }

    if (!!document.getElementById('expense')) {
        import('@/Components/Expense/ExpenseContainer')
    }

    if (!!document.getElementById('cash_register')) {
        import('@/Components/CashRegister/CashRegisterContainer')
    }

    if (!!document.getElementById('graphics')) {
        import('@/Components/Graphics/Graphics')
    }


})


