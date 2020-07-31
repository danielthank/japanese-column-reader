from newspaper import Article
import json
import scrapy
import datetime

class ColumnSpider(scrapy.Spider):
  name = "column"
  now = datetime.datetime.now()
  today = now.strftime("%Y%m%d")

  def start_requests(self):
    start_urls = ["https://www.47news.jp/news/column/47column"]
    for url in start_urls:
      yield scrapy.Request(url=url, callback=self.parse)

  def parse(self, response):
    for item in response.css(".main-list a"):
      try:
        url = item.css("::attr(href)").get()
        source = item.css(".article_source_info span::text").get()
        editorial = item.css(".editorial_name::text").get()
        article = Article(url, language="ja")
        article.download()
        article.parse()
        if len(article.text) < 100: continue
        yield {
          "source": source,
          "editorial": editorial,
          "url": article.url,
          "title": article.title,
          "text": article.text,
          "publish_date": self.today,
        }
      except:
        pass
