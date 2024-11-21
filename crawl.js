// const {JSDOM} = require('jsdom')
// async function crawlPage(baseURL, currentURL, pages){
//     console.log(`actively crawling: ${currentURL}`)

//     const baseURLObj = new URL(baseURL)
//     const currentURLObj = new URL(currentURL)
//     if(baseURLObj.hostname !== currentURLObj.hostname){
//         return pages
//     }

//     const normalizedCurrentURL = normalizeURL(currentURL)
//     if(pages[normalizedCurrentURL]>0){
//         pages[normalizedCurrentURL]++
//         return pages
//     }

//     pages[normalizedCurrentURL] = 1

//     console.log(`actively crawling: ${currentURL}`)

//     try{
//         const resp = await fetch(currentURL)
//         if(resp.status>399){
//             console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL} `)
//             return pages
//         }

//         const contentType = resp.headers.get("content-type")
//         if(!contentType .includes("text/html")){
//             console.log(`non-html response, content type : ${contentType} on page: ${currentURL} `)
//             return pages
//         }

//         const htmlBody = await resp.text()

//         nextURLs = getURLsFromHTML(htmlBody ,baseURL)
//         for(const nextURL of nextURLs){
//             pages = await crawlPage(baseURL , nextURL ,pages)
//         }
//     }catch(err){
//         console.log(`Error in fetch: ${err.message} , on page: ${currentURL}`)
//     }
//     return pages
// }

// function getURLsFromHTML(htmlBody , baseURL){
//     const urls = []
//     const dom = new JSDOM(htmlBody)
//     const linkElements = dom.window.document.querySelectorAll('a')
//     for(const linkElement of linkElements){
//         if(linkElement.href.slice(0,1)==='/'){
//             //relative
//             try{
//                 const urlObj = new URL(`${baseURL}${linkElement.href}`)
//                 urls.push(urlObj.href)
//             }catch(err){
//                 console.log(`error with relative url: ${err.message}`)
//             }
            
//         }
//         else{
//             //absolute
//             try{
//                 const urlObj = new URL(linkElement.href)
//                 urls.push(urlObj.href)
//             }catch(err){
//                 console.log(`error with absolute url: ${err.message}`)
//             }
//             // urls.push(linkElement.href)
//         }
        
//     }
//     return urls
// }

// function normalizeURL(urlString){
//     const urlObj = new URL(urlString)
//     const hostPath= `${urlObj.hostname}${urlObj.pathname}`
//     if(hostPath.length>0 && hostPath.slice(-1)==='/') {
//         return hostPath.slice(0,-1)
//     }
//     return hostPath
// }

// module.exports ={
//     normalizeURL,
//     getURLsFromHTML,
//     crawlPage
// }

const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages) {
    console.log(`Actively crawling: ${currentURL}`);

    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399) {
            console.log(`Error fetching ${currentURL}, status code: ${resp.status}`);
            return pages;
        }

        const contentType = resp.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`Non-HTML response: ${contentType} on ${currentURL}`);
            return pages;
        }

        const htmlBody = await resp.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }
    } catch (err) {
        console.log(`Error fetching: ${err.message}, on ${currentURL}`);
    }

    return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    
    linkElements.forEach((linkElement) => {
        const href = linkElement.href;
        if (href.slice(0, 1) === '/') {
            // Relative URL
            try {
                const urlObj = new URL(`${baseURL}${href}`);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`Error with relative URL: ${err.message}`);
            }
        } else {
            // Absolute URL
            try {
                const urlObj = new URL(href);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`Error with absolute URL: ${err.message}`);
            }
        }
    });

    return urls;
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    return hostPath.endsWith('/') ? hostPath.slice(0, -1) : hostPath;
}

function generateSummary(pages) {
    const totalPages = Object.keys(pages).length;
    const mostLinkedPage = Object.entries(pages).reduce((max, entry) => (entry[1] > max[1] ? entry : max), ['', 0]);
    
    return {
        totalPages,
        mostLinkedPage: mostLinkedPage[0],
        mostLinkedPageHits: mostLinkedPage[1],
    };
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
    generateSummary
};
