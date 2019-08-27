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
                        items.forEach((entry) => {
                            switch (entry.text.toLowerCase()) {
                                case 'template':
                                    cliGenerator.templateGenerate();
                                    break;
                                case 'styles':
                                    cliGenerator.styleGenerate();
                                    break;
                                case 'js functionality':
                                    cliGenerator.jsGenerate();
                                    break;
                            }
                        });
                    })
                } else {
                    cliGenerator.allFilesHeandler();
                }
            });
        } else {
            console.log('t');
            process.exit(0);
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
