{
  //titleClickHandler
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

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

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    targetArticle.classList.add('active');
  };

  //generateTitleLinks
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';

  function generateTitleLinks(customSelector = ''){

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML='';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(articles);
    console.log(customSelector);

    let html = '';

    for(let article of articles){

      const articleId = article.getAttribute('id');
      console.log(articleId);

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

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

    //[NEW]
    let allTags = {};

    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles){

      const tagsWrapperList = article.querySelector(optArticleTagsSelector);

      let html = '';

      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      for(let tag of articleTagsArray){

        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        console.log(linkHTML);

        tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
        html = html + linkHTML;

        //[NEW]
        if(!allTags[tag]){
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        };
      }
      tagsWrapperList.innerHTML = html;

    }
    const tagList = document.querySelector('.tags');
    console.log(tagList);

    //tagList.innerHTML = allTags.join(' ');
    console.log(allTags);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      allTagsHTML += '<li><a href="#tag-' + tag + '"><span>' +  tag + ' (' + allTags[tag] + ') '+  '</span></a></li>';
      console.log(allTagsHTML);
    }
    /* [NEW] END LOOP: for each tag in allTags: */
    const tagsList = document.querySelectorAll(optTagsListSelector);
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
  generateTags();

  // tagClickHandler
  const tagClickHandler = function(event){

    //event.preventDefault(tagClickHandler);
    const clickedElement = this;
    console.log('Tag was clicked');
    console.log(clickedElement);

    const href = clickedElement.getAttribute('href');

    const tag = href.replace('#tag-', '');
    console.log(tag);

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTagLinks);

    for(let activeTagLink of activeTagLinks){

      activeTagLink.classList.remove('active');
    }
    const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(targetTagLinks);

    for(let targetTagLink of targetTagLinks){

      targetTagLink.classList.add('active');

    }

    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  //addClickListenersToTags
  function addClickListenersToTags(){

    const targetTagLinks = document.querySelectorAll('a[href^="#tag-"]');

    for(let targetTagLink of targetTagLinks){

      targetTagLink.addEventListener('click', tagClickHandler);

    }
  }
  addClickListenersToTags();

  //generateAuthors
  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    for(let article of articles){
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      let html = '';

      const articleAuthors = article.getAttribute('data-author');
      console.log('articleAuthors:', articleAuthors);

      const linkHTML = '<a href="#author-' + articleAuthors + '"><span>' + articleAuthors + '</span></a>';
      console.log('linkHTML:', linkHTML);

      authorWrapper.innerHTML = authorWrapper.innerHTML + linkHTML;
      html = html + linkHTML;
      authorWrapper.innerHTML = html;
    }
  }
  generateAuthors();

  //authorClickHandler
  const authorClickHandler = function(event){

    const clickedElement = this;
    console.log('Author was clicked');
    console.log('clickedElement:', clickedElement);

    const href = clickedElement.getAttribute('href');

    const articleAuthor = href.replace('#author-', '');
    console.log('articleAuthor:', articleAuthor);

    const activeAuthorLink = document.querySelectorAll('.active a[href^="#author-"]');
    console.log('activeAuthorLink:', activeAuthorLink);

    generateTitleLinks('[data-author="' + articleAuthor + '"]');
  };


  //addClickListnersToAuthors
  function addClickListenersToAuthors(){

    const targetAuthorLinks = document.querySelectorAll('.post-author a');
 //   console.log(targetAuthorLinks);

    for(let targetAuthorLink of targetAuthorLinks){

      targetAuthorLink.addEventListener('click', authorClickHandler);
    }
  };
  addClickListenersToAuthors();
}
