import postgres from 'postgres'
import { postgres_options } from "./settings.js"

const sql = postgres(postgres_options)

export default sql
