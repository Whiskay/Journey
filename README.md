# Journey

Extension to manage and share your web journey.

---

![Journey: Web extension](journey.png)

## Features

- Get tab name and tab link together in markdown style
- Customizable shortcut to copy markdown style links
- Dark theme supported
- Extract all links from current window in one go
- Option to extract as comma seperated values
- Import all the links directly to tabs from any block of text
- Never wonder what that weird dead or (now) private link was about.
- Developers might like:
  - Simple : Just HTML and Javascript.
  - Non bloated: No trackers or Frameworks.
  - Open-Sourced: You can copy and update the code for according to your needs.
  - Template: This repository can be used for creating your own extensions from scratch.
 
## Code: https://github.com/Whiskay/Journey
- Branches:
  1. [Lite](https://github.com/Whiskay/Journey/tree/lite) - Published as Lite version
  2. [Main](https://github.com/Whiskay/Journey/tree/main) - Published as main version
  3. [Dev](https://github.com/Whiskay/Journey/tree/dev) - W.I.P - Testing out features

[link-chrome]: https://chromewebstore.google.com/detail/journey/engpgehjjalaffbchfheidmhgfeoicea
[link-firefox]: https://addons.mozilla.org/en-US/firefox/addon/webjourney/

## Install: Available on [Chrome][link-chrome] and [Firefox][link-firefox]

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="48" alt="Chrome" valign="middle">][link-chrome]
[<img valign="middle" src="https://img.shields.io/chrome-web-store/v/beokknkebpiigackckbaapoiohbgflac.svg?label=%20">][link-chrome] 
also compatible with
[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/edge/edge.svg" width="24" alt="Edge" valign="middle">][link-chrome] 
[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/opera/opera.svg" width="24" alt="Opera" valign="middle">][link-chrome] 
[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/brave/brave.svg" width="24" alt="Brave" valign="middle">][link-chrome]

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/firefox/firefox.svg" width="48" alt="Firefox" valign="middle">][link-firefox] 
[<img valign="middle" src="https://img.shields.io/amo/v/search-switch.svg?label=%20">][link-firefox] 


## Lite version
- For those who prefer to minimize extension permissions, we offer a lightweight version. Lite version just requires permissions for "tabs" and "storage" but with limited permissions comes limited powers. The lite version lacks context menu options and shortcut keys for getting tab URLs as Markdown links.
- Lite version can export and import multiple tabs URLs in one go.

[link-chrome-lite]: https://chromewebstore.google.com/detail/journey-lite/oeecbhpbepcebmgedlhajcjpnmefcmbm

## Lite version : Available on [Chrome][link-chrome-lite]  
 

## Demo [Journey - Open-source web extension to manager and share your web Journey - YouTube](https://www.youtube.com/watch?v=vV9ckTCfkXI)
 
<a href="https://www.producthunt.com/posts/journey-57a99476-558a-44ab-9779-8c4430b4e197?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-journey&#0045;57a99476&#0045;558a&#0045;44ab&#0045;9779&#0045;8c4430b4e197" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=494055&theme=light" alt="Journey - Share&#0032;and&#0032;manage&#0032;your&#0032;web&#0032;Journey | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

## Chrome: Install from Source

- Clone/Download this repo.
- Extract the zip file.
- Go to `chrome://extensions/`.
- Enable `Developer mode` switch.
- Click on `Load unpacked`.
- Select the extracted-folder.
- Pin it if you want.
- Done.

---

## Firefox: Install from Source

- Clone/Download this repo.
- Extract the zip file.
- Go to `about:addons`.
- Click the Settings gear next to `Personalize Your Firefox`
- Select `Debug Add-Ons`
- Select `Load Temporary Add-on...`
- Zip the Firefox extension folder and then select the zip file.
- Command to create the Archive

```ps1
Compress-Archive -Path ./* -DestinationPath firefoxExtn.zip -Force
```

- Done.

---

## Notes

- If you are facing any issues or errors please create an issue here.
- Thought of some new feature or enhancemet, please create a issue here.
- Maintained by Whiskay.dev
- Email: contact@whiskay.dev
- If you reached till here, please dont forget to star the repository.

---

## Credits

- Vectors and icons by [SVG Repo - Free SVG Vectors and Icons](https://www.svgrepo.com/)
