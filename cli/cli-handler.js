import path from "path";
import fs from "fs";
import readline from "readline";

export default class CliGenerator {
   allFilesHeandler() {
        this.jsGenerate();
        this.templateGenerate();
        this.styleGenerate();
    };

    templateGenerate(filepath = path.resolve(__dirname, '.src/components')) {
        console.log('template');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter componet`s name: ', (name) => {
            const fileContent = "Hello World!";
                if (!fs.existsSync(name)){
                    fs.mkdir(path.resolve(__dirname, `../src/components/${name}/`), null, () => {
                        fs.writeFile(path.resolve(__dirname, `../src/components/${name}/${name}.njk`), fileContent, (err) => {
                            if (err) throw err;

                            console.log("The file was succesfully saved!");
                        });
                        rl.close();
                    });
                } else {
                    console.error('Already exist');
                }
        });
    };

    styleGenerate() {
        console.log('style');
    };

    jsGenerate() {
        console.log('js');
    };
}


