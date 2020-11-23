import React from 'react';
import { Helmet } from 'react-helmet';
import { Affix } from 'antd';
import moment from 'moment';
// import EditButton from './EditButton';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { IFrontmatterData } from '../../templates/docs';
// import AvatarList from './AvatarList';

interface ArticleProps {
  content: {
    meta: IFrontmatterData;
    toc: string | false;
    content: string;
  };
}

export default class Article extends React.PureComponent<ArticleProps> {

  pingTimer: number;

  node: HTMLElement | null | undefined;

  componentWillUnmount() {
    clearTimeout(this.pingTimer);
  }

  renderTocList(toc, index = 0) {
    if (toc.items) {
      const list = <ul className="toc">{toc.items.map((item, index) => this.renderTocList(item, index))}</ul>;
      if (toc.url) {
        return (
          <li key={index}>
            <p>
              <a href={toc.url}>{toc.title}</a>
            </p>
            {list}
          </li>
        );
      }
      return list;
    }
    return (
      <li key={index}>
        <a href={toc.url}>{toc.title}</a>
      </li>
    );
  }

  render() {
    const { props } = this;
    const { content } = props;
    const { meta } = content;
    // const { title, subtitle, path, modifiedTime, avatarList } = meta;
    const { title, subtitle, path, modifiedTime } = meta;
    return (
      <>
        <Helmet>
          <title>{`${title} - Pushy`}</title>
          <meta name="description" content={title} />
        </Helmet>
        <article
          className="markdown"
          ref={(node) => {
            this.node = node;
          }}
        >
          <h1>
            {title}
            {!subtitle || <span className="subtitle">{subtitle}</span>}
            {/* <EditButton title="在 Github 上编辑此页！" filename={path} /> */}
          </h1>

          <div className="modifiedTime">
            {/* <AvatarList avatarList={avatarList} /> */}
            最近修改时间
            {moment(modifiedTime).format('YYYY-MM-DD HH:mm:SS')}
          </div>

          {!content.toc || content.toc.length <= 1 || meta.toc === false ? null : (
            <Affix className="toc-affix" offsetTop={16}>
              {this.renderTocList(content.toc)}
            </Affix>
          )}
          <MDXRenderer className="markdown api-container">{content.content}</MDXRenderer>
        </article>
      </>
    );
  }
}
