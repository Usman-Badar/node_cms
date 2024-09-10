function response(req, res, code, data, title, message, ...props) {
    const json = {
        data,
        title,
        message,
        code
    }
    res.status(code).json(json);
    res.end();
}

module.exports = {
    response: (req, res, code, data, title, message, ...props) => response(req, res, code, data, title, message, ...props)
}