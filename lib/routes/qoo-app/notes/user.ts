import got from '@/utils/got';
import { load } from 'cheerio';
import { notesUrl, extractNotes } from '../utils';

export default async (ctx) => {
    const { uid, lang } = ctx.req.param();
    const link = `${notesUrl}${lang ? `/${lang}` : ''}/user/${uid}`;

    const { data: response } = await got(link);
    const $ = load(response);

    const items = extractNotes($);

    ctx.set('data', {
        title: $('head title').text(),
        link,
        language: $('html').attr('lang'),
        item: items,
    });
};
