import axios from 'axios'
import { context as c } from '../../context'

export const boardService = {
    getAllArticles,
    // getArticle,
    // postArticle,
    // updateArticle,
    // delete: _delete
}

async function getAllArticles() {
    const req = {
        method: c.get,
        url: `${c.url}/api/boards`
    }
    const res = await axios(req)
    const data = res.data
    return data
}