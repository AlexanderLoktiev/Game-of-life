import Select from 'select-shell';
import CliGenerator from './cli-handler';

let params = {
    pointer: ' ▸ ',
    pointerColor: 'yellow',
    checked: ' ◉  ',
    unchecked:' ◎  ',
    checkedColor: 'blue',
    msgCancel: 'No selected options!',
    msgCancelColor: 'orange',
    multiSelect: false,
    inverse: true,
    prepend: true,
    disableInput: true
};

const cancelHandler = (options) => {
    console.log('Cancel list, '+ options.length +' options selected');
    process.exit(0);
};

const cliGenerator = new CliGenerator();

class Cli{
    constructor() {

    }

    generateSubOptions(options) {

        const list = Select(params);

        options.forEach((entry) => {
            list.option(entry);
        });

        list.list();

        list.on('select', function(options) {
            if (options[0].text.toLowerCase() === 'component') {

                const componentList = Select(params);

                componentList.option('All files')
                    .option('Partial')
                    .list();

                componentList.on('cancel', cancelHandler);

                componentList.on('select', function(options) {
                    if (options[0].text.toLowerCase() === 'partial') {
                        params.multiSelect = true;
                        const partialComponentList = Select(params);

                        partialComponentList.option('Template')
                            .option('Styles')
                            .option('Js functionality')
                            .list();

                        partialComponentList.on('select', function(all) {

                            console.log(all);
                            // switch (options) {
                            //     case options[0].text.toLowerCase() === 'template' :
                            //         cliGenerator.templateGenerate();
                            //         break;
                            //     case options[0].text.toLowerCase() === 'styles' :
                            //         cliGenerator.styleGenerate();
                            //         break;
                            //     case options[0].text.toLowerCase() === 'js functionality' :
                            //         cliGenerator.jsGenerate();
                            //         break;
                            // }
                        });
                    }
                });
            } else {
                console.log('t');
                process.exit(0);
            }
        });

        list.on('cancel', cancelHandler);
    }

    init() {
        this.generateSubOptions(['Component', 'Page']);
    }
}

const cli = new Cli();
cli.init();
