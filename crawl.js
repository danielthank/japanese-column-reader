const execSync = require("child_process").execSync
const fs = require("fs")

const formatDate = time => {
  let month = (time.getMonth() + 1).toString()
  let day = time.getDate().toString()
  const year = time.getFullYear().toString()
  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day
  return [year, month, day].join("")
}

const today = formatDate(new Date())
const filename = `../data/column_${today}.json`

try {
  fs.unlinkSync(filename)
} catch (error) {
  if (error.code !== "ENOENT") throw error
}

execSync(`scrapy crawl column -o ${filename}`, {
  encoding: "utf-8",
  cwd: `${__dirname}/crawler`,
})
