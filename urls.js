const fs = require('fs');
const axios = require('axios');
const url = require('url');

//parse the url create file with hostname and write data to the file
async function download(urlString) {
  const parsedUrl = url.parse(urlString);
  const hostname = parsedUrl.hostname;
  const filename = `${hostname}.txt`;

  try {
    const response = await axios.get(urlString);
    fs.writeFileSync(filename, response.data);
    console.log(`Wrote to ${filename}`);
  } catch (error) {
    console.error(`Couldn't download ${urlString}: ${error.message}`);
  }
}


//accept file and filter into list of urls to pass to download 
async function downloadUrlsFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf-8');
    const urls = data.split('\n').filter(url => url.trim());

    const promises = urls.map(urlString => download(urlString));
    await Promise.all(promises);
  } catch (error) {
    console.error(`Couldn't read file ${filename}: ${error.message}`);
    process.exit(1);
  }
}


downloadUrlsFromFile(process.argv[2]);
