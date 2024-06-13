const path = require("path");

class FileUpload {
    static KB = 1024;
    static MB = 1024 * 1024;
    fileErrors = {};

    constructor(file, validType, validSize) {
        this.file = file;
        this.validType = validType;
        this.validSize = validSize;
        this.size = file.size;
        this.type = file.mimetype;
        this.ext = path.extname(file.name).toLowerCase();
        this.validate();
    }

    validate = () => {
        if (!this.validType.includes(this.ext)) {
            this.fileErrors.fileType = `File type is not valid, valid file type is ${this.validType.join(", ")}`;
        }
        if (this.validSize < this.size) {
            this.fileErrors.size = `File is to large`;
        }
    };

    isValid = () => Object.keys(this.fileErrors).length === 0;

    save = async () => {
        this.storeName = new Date().getTime().toString() + this.ext;
        try {
            let resultSave = await this.file.mv(__dirname + "/../public/upload/" + this.storeName);
            return resultSave;
        } catch (error) {
            return new Error(error.message);
        }
    };

    showErrors = () => {

    };

}

module.exports = FileUpload;