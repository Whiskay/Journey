try {
    chrome.runtime.onStartup.addListener(() => {
        console.log(`From Journey extension: onStartup()`);
    });
    
    chrome.runtime.onInstalled.addListener(() =>
        chrome.contextMenus.create({
            title: 'Copy markdown style link',
            id: "dxJourneyCopyLinkContextMenu"
        })
    );
    function copyCurretTabMarkdownLink() {
        var markdownFormatLink = `[${document.title}](${document.URL})`
        window.navigator.clipboard.writeText(markdownFormatLink)
    }

    function copyYoutubeMarkdownLink() {
        var channelName = document.querySelectorAll('#upload-info.ytd-video-owner-renderer div#text-container yt-formatted-string a')[0].innerHTML
        var totalLength = document.getElementsByClassName("ytp-time-duration")[0].innerHTML
        var markdownFormatLink = `[${totalLength} -##- ${document.title}](${document.URL})`

        window.navigator.clipboard.writeText(markdownFormatLink)
    }
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (tab.url?.startsWith("chrome://")) return `Can't copy link from 'chrome://' page.`; // Chrome browser
        if (tab.url?.startsWith("edge://")) return `Can't copy link from 'edge://' page.`; // Edge browser
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: copyCurretTabMarkdownLink
            // function: copyYoutubeMarkdownLink // Customized for youtube - Uncomment this line to use it and comment the above line
        })
    });

}
catch (exp) {
    console.warn(`
        Error occurred in the Journey extension. 
        You can create an issue at https://github.com/Whiskay/Journey/issues.
        Error:  + ${exp}`)
}

