const execSync = require("child_process").execSync

const formatDate = time => {
  let month = (time.getMonth() + 1).toString()
  let day = time.getDate().toString()
  const year = time.getFullYear().toString()
  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day
  return [year, month, day].join("")
}

const today = formatDate(new Date())

execSync(`scrapy crawl column -o ../data/column_${today}.json`, {
  encoding: "utf-8",
  cwd: `${__dirname}/crawler`,
})
