let nextArticleId=4
let articles={articles:[{id:1,author:'tz13',content:'aa'},{id:2,author:'Scott',content:'bb'},{id:3,author:'CZ',content:'cc'}]}

const getArticles = (req, res) => {
	const _id = req.params.id
	if(_id){
		res.send(articles.articles.filter((item)=>item.id==_id))
		return
	}
	res.send(articles)
}
const addArticle = (req,res) =>{
	const newArticle={id:nextArticleId,author:req.body['author'],content:req.body['content']}
    articles['articles'].push(newArticle)
    nextArticleId++
    res.send(newArticle)
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/articles',addArticle)
}
