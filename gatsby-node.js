const fs = require("fs")
const folder = "./data/"

exports.createPages = async ({ actions: { createPage } }) => {
  fs.readdir(folder, (err, files) => {
    let oldestDate, newestDate
    files.forEach(filename => {
      const date = filename.match(/column_(\d*)\.json/)[1]
      if (!oldestDate || Number(date) < Number(oldestDate)) oldestDate = date
      if (!newestDate || Number(date) > Number(newestDate)) newestDate = date
    })
    files.forEach(filename => {
      const date = filename.match(/column_(\d*)\.json/)[1]
      createPage({
        path: `/column/${date}/`,
        component: require.resolve("./src/templates/column.tsx"),
        context: {
          date,
          newestDate,
          oldestDate,
        },
      })
    })
    createPage({
      path: `/`,
      component: require.resolve("./src/templates/column.tsx"),
      context: {
        date: newestDate,
        newestDate,
        oldestDate,
      },
    })
  })
}
