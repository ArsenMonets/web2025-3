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

try {
    const data = fs.readFileSync(options.input, 'utf8');
    
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      console.error('Invalid JSON format');
      process.exit(1);
    }
  
    if (!Array.isArray(parsedData)) {
      console.warn("Data is not an array");
      parsedData = [parsedData]; 
    }
  
    const requiredCategories = {
      "Доходи, усього": null,
      "Витрати, усього": null
    };
  
    parsedData.forEach(item => {
      if (item.hasOwnProperty('txt') && item.hasOwnProperty('value')) {
        if (requiredCategories.hasOwnProperty(item.txt)) {
          requiredCategories[item.txt] = item.value;
        }
      } else {
        console.warn('Invalid item structure, missing "txt" or/and "value"');
      }
    });
  
    let result = ""; 
    Object.keys(requiredCategories).forEach(category => {
      if (requiredCategories[category] !== null) {
        result += `${category}: ${requiredCategories[category]}\n`;
      }        
    });
  
    if (options.display) {
      console.log(result);
    }
  
    if (options.output) {
      fs.writeFileSync(options.output, result);
      console.log(`Output written to ${options.output}`);
    }
  } catch (err) {
    console.error('Error reading or processing the file:', err);
    process.exit(1);
  }