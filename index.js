const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .option('-i, --input <file>', 'path for reading (json)')
  .option('-o, --output <file>', 'path for writing')
  .option('-d, --display', 'display the result in console');

program.parse();

const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

if (options.display) {
    console.log("In part 2. Soon.....");
}
  
if (options.output) {
    console.log('In part 2. Soon.....')
    console.log(`Output written to ${options.output}`);
}
