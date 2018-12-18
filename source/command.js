import { setNPMConfig, getNPMConfig } from '@tech_query/node-toolkit';

import {
    bootGit, setRoot, meta, parseMD, renderList, renderArticle, setHTML
} from './core';

import { existsSync, readJSON, readdirSync } from 'fs-extra';

import { join } from 'path';

import spawn from 'cross-spawn';


/**
 * Boot a directory as a Web site
 *
 * @param {String} [cwd='.']                 - Current working directory
 * @param {String} [framework='bootstrap@3'] - Web front-end framework
 * @param {String} [CDN]                     - Base URL to load non-HTML files
 */
export  async function boot(cwd = '.',  framework = 'bootstrap@3',  CDN) {

    console.time('Boot Web site');

    setNPMConfig('web-framework', framework);

    await bootGit( cwd );

    if (! existsSync(join(cwd, 'package.json')))
        spawn.sync('npm',  ['init', '-y'],  {stdio: 'inherit', cwd});

    await setRoot( cwd );

    await setHTML(cwd, framework, CDN);

    console.info('--------------------');

    console.timeEnd('Boot Web site');

    console.info('');

    spawn.sync('npm',  ['install'],  {stdio: 'inherit', cwd});

    spawn.sync('npm',  ['install', framework],  {stdio: 'inherit', cwd});
}


/**
 * Build article pages
 *
 * @param {String} [path='.'] - Current working directory
 */
export  async function build(path = '.') {

    const { directories: { doc } } = await readJSON( join(path, 'package.json') );

    const article = readdirSync( join(path, doc) )
            .filter(file  =>  /\.(md|markdown)/i.test( file )),
        list = [ ];

    if (! article[0])  return;

    for (let file of article) {

        const { name, title, description, HTML } = await parseMD( join(path, doc, file) );

        await renderArticle(path, HTML, name);

        list.push({ name, title, description });
    }

    renderList(
        join(meta.path, 'framework', getNPMConfig('web-framework'), 'index.html'),
        '#Article',
        list,
        join(path, 'index.html')
    );
}
