<p align="center">
  <a href="https://column.danielthank.me">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Japanese Column Reader on Web
</h1>


![Japanese Column Reader](/images/main.png)

## Feature

* Vertical text layout

* Swipe left and right to quickly switch among different news

* Clicking the date label to pick a date and read the columns on that day (after 2020/7/20)

## Implementation

* Crawl the news content everyday using [Scrapy](https://github.com/scrapy/scrapy)

* Parse news content by library [newspaper](https://github.com/codelucas/newspaper)

* Generate SSR rendering static site based on the news content by [Gatsby](https://github.com/gatsbyjs/gatsby)

## News source

The news content is from [The 47 Column](https://www.47news.jp/news/column/47column)

Everyday at 21:00 JST, a cron job on Github Action is triggered to crawl the content of columns from the above website.

[![Netlify Status](https://api.netlify.com/api/v1/badges/3403f1b5-ae38-4c81-a3b5-d9fb0d174e31/deploy-status)](https://app.netlify.com/sites/keen-brahmagupta-8849fd/deploys)
