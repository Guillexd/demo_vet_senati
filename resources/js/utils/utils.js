import Swal from "sweetalert2";

export const fetchData = (url) => {
    return axios({
        method: "GET",
        url,
    })
        .then((response) => response.data)
        .catch((error) => error.response.data);
};

export const fetchHelper = (method, url, body, file = false) => {
    const options = {
        method: method,
        url,
        data: body,
    };
    if (!!file) {
        options.headers = {
            "Content-Type": "multipart/form-data",
        };
    }
    return axios(options)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getPageQuery = (queryString) => {
    const url = new URL(queryString);
    return url.searchParams.get("page");
};

export const showSWToDelete = (
    title,
    onConfirm,
    message = null,
    messageBtn = null
) => {
    Swal.fire({
        title: title,
        text: message || "¡No serás capaz de revertir este proceso!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Sí, ${messageBtn || "¡bórralo!"}`,
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
};

const timesUnit = [
    { limit: 60, unit: "second", divider: 1 },
    { limit: 3600, unit: "minute", divider: 60 },
    { limit: 86400, unit: "hour", divider: 3600 },
    { limit: 604800, unit: "day", divider: 86400 },
    { limit: 2419200, unit: "week", divider: 604800 },
    { limit: 29030400, unit: "month", divider: 2419200 },
];

function formatTime(value, unit) {
    const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
    return rtf.format(-value, unit);
}

export const dateCalculator = (date) => {

    const ISOdate = new Date(date);
    const currentDate = new Date();
    const ISOdateTest = new Date(date);
    const currentDateTest = new Date();

    ISOdateTest.setHours(0, 0, 0, 0);
    currentDateTest.setHours(0, 0, 0, 0);

    let miliSecondsDifference = currentDateTest - ISOdateTest;
    const diasPasados = Math.floor(miliSecondsDifference / (1000 * 60 * 60 * 24));

    if (!(diasPasados >= 2)) {
        miliSecondsDifference = currentDate - ISOdate;
    }

    const seconds = Math.floor(miliSecondsDifference / 1000);

    let value;

    for (const timeUnit of timesUnit) {
        if (seconds < timeUnit.limit) {
            const date =
                timeUnit.limit / timeUnit.divider -
                (timeUnit.limit - seconds) / timeUnit.divider;
            // console.log(formatTime(Math.trunc(date), timeUnit.unit))
            value = formatTime(Math.trunc(date), timeUnit.unit);
            break;
        }
    }

    return value;
};

export const getLocaleDate = (date) => {
    const newDate = new Date(date).toLocaleDateString().toString();
    return newDate;
};

export const getLocaleString = (date) => {
    const newDate = new Date(date).toLocaleString().toString();
    return newDate;
};

export const getStringDate = (date) => {
    const newDate = new Date(date);
    const fechaString = newDate.toLocaleDateString("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return fechaString;
};

export const getStringTime = (date) => {
    const newDate = new Date(date);
    const fechaString = newDate.toLocaleDateString("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    return fechaString;
};

export const formatId = (code, value) => {
    return code + value.toString().padStart(7, "0");
};

export const setLocalTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getDateNow= () => {
    const date = new Date();

    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
};

export const getTwoWeekLater = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14); // Agregar 2 semanas (14 días)

    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
};

export const showNotification = (title, footer, confirmText = '¡Lo revisaré!', icon = "warning", timer = 10000) => {
    Swal.fire({
        position: "bottom-start",
        icon,
        title,
        footer,
        toast: true,
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: confirmText,
        buttonsStyling: false,
        customClass: {
            confirmButton: 'bg-indigo-500 text-white font-bold mx-auto py-1 w-full rounded-lg',
        }
    });
};
