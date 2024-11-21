// function printReport(pages){
//     console.log("============")
//     console.log("REPORT")
//     console.log("============")
//     const sortedPages =sortPages(pages)
//     for(const sortedPage of sortedPages){
//         const url = sortedPage[0]
//         const hits = sortedPage[1]
//         console.log(`Found ${hits} link to page : ${url}`)
//     }
//     console.log("============")
//     console.log("END REPORT")
//     console.log("============")
// }
// function sortPages(pages){
//     const pagesArr = Object.entries(pages)
//     pagesArr.sort((a,b)=>{
//         aHits =a[1],
//         bHits =b[1]
//         return b[1]-a[1]
//     })

//     return pagesArr
// }

// module.exports = {
//     sortPages ,
//     printReport
// }

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => b[1] - a[1]);
    return pagesArr;
}

function printReport(pages) {
    const sortedPages = sortPages(pages);
    let report = '';
    sortedPages.forEach(([url, hits]) => {
        report += `Found ${hits} link to page: ${url}\n`;
    });
    return report;
}

function printSummary(summary) {
    return `Summary:
    - Total pages crawled: ${summary.totalPages}
    - Most linked-to page: ${summary.mostLinkedPage} (Links: ${summary.mostLinkedPageHits})
    `;
}

module.exports = {
    sortPages,
    printReport,
    printSummary
};


