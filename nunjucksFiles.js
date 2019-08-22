import path from 'path';
import recursive from 'recursive-readdir';

class NjkFiles {

    constructor () {
        this.njkTemplates = [];
        this.beforeInit();
    }

    beforeInit() {
        recursive(path.resolve(__dirname, "src/pages"), NjkFiles.files.bind(this));
    };

    static files(err, files) {
        files.forEach((file, index) => {
            if (path.extname(file) === '.njk') {
                this.njkTemplates.push(file);
            }

            if (files.length === index + 1) {
                this.init();
            }
        });
    }


    init() {
        console.log(this.njkTemplates);
    }
}

const njk = new NjkFiles();
