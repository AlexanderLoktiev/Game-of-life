import path from "path";
import fs from "fs";
import prompts from "prompts";

export default class CliGenerator {
   allFilesHeandler() {

    };

    templateGenerate(filepath = path.resolve(__dirname, '.src/components')) {
        console.log('template');

        // const fileContent = "Hello World!";

        // (async () => {
        //     const response = await prompts({
        //         type: 'string',
        //         name: 'value',
        //         message: 'Input template`s name'
        //     });
        //
        //     console.log(response);
        // })();

        // fs.writeFile(filepath, fileContent, (err) => {
        //     if (err) throw err;
        //
        //     console.log("The file was succesfully saved!");
        // });
    };

    styleGenerate() {

    };

    jsGenerate() {

    };
}


