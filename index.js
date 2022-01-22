const fs = require('fs');
const csv = require('csv-parser');

const canada_data = [];
const usa_data = [];

// delete canada.txt and usa.txt if they already exist
if (fs.existsSync('./canada.txt')) {
    fs.unlink('canada.txt', (err) => {
        if (err) {
            console.log(err);
        }
    });
};
if (fs.existsSync('./usa.txt')) {
    fs.unlink('usa.txt', (err) => {
        if (err) {
            console.log(err);
        }
    });
};

// write data from Canada and USA to text files
fs.createReadStream('input_countries.csv').pipe(csv())
.on('data', (data) => {
    if (data.country === 'Canada') {
        canada_data.push(data);
    };

    if (data.country === 'United States') {
        usa_data.push(data);
    };
})
.on('end', () => {
    let canadaStr = canada_data.map(row => {
        return `Country: ${row['country']}, Year: ${row['year']}, Population: ${row['population']}`;
    });

    let usaStr = usa_data.map(row => {
        return `Country: ${row['country']}, Year: ${row['year']}, Population: ${row['population']}`;
    });

    fs.writeFile('canada.txt', canadaStr.join("\n"), (err) => {
        if(err) {
            console.log(err);
        }
    });
    fs.writeFile('usa.txt', usaStr.join("\n"), (err) => {
        if(err) {
            console.log(err);
        };
    });    
})