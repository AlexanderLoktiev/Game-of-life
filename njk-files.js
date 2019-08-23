import path from "path";
import fs from "fs";
import NunjucksWebpackPlugin from 'nunjucks-webpack-plugin';

export default class NjkAllFiles {
    constructor() {
        this.njkTemplates = [];
        this.beforeInit();
    }

    beforeInit() {
        const files = fs.readdirSync(path.resolve(__dirname, "src/pages"));

        files.forEach((file) => {
            if (path.extname(file) === '.njk') {
               this.njkTemplates.push({
                    from: `./src/pages/${file}`,
                    to: `pages/${path.basename(file, '.njk')}.html`
                });
            }
        });
    };

    init() {
        return new NunjucksWebpackPlugin({
            templates: this.njkTemplates
        })
    }
}
