// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/node-apis/
//  */

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions
//   // Only update the `/app` page.
//   if (page.path.match(/^\/problem/)) {
//     // page.matchPath is a special key that's used for matching pages
//     // with corresponding routes only on the client.
//     page.matchPath = "/problem/:id"
//     // Update the page.
//     createPage(page)
//   }
// }