import path from "path";
import fs from "fs";
import readline from "readline";

export default class CliGenerator {
    constructor() {}

    filesGenerate(extns, dir = 'component') {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Enter ${dir}\`s name: `, (name) => {
            if (!fs.existsSync(path.resolve(__dirname, `../src/components/`))) {
                fs.mkdir(path.resolve(__dirname, `../src/components/`), null, () => {
                    console.log(`Directory components was created`);
                });
            }

            if (extns.length === 3) {
               const dirCreatingStream =  new Promise((resolve, reject) => {
                   this.createDir(name, dir);
                   resolve();
                });

                dirCreatingStream.then(() => {
                    extns.forEach((ext) => {
                        this.createFiles(name, ext, dir)
                    });
                });
            }
            else if (!fs.existsSync(path.resolve(__dirname, `../src/${dir}s/${name}/`))) {
                    const dirCreatingStream =  new Promise((resolve, reject) => {
                        this.createDir(name, dir);
                        resolve();
                    });

                    dirCreatingStream.then(() => {
                        extns.forEach((ext) => {
                            this.createFiles(name, ext, dir)
                        });
                    });
                } else {
                    extns.forEach((ext) => {
                        this.createFiles(name, ext, dir)
                    });
                }

            rl.close();
        });
    };

    createFiles(name, ext, dir) {
        if (fs.existsSync(path.resolve(__dirname, `../src/${dir}s/${name}/${name}.${ext}`))) {
            console.error(`File ${name}.${ext} already exists`);
            process.exit();
        } else {
            const fileContent = CliGenerator.fileContent(name, ext);

            fs.writeFile(path.resolve(__dirname, `../src/${dir}s/${name}/${name}.${ext}`), fileContent, (err) => {
                if (err) throw err;

                console.log(`The file "${name}.${ext}" was succesfully saved!`);
            });
        }
    }

    createDir(name, dir) {
        if (!fs.existsSync(path.resolve(__dirname, `../src/${dir}s/${name}/`))) {
            fs.mkdir(path.resolve(__dirname, `../src/${dir}s/${name}/`), null, () => {
                console.log(`Directory ${name} was created`);
            });
        } else {
            console.error(`Directory ${name} already exists`);
            process.exit();
        }
    }

    static fileContent(name, ext) {
        let fileContent;

        switch (ext) {
            case 'njk':
                fileContent = `<section class="${name}">

</section>`;
                break;
            case 'scss':
                fileContent = `.${name} {
    $this: &;
}`;
                break;
            case 'ts':
                fileContent = `export default class ${name.charAt(0).toUpperCase() + name.slice(1)} {
    constructor() {
        this.beforeInit();   
     }
                                                    
    beforeInit() {}
                                                    
    init() {}
}`;
                break;
        }
        return fileContent;
    }
}


