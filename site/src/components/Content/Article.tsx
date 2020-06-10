import React from 'react';
import { Helmet } from 'react-helmet';
import { Affix } from 'antd';
import delegate from 'delegate';
import moment from 'moment';
// import EditButton from './EditButton';
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
  delegation: any;

  pingTimer: number;

  node: HTMLElement | null | undefined;

  componentDidMount() {
    // Add ga event click
    this.delegation = delegate(
      this.node,
      '.resource-card',
      'click',
      (e: { delegateTarget: { href: any } }) => {
        if ((window as any).ga) {
          (window as any).ga('send', 'event', 'Download', 'resource', e.delegateTarget.href);
        }
      },
      false,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.pingTimer);
    if (this.delegation) {
      this.delegation.destroy();
    }
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
              <div
                dangerouslySetInnerHTML={{
                  __html: content.toc.replace(/<ul>/g, '<ul class="toc">').replace(/\/#/g, '#'),
                }}
              />
            </Affix>
          )}
          <section
            className="markdown api-container"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </article>
      </>
    );
  }
}
