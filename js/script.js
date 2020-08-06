/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/


{
		//titleClickHandler
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(MouseEvent + '.')


const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  	activeLink.classList.remove('active');
}

  console.log('clickedElement (with plus):', clickedElement);
  clickedElement.classList.add('active')

const activeArticles = document.querySelectorAll('.posts article.active');

for(let activeArticle of activeArticles){
  	activeArticle.classList.remove('active');
}

  /* [DONE] get 'href' attribute from the clicked link */
const articleSelector = clickedElement.getAttribute('href')
  console.log(articleSelector)

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
const targetArticle = document.querySelector(articleSelector)
  console.log(targetArticle)
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active')
}

/*const links = document.querySelectorAll('.titles a');
  console.log(links)
for(let link of links){
  	link.addEventListener('click', titleClickHandler);
}*/

                    //generateTitleLinks

const optArticleSelector = '.post',
 optTitleSelector = '.post-title',
 optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
const titleList = document.querySelector(optTitleListSelector)
  titleList.innerHTML='';

const articles = document.querySelectorAll(optArticleSelector)

const article = document.querySelector(optArticleSelector)

let html = '';

for(let article of articles){
	  /* [DONE] get the article id */

	const articleId = article.getAttribute('id')
	  console.log(articleId)

	  /* [DONE] find the title element */
	const articleTitle = article.querySelector(optTitleSelector).innerHTML;
	  console.log(articleTitle)
	  /* [DONE^]get the title from the title element */

	  /* [DONE] create HTML of the link */
	const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
	  console.log(linkHTML)

	  /* insert link into titleList */
	titleList.innerHTML = titleList.innerHTML + linkHTML;
	html = html + linkHTML;
	  console.log(html)
	}
titleList.innerHTML = html;

const links = document.querySelectorAll('.titles a');
  console.log(links)
	for(let link of links){
		link.addEventListener('click', titleClickHandler);
	}

}

generateTitleLinks();

}
