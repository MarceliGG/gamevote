import postgres from 'postgres'

// postgres options. change in prod
const options = {
    host: "172.17.0.2",
    port: 5432,
    database: "gamevote",
    username: "gamevote",
    password: "mysecretpassword"
}

const sql = postgres(options)

export default sql
