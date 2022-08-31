import fs from 'fs';
import readline from 'readline';

// plain .txt file reader
function convert(file) {

  return new Promise((resolve) => {
    const stream = fs.createReadStream(file);

    const reader = readline.createInterface({
        input: stream
    });

    const stack = [];

    reader.on('line', line => {
        stack.push(JSON.parse(line));
    });

    reader.on('close', () => resolve(stack));
  });
}

// write JSON string to newline of provided file
function convert_to_txt(JSONstr, file) {
  let stream = fs.createWriteStream(file, {flags:'a'})
  stream.write(JSONstr + "\n");
  stream.end();
  console.log(`${file} has been updated and saved.`);
}

export {convert, convert_to_txt}