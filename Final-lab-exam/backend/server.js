import app from './app.js'
import { connectdb } from './data/database.js'

connectdb()
app.listen(4000,()=>{
    console.log("at 4000")
})