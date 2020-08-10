/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
*/

{
  //titleClickHandler
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(MouseEvent + '.');


    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    console.log('clickedElement (with plus):', clickedElement);
    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  //generateTitleLinks

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML='';

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles){
      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);
      /* [DONE^]get the title from the title element */

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  //generateTags

  function generateTags(){

  /* [DONE] find all articles-znajdz wszystkie artykuły */
    const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article:  ZACZNIJ PĘTLĘ: dla wszytskich artykułów*/
    for(let article of articles){

    /* [DONE] find tags wrapper - znajdz tags wrappery */
      const tagsWrapperList = article.querySelector(optArticleTagsSelector);
    //tagsWrapperList.innerHTML='';

    /* [DONE] make html variable with empty string - stwórz zmienną html z pustym ciągiem */
      let html = '';

    /*[DONE] get tags from data-tags attribute - pobierz tagi z atrybutu data-tags */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags)

    /* split tags into array - podziel tagi na tablice */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

    /* START LOOP: for each tag - ZACZNIJ PĘTLĘ: dla każdego tagu */
        for(let tag of articleTagsArray){

      /* generate HTML of the link - wygeneruj HTML linku */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        console.log(linkHTML);

      /* add generated code to html variable - dodaj wygenerowany kod do zmiennej */
        tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
        html = html + linkHTML;

    /* END LOOP: for each tag - ZAKONCZ PĘTLĘ: dla każdego tagu */
        }
    /* insert HTML of all the links into the tags wrapper - wstaw kod HTML wszystkich linków do tags wrapperów*/
      tagsWrapperList.innerHTML = html;

  /* END LOOP: for every article: - ZAKONCZ PĘTLĘ: dla każdego artykułu */
    }
  }

  generateTags();
}

