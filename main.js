// const {crawlPage} = require('./crawl.js')
// const {printReport} = require('./report.js')
// async function main(){
//     if(process.argv.length<3){
//         console.log("No website provided")
//         process.exit(1)
//     }
//     if(process.argv.length>3){
//         console.log("too many command line args")
//         process.exit(1)
//     }
//     const baseURL = process.argv[2]

//     console.log(`Starting crawl of ${baseURL}`)
//     const pages = await crawlPage(baseURL , baseURL , {})

//     printReport(pages)

// }

// main()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { crawlPage, generateSummary } = require('./crawl.js');
const { printReport, printSummary } = require('./report.js');

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.use(bodyParser.json());

app.post('/crawl', async (req, res) => {
    const { baseURL } = req.body;
    if (!baseURL) {
        return res.status(400).json({ error: 'No baseURL provided' });
    }

    console.log(`Starting crawl of ${baseURL}`);

    try {
        const pages = await crawlPage(baseURL, baseURL, {});
        const report = printReport(pages);
        const summary = generateSummary(pages);
        const summaryReport = printSummary(summary);
        res.json({ report, summary: summaryReport });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error during crawling' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


