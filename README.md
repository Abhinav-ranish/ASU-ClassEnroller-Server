
<h1 align="center">
  <br>
  <a href="https://github.com/Abhinav-ranish/ASU-Autologin"><img src="https://raw.githubusercontent.com/Abhinav-ranish/ASU-Autologin/main/asu.ico" alt="ASU" width="200"></a>
  <br>
  Class Enroller - ASU
  <br>
</h1>

<h4 align="center">An automated class enroller webiste for Arizona State University. Build with  <a href="https://nodejs.org/en" target="_blank">Node.js</a> and selenium (python) <a href="https://www.python.org/" target="_blank">Python</a>.</h4>

<h4 align="center"> Use the Python one for locally hosting. It's so much more convenient <a href="https://github.com/Abhinav-ranish/Selenium-Class-Scraper" target="_blank">Class Enroller</a> </h4>

<p align="center">
  <a href="https://www.paypal.me/aranish911">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

[![screenshot](https://img.youtube.com/vi/SxLpP7ES3-o/0.jpg)](https://youtu.be/SxLpP7ES3-o)

## Key Features

* Puppeteer scrapes ASU class search and if the class is open runs the autologin sequence if not it waits for 10 minutes and then rechecks (hopefully).
* Duo Push (Passcode) - Will need a new OTP every re-run. To Bypass this you will have to turn off 2fa. (Or Look into Session Cache Stuff)
* Windows only (Auto login is an exe)
* If you wanna use it for Linux/Mac Autologin script is in /autologin/autoopener.py change the executable from .... .exe to python autologin//autoopener.py
* Visit [AutoLogin](https://github.com/Abhinav-ranish/ASU-Autologin) for more documentation

## How to Use
<h4 align="center"> Use the Python one for locally hosting. It's so much more convenient <a href="https://github.com/Abhinav-ranish/Selenium-Class-Scraper" target="_blank">Class Enroller</a> </h4>
Also, the Python one is cross platform.
To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Abhinav-ranish/ASU-ClassEnroller

# Go into the repository
$ cd ASU-ClassEnroller

# Install dependencies
$ npm install express cheerio puppeteer serve-favicon 

# Run the app
$ npm start run
```

> **Note**
> You will require a new Duo OTP every time you re-run.  &nbsp;&middot;&nbsp;
> All your credentials are saved in [asu_crendentials.yaml](https://github.com/Abhinav-ranish/ASU-ClassEnroller/blob/main/asu_credentials.yaml)  &nbsp;&middot;&nbsp;
> Your DUO OTP is saved in [duopush.txt](https://github.com/Abhinav-ranish/ASU-ClassEnroller/blob/main/duopush.txt) &nbsp;&middot;&nbsp;


## For Enquiries @ aranish@asu.edu 

## Download

Download the pre-build installer found in [Releases](https://github.com/Abhinav-ranish/ASU-ClassEnroller/releases)


## Credits

This software uses the following open-source packages:

- [Node.js](https://nodejs.org/docs/latest/api/)
- [Express](https://expressjs.com/)
- [Cheerio](https://cheerio.js.org/docs/intro)
- [Puppeteer](https://pptr.dev/)
- [Body-parser](https://www.npmjs.com/package/body-parser)
- [Serve-favicon](https://www.geeksforgeeks.org/what-is-the-use-of-serve-favicon-from-node-js-server/)
- [Fs](https://www.npmjs.com/package/fs)

Auto-login uses the following packages:
- [Selenium](https://www.selenium.dev/documentation/)
- [Python](https://www.python.org/downloads/)

## Related

[Auto Login](https://github.com/Abhinav-ranish/ASU-Autologin) - Python selenium script for auto-login ASU

## Support

<a href="https://paypal.me/aranish911" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


## License

MIT

---

> LinkdIn [abhinav_ranish](https://www.linkedin.com/in/abhinavranish/) &nbsp;&middot;&nbsp;
> GitHub [@abhinav-ranish](https://github.com/abhinav-ranish) &nbsp;&middot;&nbsp;
> Instagram [@abhinav.ranish](https://instagram.com/abhinav.ranish)

