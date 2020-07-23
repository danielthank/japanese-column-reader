const fs = require("fs")
const folder = "./data/"

exports.createPages = async ({ actions: { createPage } }) => {
  fs.readdir(folder, (err, files) => {
    let newestDate
    files.forEach(filename => {
      const date = filename.match(/column_(\d*)\.json/)[1]
      if (!newestDate || Number(date) > Number(newestDate)) newestDate = date
      createPage({
        path: `/column/${date}/`,
        component: require.resolve("./src/templates/column.tsx"),
        context: {
          date,
        },
      })
    })
    createPage({
      path: `/`,
      component: require.resolve("./src/templates/column.tsx"),
      context: {
        date: newestDate,
      },
    })
  })
}
