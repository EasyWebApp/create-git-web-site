#! /usr/bin/env node

import '@babel/polyfill';

import Commander from 'commander';

import { meta } from './core';

import { boot, build } from './command';


Commander
    .arguments('[path] [option]')
    .option('-f, --framework <name>',  'Web front-end framework',  'bootstrap@3')
    .option('--CDN <URL>',  'CDN base URL',  /(https?:)?\/\/\S+/);

Commander.command('build')
    .description('Build HTML files')
    .action(() => build());

Commander
    .name( meta.meta.name )
    .version( meta.meta.version )
    .description( meta.meta.description )
    .parse( process.argv );


const args = Commander.args.filter(
    item  =>  (typeof item === 'object')  ||  /^[@\w]/.test( item )
);

if (typeof args[0] !== 'object')
    boot(args[0] || '.',  Commander.framework,  Commander.CDN);
