

/*
* Code available at: github.com/Whiskay/Journey
* Author: Whiskay.dev
*/
try {
    if (window.location.pathname == "/popup.html") {
        setupPopUp();
    }
    if (window.location.pathname == "/options.html") {
        setupOptions();
    } 
}
catch (exp) {
    console.warn(`
        Error occurred in the Journey extension. 
        You can create an issue at https://github.com/Whiskay/Journey/issues.
        Error:  + ${exp}`)
}

// Helper methods 
function openOptions() {
    chrome.runtime.openOptionsPage();
}

function urlify(text) {
    if (text.trim().length > 0 && text.trim().startsWith("[")) {
        // The Url is in markdown format
        var regexPattern = /\[(.*)\]\((.*)\)/gm;
        var match = regexPattern.exec(text);
        return { title: match[1], url: match[2] };
    }

    text = text.replaceAll(")", "").replaceAll("]", "").trim();
    var url = text.match(/\bhttps?:\/\/\S+/gi);
    if (url) {
        let link = url[0];
        return { title: link, url: link };
    }
    else { return null; }
}

function getCurretWindowLinks_CSV() {
    getCurretWindowLinks('csv')
}

function getCurretWindowLinks_MD() {
    getCurretWindowLinks('markdown')
}

function copyCurretTabMarkdownLink() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        var markdownFormatLink = `[${tab.title}](${tab.url})`
        window.navigator.clipboard.writeText(markdownFormatLink)
    });
}

function getMarkdownStyleLink(title, url) {
    return `- [${title}](${url})`
}
function getCommaSeperatedLink(title, url) {
    return `[${title}],(${url})`
}

function getCurretWindowLinks(style) {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        var allLinks = new Array();
        tabs.forEach(tab => {
            if (style == 'markdown') {
                var markdownFormatLink = getMarkdownStyleLink(tab.title, tab.url)
            } else {
                var markdownFormatLink = getCommaSeperatedLink(tab.title, tab.url)
            }
            allLinks.push(markdownFormatLink)
        });
        document.getElementById('number-of-tabs').innerHTML = allLinks.length;
        allLinks = allLinks.join("\n")
        document.getElementById('results').innerHTML = allLinks;
        chrome.tabs.query({}, (tabs) => {
            document.getElementById('total-number-of-tabs').innerHTML = tabs.length;
        });
    });
}

function copyToClipboard() {
    var content = document.getElementById('results').innerHTML;
    window.navigator.clipboard.writeText(content)
    document.getElementById('copy-status').innerHTML = "Copied!";
    setInterval(() => {
        document.getElementById('copy-status').innerHTML = "";
    }, 2000);
}

function changeTheme() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    element.classList.contains("dark-mode") ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
    document.getElementById('theme-toggle-button').style.rotate = element.classList.contains("dark-mode") ? '0deg' : '180deg';
}

function restoreUserTheme() {
    var userTheme = localStorage.getItem('theme');
    document.getElementById('theme-toggle-button').style.rotate = userTheme == "dark" ? '0deg' : '180deg';
    if (userTheme == "dark") {
        changeTheme();
    }
}
 
function setupOptions() { 
    document.getElementById('import-tab-count')?.addEventListener('click', () => { showValidUrls() });
    document.getElementById('import-tabs-action').style.display = 'none';
    document.getElementById('import-tabs-action')?.addEventListener('click', () => { importTabs() });
    document.getElementById('import-tabs-validate')?.addEventListener('click', () => { validateTabs() });
    document.getElementById('markdown-link')?.addEventListener('click', () => { copyCurretTabMarkdownLink() });
    document.getElementById('options-getlink-tabs-md')?.addEventListener('click', () => { getCurretWindowLinks_MD() });
    document.getElementById('options-getlink-tabs-csv')?.addEventListener('click', () => { getCurretWindowLinks_CSV() });
    document.getElementById('options-copy-to-clipboard')?.addEventListener('click', () => { copyToClipboard() }); 
    document.getElementById('theme-toggle-button')?.addEventListener('click', () => { changeTheme() });
    restoreUserTheme()
    getCurretWindowLinks_MD()
}

function setupPopUp() { 
    document.getElementById('copy-current-tab-markdown-link')?.addEventListener('click', () => { copyCurretTabMarkdownLink() });
}

var validTabs = new Array();
function validateTabs() {
    validTabs = new Array();
    var tabs = document.getElementById('import-tabs').value;
    var tabsArray = tabs.split("\n");
    tabsArray.forEach(tab => {
        if (tab.trim().length > 0) {
            var tabLink = urlify(tab);
            if (tabLink) {
                validTabs.push(tabLink);
            }
        }
    });
    document.getElementById('import-tabs-action').style.display = '';
    document.getElementById('import-tab-count').innerHTML = `${validTabs.length} valid urls found.`;
}

function showValidUrls() {
    let validUrlsHtml = `<ul>`
    validTabs.forEach(element => {
        validUrlsHtml += `<li><a href='${element.url}' target='_blank'>${element.title}</a></li>`
    });
    validUrlsHtml += `</ul>`
    document.getElementById('import-tab-valid-urls').innerHTML = validUrlsHtml;
}

function importTabs() {
    validTabs.forEach(tabLink => {
        chrome.tabs.create({ url: tabLink.url });
    });
}
 