import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    } else if(!options.url.includes("auth/login")) {
        window.location = "/";
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            }).catch(err => {
                return err;
            })
        );
};

export function login(loginForm) {
    return request({
        url: API_BASE_URL + "auth/login",
        method: 'POST',
        body: JSON.stringify(loginForm)
    });
}

export function addEmployee(employeeForm) {
    return request({
        url: API_BASE_URL + "employees",
        method: 'POST',
        body: JSON.stringify(employeeForm)
    });
}

export function updateEmployee(employeeForm) {
    return request({
        url: API_BASE_URL + "employees",
        method: 'PUT',
        body: JSON.stringify(employeeForm)
    });
}

export function getEmployeeList(optionalUrl) {
    return request({
        url: API_BASE_URL + optionalUrl,
        method: 'GET'
    });
}

export function deleteEmployee(id) {
    return request({
        url: API_BASE_URL + `employees/${id}`,
        method: 'DELETE'
    });
}


export function getEmployeeDataById(id) {
    return request({
        url: API_BASE_URL + `employees/${id}`,
        method: 'GET'
    });
}


export function searchEmployeeById(employeeId) {
    return request({
        url: API_BASE_URL + `employees/search/${employeeId}`,
        method: 'GET'
    });
}