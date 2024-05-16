const express = require('express');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon'); 
const app = express();
const fs = require('fs');
const { spawn } = require('child_process');

app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/asu.ico'));

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('GET request received at /');
    res.render('index');
});


app.post('/', async (req, res) => {
    console.log('POST request received at /');
    const classNumber = req.body.classNumber;
    const classSearch = req.body.classSearch;
    console.log('Class number:', classNumber);
    console.log('Duo Push:', classSearch);
    try {
        const result = await scrapeData(classNumber);
        const result2 = await scrapeDataClassSeach(classSearch);
        console.log('Open seats:', result);
        if (result === 0) {
            recheckUrl(classNumber);
            res.json({ openSeats: 'Checking availability...' });
        } else {
            saveClassNumber(classNumber);
            res.json({ openSeats: result });
            const process = spawn('autologin\\autoopener.exe');
            process.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            process.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
            process.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
            console.log('Autoopener executed');
            console.log('Class successfully Enrolled');
            };


        } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while scraping data' });
    }
});

async function scrapeDataClassSeach(classSearch) { //being reworked for duo push
        if (!classSearch) {
            console.error('Class search is missing');
        } else{
            saveDuoPush(classSearch);
        }
}

async function scrapeData(classNumber) {
    if (!classNumber) {
        console.error('Class number is required');
    } else{
        try {
            console.log('Scraping data for class number:', classNumber);
            const url = `https://catalog.apps.asu.edu/catalog/classes/classlist?advanced=true&campusOrOnlineSelection=C&classNbr=${classNumber}&honors=F&promod=F&searchType=all&term=2247`;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });
            const html = await page.content();
            const $ = cheerio.load(html);
            const openSeatsElement = $('.class-results-cell.seats .text-nowrap');
            const openSeatsText = openSeatsElement.text();
            const openSeats = parseInt(openSeatsText.split(' ')[0]);
            await browser.close();
            return openSeats;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
}}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


let recheckCount = 0;

async function recheckUrl(classNumber) {
    try {
        const result = await scrapeData(classNumber);
        if (result === 0) {
            recheckCount++; //comment this out if u wanna keep on rechecking add // infront of recheckCount++
            if (recheckCount < 1000) { //2 days worth of rechecking as long as the server is running
            setTimeout(() => {
                recheckUrl(classNumber);
            }, 600000); // 10 minutes wait time
            } else {
            console.log('Maximum recheck count reached');
            }
        }
        else {
            recheckCount = 0;
            saveClassNumber(classNumber);
            const process = spawn('autologin\\autoopener.exe');
            process.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            process.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
            process.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
            console.log('Autoopener executed');
            console.log('Class successfully Enrolled');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function saveClassNumber(classNumber) {
    try {
        fs.writeFileSync('file.txt', classNumber);
        console.log('Class number saved:', classNumber);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function saveDuoPush(classSearch) {
    try {
        fs.writeFileSync('duopush.txt', classSearch);
        console.log('Duo Push OTP saved:', classSearch);
    } catch (error) {
        console.error('Error:', error);
    }
}
