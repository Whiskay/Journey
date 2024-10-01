try {
    chrome.runtime.onStartup.addListener(() => {
        console.log(`From Journey extension: onStartup()`);
    });
}
catch (exp) {
    console.warn(`
        Error occurred in the Journey extension. 
        You can create an issue at https://github.com/Whiskay/Journey/issues.
        Error:  + ${exp}`)
}

