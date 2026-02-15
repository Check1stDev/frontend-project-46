#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const genDiff = require('../src/index.js');

program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => { genDiff(filepath1, filepath2)})

program.parse(process.argv);
