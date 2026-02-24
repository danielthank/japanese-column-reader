const fs = require("fs")
const path = require("path")
const folder = "./data/"

exports.createPages = async ({ actions: { createPage } }) => {
  const files = fs.readdirSync(folder)
  let oldestDate, newestDate
  files.forEach(filename => {
    const match = filename.match(/column_(\d*)\.json/)
    if (!match) return
    const date = match[1]
    if (!oldestDate || Number(date) < Number(oldestDate)) oldestDate = date
    if (!newestDate || Number(date) > Number(newestDate)) newestDate = date
  })
  files.forEach(filename => {
    const match = filename.match(/column_(\d*)\.json/)
    if (!match) return
    const date = match[1]
    createPage({
      path: `/column/${date}/`,
      component: path.resolve("./src/templates/column.tsx"),
      context: {
        date,
        newestDate,
        oldestDate,
      },
    })
  })
  createPage({
    path: `/`,
    component: path.resolve("./src/templates/column.tsx"),
    context: {
      date: newestDate,
      newestDate,
      oldestDate,
    },
  })
}
