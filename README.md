<p align="center">
  <a href="https://column.danielthank.me">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Japanese Column Reader on Web
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/3403f1b5-ae38-4c81-a3b5-d9fb0d174e31/deploy-status)](https://app.netlify.com/sites/keen-brahmagupta-8849fd/deploys)

![Japanese Column Reader](/images/main.png)

## Feature

* Swipe left and right to switch to different news

* Clicking the date label to pick a date and read the news on that day (after 2020/7/20)

## Implementation

* Crawl the news content everyday using [Scrapy](https://github.com/scrapy/scrapy)

* News content is parsed automatically by library [newspaper](https://github.com/codelucas/newspaper)

* Use [Gatsby](https://github.com/gatsbyjs/gatsby) to generate a static site based on the news content

## News source

The news content is from [The 47 Column](https://www.47news.jp/news/column/47column)

Everyday at 21:00 JST, a cron job on Github Action is executed to crawl the content of the newspaper from the above website.
