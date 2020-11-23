import React from 'react';
import { graphql } from 'gatsby';
import WrapperLayout from '../components/layout';
import MainContent from '../components/Content/MainContent';
import './docs.less';

interface IMarkDownFields {
  path: string;
  slug: string;
  modifiedTime: number;
  // avatarList: {
  //   url: string;
  //   username: string;
  // }[];
}
export interface IFrontmatterData extends IMarkDownFields {
  title: string;
  time: string;
  toc: string | boolean;
  order: number;
  type: string;
  filename: string;
  subtitle: string;
  path: string;
  disabled: boolean;
  important: boolean;
  next: {
    frontmatter: IGraphqlFrontmatterData;
    fields: IMarkDownFields;
  };
  previous: { frontmatter: IGraphqlFrontmatterData; fields: IMarkDownFields };
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IGraphqlFrontmatterData extends Omit<IFrontmatterData, 'title'> {
  title: string;
}

export interface IMarkdownRemarkData {
  body: string;
  tableOfContents: string;
  frontmatter: IGraphqlFrontmatterData;
  fields: IMarkDownFields;
}

export interface IAllMarkdownRemarkData {
  edges: {
    node: {
      frontmatter: IGraphqlFrontmatterData;
      fields: IMarkDownFields;
    };
    next: {
      frontmatter: IGraphqlFrontmatterData;
      fields: IMarkDownFields;
    };
    previous: { frontmatter: IGraphqlFrontmatterData; fields: IMarkDownFields };
  }[];
}

export default function Template({
  data,
  ...rest
}: {
  data: { mdx: IMarkdownRemarkData; allMdx: IAllMarkdownRemarkData };
  isMobile: boolean;
  location: {
    pathname: string;
  };
}) {
  const { mdx, allMdx } = data;
  const { frontmatter, fields, body, tableOfContents } = mdx;
  const { edges } = allMdx;
  const menuList = edges.map(({ node, next, previous }) => {
    const { fields: nodeFields } = node;

    return {
      slug: nodeFields.slug,
      meta: {
        ...node.frontmatter,
        slug: nodeFields.slug,
        filename: nodeFields.slug,
      },
      ...node.frontmatter,
      filename: nodeFields.path,
      next,
      previous,
    };
  });
  return (
    <WrapperLayout {...rest}>
      <MainContent
        {...rest}
        localizedPageData={{
          meta: {
            ...frontmatter,
            ...fields,
            filename: fields.slug,
            path: fields.path,
          },
          toc: tableOfContents,
          content: body,
        }}
        menuList={menuList}
      />
    </WrapperLayout>
  );
}

export const pageQuery = graphql`
  query TemplateDocsMarkdown($slug: String!, $type: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      tableOfContents
      frontmatter {
        title
        order
        type
      }
      fields {
        path
        slug
        modifiedTime
      }
    }
    allMdx(
      filter: { fileAbsolutePath: { regex: $type } }
      sort: { fields: [frontmatter___order, frontmatter___type], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            order
            type
          }
          fields {
            slug
            path
          }
        }
      }
    }
  }
`;
