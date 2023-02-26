


const userCreate = (req, res) => {
    res
        .status(200)
        .json({
            "status": "created successfully"
        });
}

const userList = (req, res) => {
    res
        .status(200)
        .json({
            "status": "listed successfully"
        });
}

const userRead = (req, res) => {
    res
        .status(200)
        .json({
            "status": "read action successfully"
        });
}

const userUpdate = (req, res) => {
    res
        .status(200)
        .json({
            "status": "Update action successfully"
        });
}

const userDelete = (req, res) => {
    res
        .status(200)
        .json({
            "status": "Delete action successfully"
        });
}

module.exports = {
    userCreate, 
    userList,
    userRead,
    userUpdate,
    userDelete
}