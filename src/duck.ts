const axios = require('axios');
const chalk = require('chalk');
import { read } from './index';

const API_KEY = ""; //Create a API key to use: https://developers.google.com/custom-search/v1/overview?csw=1
let searches = new Map();
const duckQuotes = Array("I was ducking around and found this:", "I found this ducking answer:", "Another duck passed me this:", "My feathers, look at this answer:");

export async function duck(question:string) {
    console.log(" ");
    let response = await getResult(question);
    return response;
}

function getResult(question:string){
    axios({
        method: 'get',
        url: "https://www.googleapis.com/customsearch/v1?key="+API_KEY+"&cx=d56e5a92ba18491e2&q="+question.replace(' ', '+')
    })
    .then(function (response: any) {
        if(searches.get(question) != null){
            let counter = searches.get(question) + 1;
            searches.set(question, counter);
        }else
            searches.set(question, 0);
        
        let data = response.data.items[searches.get(question)].link;

        console.log(chalk.blue(getRandomDuckQuote()));
        console.log(chalk.blue(data));
        read();
     
    });
}

export function getRandomDuckQuote(){ return duckQuotes[Math.floor(Math.random()*duckQuotes.length)];}