

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
    setupCommon();
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

function setupCommon() {
    document.addEventListener('keydown', function (e) {
        chrome.storage.local.get(["shortcutKey"]).then((result) => {
            let shortcutKey = result.shortcutKey
            if (e.altKey && e.key.toUpperCase() === shortcutKey.toUpperCase()) {
                var markdownFormatLink = `[${document.title}](${document.URL})`
                window.navigator.clipboard.writeText(markdownFormatLink).catch(exp => {
                    console.warn("Error: " + exp) // An error occurred
                });
            }
        });
    });
}

function setupOptions() {
    setupShortcutKey()
    document.getElementById('import-tab-count')?.addEventListener('click', () => { showValidUrls() });
    document.getElementById('import-tabs-action').style.display = 'none';
    document.getElementById('import-tabs-action')?.addEventListener('click', () => { importTabs() });
    document.getElementById('import-tabs-validate')?.addEventListener('click', () => { validateTabs() });
    document.getElementById('markdown-link')?.addEventListener('click', () => { copyCurretTabMarkdownLink() });
    document.getElementById('options-getlink-tabs-md')?.addEventListener('click', () => { getCurretWindowLinks_MD() });
    document.getElementById('options-getlink-tabs-csv')?.addEventListener('click', () => { getCurretWindowLinks_CSV() });
    document.getElementById('options-copy-to-clipboard')?.addEventListener('click', () => { copyToClipboard() });
    document.getElementById('select-shortcut-key')?.addEventListener('click', () => { updatingShortcutKey() });
    document.getElementById('theme-toggle-button')?.addEventListener('click', () => { changeTheme() });
    restoreUserTheme()
    getCurretWindowLinks_MD()
}

function setupPopUp() {
    setupShortcutKey()
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

function setupShortcutKey() {
    chrome.storage.local.get(["shortcutKey"]).then((result) => {
        var shortcutKey = 'C'; // Default shortcut key is 'C'
        if (result != undefined && result.shortcutKey != undefined && result.shortcutKey != '') {
            shortcutKey = result.shortcutKey
        }
        else {
            chrome.storage.local.set({ shortcutKey: shortcutKey })
        }
        document.getElementById('shortcut-key-value').innerHTML = shortcutKey;
    });
}


function updatingShortcutKey() {
    document.getElementById('shortcut-key-value').innerHTML = "Press any key";
    document.addEventListener("keydown", updateShortcutPressHandler); // Add event listener to capture key press
}

function updateShortcutPressHandler(e) {
    var keynum;

    if (window.event) { // IE                  
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                 
        keynum = e.which;
    }

    var charKey = String.fromCharCode(keynum)
    var code = charKey.charCodeAt(0);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
    }
    if (charKey.toUpperCase() == 'D') {
        var errorMessage = `[ERROR: Alt + D is a browser shortcut. Please select some other key.]`
        document.getElementById("shortcut-key-error").innerHTML = errorMessage;
        return false;
    }

    document.getElementById("shortcut-key-error").innerHTML = '';
    document.getElementById("shortcut-key-value").innerHTML = charKey;

    chrome.storage.local.set({ shortcutKey: charKey })
    document.removeEventListener("keydown", updateShortcutPressHandler); // Remove the event listener after the first key press
    return true;
}
