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

<!--

[link-chrome]: https://chromewebstore.google.com/detail/
[link-firefox]: https://addons.mozilla.org/en-US/firefox/addon/

## Install: Available on [Chrome][link-chrome] and [Firefox][link-firefox]

## Demo

 -->

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
