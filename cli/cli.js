import Select from 'select-shell';
import CliGenerator from './cli-handler';

let params = {
    pointer: ' ▸ ',
    pointerColor: 'yellow',
    checked: ' ◉  ',
    unchecked: ' ◎  ',
    checkedColor: 'blue',
    msgCancel: 'No selected options!',
    msgCancelColor: 'orange',
    multiSelect: false,
    inverse: true,
    prepend: true,
    disableInput: true
};

const cancelHandler = (options) => {
    console.log('Cancel list, ' + options.length + ' options selected');
    process.exit(0);
};

const cliGenerator = new CliGenerator();

class Cli {
    constructor() {}

    generateSubOptions(options, handler = (items) => {
        if (items[0].text.toLowerCase() === 'component') {
            this.generateSubOptions(['All files', 'Partial'], (items) => {
                if (items[0].text.toLowerCase() === 'partial') {
                    params.multiSelect = true;
                    this.generateSubOptions(['Template', 'Styles', 'Js functionality'], (items) => {
                       const extStream = new Promise((resolve, reject) => {
                           let exts = [];

                           items.forEach((entry) => {
                               entry.text.toLowerCase() === 'template' ? exts.push('njk') :
                                   entry.text.toLowerCase() === 'styles' ? exts.push('scss') :
                                       exts.push('ts');
                           });
                           resolve(exts);
                       });

                        extStream.then(exts => {
                            cliGenerator.filesGenerate(exts);
                        });
                    })
                } else {
                    cliGenerator.filesGenerate(['njk', 'scss', 'ts']);
                }
            });
        } else {
            cliGenerator.filesGenerate(['njk'], 'page');
        }
    }) {
        const list = Select(params);

        options.forEach((entry) => {
            list.option(entry);
        });

        list.list();

        list.on('select', (items) => {
            handler(items);
        });

        list.on('cancel', cancelHandler);
    }

    init() {
        this.generateSubOptions(['Component', 'Page']);
    }
}

const cli = new Cli();
cli.init();
