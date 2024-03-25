const express = require('express');
const app = express();
const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');
const csv = require('csv-parser');

app.use(cors());
app.use(express.json());

// DUMMY DATA
// const data = {   
//     name: 'John Doe',
//     age: 30,
//     email: 'john@example.com'
// };
// app.get('/',(req,res)=>{
//     const results = [];

//     // Read the CSV file using fs.createReadStream
//     fs.createReadStream('./data.csv')
//       .pipe(csv())
//       .on('data', (data) => results.push(data))
//       .on('end', () => {
//         console.log(results);
//         res.json(results); // Send the parsed CSV data as JSON response
//       })
//       .on('error', (error) => {
//         console.error('Error reading CSV file:', error);
//         res.status(500).send('Error reading CSV file');
//       });
// });


app.post('/', (req, res) => {
    // Extract data from request body
    const { data } = req.body;

    // Sanitize data by replacing newline characters with spaces
    const sanitizedData = {
        index: 1, // assuming you have an index column
        data: data.replace(/\n/g, ' ')
    };

    // Define CSV header
    const csvHeader = [{ id: 'index', title: 'Index' }, { id: 'data', title: 'Data' }];

    // Create CSV writer instance
    const csvWriterInstance = csvWriter({
        path: './data.csv',
        header: csvHeader
    });

    // Write data to CSV file
    csvWriterInstance.writeRecords([sanitizedData])
        .then(() => {
            console.log('Data written to CSV file successfully.');
            res.sendStatus(200);
        })
        .catch(err => {
            console.error('Error writing to CSV file:', err);
            res.status(500).send('Error writing to CSV file');
        });
});

// Start the server
const PORT =4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

