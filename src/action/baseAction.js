export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function handleDefault(json, success, fail) {
    if (json.hasOwnProperty('s') && json['s'] === 1) {
        success(json['d']);
    } else {
        let message = json.hasOwnProperty('m') ? json['m'] : '系统异常';
        fail(Error(message));
    }
}
