const sendJSONResponse = (res, status, message, data) => {
    const jsonResponse = {
        metadata: {
            status,
            message,
        },
        data,
    };

    res.status(status);
    return res.send(jsonResponse);
}

const sendBadRequest = (res, status, errMsg) => {
    return sendJSONResponse(res, status, errMsg);
}

const handle={
    sendJSONResponse:sendJSONResponse,
    sendBadRequest:sendBadRequest,
}

module.exports=handle;