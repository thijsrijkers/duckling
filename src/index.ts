#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
let readline = require('readline');
const clear = require('clear');
import { duck, getRandomDuckQuote } from './duck';

clear();

console.log( chalk.blue(figlet.textSync('Duckling 🦆', { horizontalLayout: 'full' })));

program
  .description("🦆 A command line to rubber duck with")
  .version("version('0.0.1')");
program.parse(process.argv);

read();

async function askQuestion(query: string) {
    const rl = readline.createInterface({
        input: process.stdin,
    });

    return new Promise(resolve => rl.question(query, (ans: string) => {
        leadOut(ans);
    }))
}

export async function read(){
    console.log("Duck: ");
    await askQuestion("Duck: ");
}

async function leadOut(ans: string){
    await duck(ans);
}