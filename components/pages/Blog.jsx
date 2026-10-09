import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import BlogList from '@/components/blog/BlogList';
import { css } from '@/lib/css';
import { absoluteUrl, SITE_URL } from '@/lib/site';
import { POSTS, BLOG_CATS, getPost } from '@/content/blog-data';
import '@/styles/blog.css';

// Blog list (/blog) and articles (/blog/<id>). Copied from the original design: template "Blog" and "Blog article".

export function paths() {
  return [[], ...POSTS.map((p) => [p.id])];
}

export function meta({ ctx, rest = [] }) {
  const { t } = ctx;
  if (rest[0]) {
    const post = getPost(rest[0]);
    if (!post) return { title: `${t('Blog')} | DripFunnel`, description: t('Guides for running and growing an online shop.') };
    // Unfinished articles are thin content: listed on the site but kept out of search results.
    return { title: `${t(post.title)} | DripFunnel`, description: t(post.ex), type: 'article', noindex: post.stub };
  }
  return { title: `${t('Blog')} | DripFunnel`, description: t('Guides for running and growing an online shop.') };
}

function postMeta(t, p) {
  return t('{date} · {mins} min read', { date: t(p.date), mins: p.mins });
}

export default function Page({ ctx, rest = [] }) {
  const { t, href } = ctx;

  if (!rest[0]) {
    const posts = POSTS.map((p) => ({ id: p.id, cat: p.cat, catLabel: t(p.cat), href: href('blog/' + p.id), title: t(p.title), ex: t(p.ex), meta: postMeta(t, p) }));
    const cats = BLOG_CATS.map((c) => ({ id: c, label: t(c) }));
    return (
      <section data-screen-label="Blog" style={css('max-width:1240px;margin:0 auto;padding:clamp(40px,7cqw,88px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px);display:flex;flex-direction:column;gap:28px;')}>
        <div style={css('display:flex;flex-direction:column;gap:14px;')}>
          <div style={css('display:flex;align-items:center;gap:12px;')}>
            <span aria-hidden="true" style={css('width:32px;height:2px;background:#EC844F;display:block;')}></span>
            <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted,#5A6472);")}>{t('Blog')}</span>
          </div>
          <h1 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(32px,5.5cqw,56px);line-height:1.05;letter-spacing:-0.035em;margin:0;color:var(--head,#0A2A4A);')}>{t('Running a shop, one guide at a time.')}</h1>
        </div>
        <BlogList topicsLabel={t('Topics')} allLabel={t('All')} coverLabel={t('Cover image')} cats={cats} posts={posts} />
      </section>
    );
  }

  const post = getPost(rest[0]);
  if (!post || rest.length > 1) notFound();
  const related = POSTS.filter((p) => p.id !== post.id).slice(0, 3);
  const url = absoluteUrl(href('blog/' + post.id));
  const jsonArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(post.title),
    description: t(post.ex),
    datePublished: post.iso,
    inLanguage: ctx.locale,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'DripFunnel', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'DripFunnel', url: SITE_URL },
  };
  const jsonCrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('Blog'), item: absoluteUrl(href('blog')) },
      { '@type': 'ListItem', position: 2, name: t(post.cat) },
    ],
  };

  return (
    <article data-screen-label="Blog article" style={css('max-width:760px;margin:0 auto;padding:clamp(32px,6cqw,72px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px);display:flex;flex-direction:column;gap:22px;')}>
      <JsonLd data={jsonArticle} />
      <JsonLd data={jsonCrumbs} />
      <nav aria-label={t('Breadcrumb')} style={css('font-size:14px;display:flex;gap:8px;flex-wrap:wrap;color:var(--muted,#5A6472);')}>
        <Link href={href('blog')}>{t('Blog')}</Link>
        <span aria-hidden="true">/</span>
        <span>{t(post.cat)}</span>
      </nav>
      <h1 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(30px,5cqw,50px);line-height:1.08;letter-spacing:-0.03em;margin:0;color:var(--head,#0A2A4A);')}>{t(post.title)}</h1>
      <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{postMeta(t, post)} · {t('Author name placeholder')}</span>
      <span style={css("aspect-ratio:16/8;border-radius:12px;background:var(--sunk,#F3EDE8);display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted,#5A6472);")}>{t('Cover image')}</span>
      <p style={css('margin:0;font-size:19px;line-height:1.65;')}>{t(post.ex)}</p>
      {post.body.map((b) => (
        <Fragment key={b.h}>
          <h2 style={css('margin:12px 0 0;font-family:Manrope,sans-serif;font-weight:800;font-size:24px;letter-spacing:-0.02em;color:var(--head,#0A2A4A);')}>{t(b.h)}</h2>
          <p style={css('margin:0;font-size:17px;line-height:1.75;')}>{t(b.p)}</p>
        </Fragment>
      ))}
      {post.stub ? <div style={css('border:1px dashed var(--field,#D7D3CD);border-radius:12px;padding:20px;font-size:15px;color:var(--muted,#5A6472);')}>{t('Placeholder: the full article goes here.')}</div> : null}
      <div style={css('margin-top:20px;background:var(--sunk,#F3EDE8);border-radius:12px;padding:24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;')}>
        <span style={css('display:flex;flex-direction:column;gap:4px;')}>
          <span style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:20px;')}>{t('Try it on your own shop')}</span>
          <span style={css('font-size:15px;color:var(--muted,#5A6472);')}>{t('Starter is free forever. No card needed.')}</span>
        </span>
        <a href={ctx.storeUrl} className="df-h-primary" style={css('height:44px;padding:0 22px;border-radius:8px;background:#EC844F;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;font-family:Manrope,sans-serif;font-weight:700;')}>{t('Start free')}</a>
      </div>
      <div style={css('display:flex;flex-direction:column;gap:10px;padding-top:16px;')}>
        <span style={css("font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted,#5A6472);")}>{t('Keep reading')}</span>
        {related.map((r) => (
          <Link key={r.id} href={href('blog/' + r.id)} style={css('min-height:44px;display:flex;align-items:center;font-size:16px;font-weight:500;')}>{t(r.title)}</Link>
        ))}
      </div>
    </article>
  );
}
