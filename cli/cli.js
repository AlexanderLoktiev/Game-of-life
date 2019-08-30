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

const cliGenerator = new CliGenerator();

class Cli {
    constructor(options = null) {
        this.options = {
            autoInit: true,
            items: [
                {
                    name: 'Component',
                    ext: null,
                    subCategories: [
                        {
                            name: 'All files',
                            ext: ['njk', 'scss', 'ts']
                        },
                        {
                            name: 'Partial',
                            ext: null,
                            subCategories: [
                                {
                                    name: 'Template',
                                    ext: ['njk']
                                },
                                {
                                    name: 'Styles',
                                    ext: ['scss']
                                },
                                {
                                    name: 'Js functionality',
                                    ext: ['ts']
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Page',
                    ext: ['njk'],
                }
            ]
        };

        if (options instanceof Object) {
           Object.assign(this.options, options);
        }

        this.checkBeforeInit();
    }

    checkBeforeInit() {
        if (this.options.autoInit) {
            this.init();
        }
    }

    getItemsNames () {
        let names = [];

        [...this.options.items].forEach(entry => {
            names.push(entry.name);
        });

        return names;
    }

    cancelHandler (options) {
        console.log('Cancel list, ' + options.length + ' options selected');
        process.exit(0);
    }

    generatePartialOptions(options, handler) {
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
                !exts.length ? (console.log('Chose files'), this.generatePartialOptions()) : cliGenerator.filesGenerate(exts);
            });
        })
    }

    generateSubOptions(options, handler = (items) => {
        if (items[0].text.toLowerCase() === 'component') {
            this.generateSubOptions(['All files', 'Partial'], (items) => {
                switch (items[0].text.toLowerCase()) {
                    case 'partial':
                        this.generatePartialOptions();
                        break;
                    default:
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

        list.on('cancel', this.cancelHandler);
    }

    init() {
        this.generateSubOptions(['Component', 'Page']);
    }
}

const cli = new Cli();
