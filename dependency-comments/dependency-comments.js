import path from "path";
import fs from "fs";
import appRoot from 'app-root-path';
import read from "fs-readdir-recursive";

export default class DependencyComments {
    constructor(
        options = {
            ext: 'njk'
        }
    ) {
        this.ex = options.ext;
    }

    getFilesWithDependency() {
        const files = read(path.resolve(__dirname, '../src'));
        const regex = /extends|from|import|include/gm;
        let res = [];

        files.forEach((file) => {
            if (path.extname(file) === '.njk') {
                fs.readFile(path.resolve(__dirname, '../src', file), {encoding: 'utf-8'}, (err, data) => {
                    if (!err && data.match(regex)) {
                        data.match(regex).forEach(() => {
                            const arr = regex.exec(data);
                            if (data.indexOf('\'', regex.lastIndex + 2) !== -1) {
                                console.log(data.lastIndexOf('{%', arr.index));
                                console.log(path.resolve(__dirname, '../', path.resolve(`src/${file}`)));

                                console.log(path.resolve(path.resolve(__dirname, '../', path.dirname(`src/${file}`)),
                                    data.substring(data.indexOf('\'', regex.lastIndex + 2),
                                        regex.lastIndex + 2, data.indexOf('\'', regex.lastIndex + 2) + 1)).replace(appRoot.path, ''));
                            } else if (data.indexOf('"', regex.lastIndex + 2) !== -1) {
                                console.log(data.lastIndexOf('{%', arr.index));
                                console.log(path.resolve(__dirname, '../', path.resolve(`src/${file}`)));

                                console.log(path.resolve(path.resolve(__dirname, '../', path.dirname(`src/${file}`)),
                                    data.substring(data.indexOf('"', regex.lastIndex + 2),
                                        regex.lastIndex + 2, data.indexOf('"', regex.lastIndex + 2) + 1)).replace(appRoot.path, ''));

                            }
                        });
                    }
                });
            }
        });

        return res;
    }

    init() {

    }
}

new DependencyComments().getFilesWithDependency();
