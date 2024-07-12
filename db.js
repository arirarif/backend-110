const { text } = require('express')
const fs = require('fs/promises')
const path = require('path')


class DatabaseConnection {
    constructor(){
        this.db = null
        this.dbURL = path.resolve(process.env.DB_URL)
    }

    async readDB(){
        const dbStr = await fs.readFile(this.dbURL, {encoding: 'utf-8'})
        this.db = JSON.parse(dbStr)
    }

    async writeDB() {
        if (this.db){
            this.db = await fs.writeFile(this.dbURL, JSON.stringify(this.db))
        }
    }
    async getDB(){
        if(this.db){
            return this.db
        }
        await this.readDB()
        return this.db
    }
}

const main =async () => {
    const dbConnection = new DatabaseConnection()
    const db = await dbConnection.getDB()

    console.log('Database');
    console.log(db);
}

main()