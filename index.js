const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const fs = require('fs')
const writeStream = fs.createWriteStream('post.csv')

// Write Headers
writeStream.write(`Title,Link \n`)


const app = express()
const url = 'http://theguardian.com/uk'


axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $(".fc-item__title", html).each(function () {
            const title = $(this).text()
            const url = $(this).find("a").attr("href")

            articles.push({
                title,
                url

            })
            // Write Row to CSV
            writeStream.write(`${title}, ${url} \n`)
        })
    }).catch(error => {
        console.log(error)
    })

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))

