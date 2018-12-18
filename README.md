# create-git-web-site

Static Web site generator

[![NPM Dependency](https://david-dm.org/EasyWebApp/create-git-web-site.svg)](https://david-dm.org/EasyWebApp/create-git-web-site)

[![NPM](https://nodei.co/npm/create-git-web-site.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/create-git-web-site/)



## Installation

 1. Create a [GitHub](https://github.com/new) repository with a ReadMe at least

 2. Enable [GitHub pages](https://pages.github.com/) of this repository

 3. Create an Application in your Cloud service which supports [GitHub web-hook](https://developer.github.com/webhooks/) (such as [LeanCloud](https://leancloud.cn/))

 4. Create a Web-hook in this repository, then set it into your Cloud App

 5. Execute commands below:

```Shell
git clone https://github.com/your/git-repo

cd git_repo

npm init web-site --CDN https://your-app.cloud-example.com/

git add .

git commit -m "[ Add ]  Web-site main framework"

git push origin
```


## Usage

Just create & edit MarkDown files in `./article/` folder of your repository in Web browser,
the Site-generator will build static pages automatically in your Cloud App!
