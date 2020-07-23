import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  meta?: Array<
    | {
        name?: undefined
        property: string
        content: string
      }
    | {
        name: string
        property?: undefined
        content: string
      }
  >
  description?: string
  title: string
}

const SEO: React.FC<Props> = ({ description, meta = [], title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            lang
          }
        }
      }
    `
  )
  const metaDescription = description || site.siteMetadata.description
  return (
    <Helmet
      htmlAttributes={{
        lang: site.siteMetadata.lang,
      }}
      title={title}
      titleTemplate={`${site.siteMetadata.title} | %s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: `${site.siteMetadata.title} | ${title}`,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
