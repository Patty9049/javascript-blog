/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };
  //titleClickHandler
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    console.log('clickedElement(with plus): ', clickedElement);
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.posts article.active ');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    targetArticle.classList.add('active');
  };
  //generateTitleLinks
  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags.list',
    cloudClassCount: '5',
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.authors.list',
  };
  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    console.log(articles);
    console.log(customSelector);
    let html = '';
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      console.log(articleId);
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
      console.log(articleTitle);
      //const linkHTML = '<li > < a href = "#' + articleId + '" >< span > ' + articleTitle + ' < /span></a > < /li>'; 
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log(linkHTML); titleList.innerHTML = titleList.innerHTML + linkHTML;
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
  //calculateTagsParams
  function calculateTagsParams(allTags) {
    const params = { max: 0, min: 999999, };
    for (let tag in allTags) {
      console.log(tag + ' is used ' + allTags[tag] + ' times');
      params.max = Math.max(allTags[tag], params.max);
      params.min = Math.min(allTags[tag], params.min);
    }
    return params;
  }
  //calculateTagClass
  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
    const tagCloudClass = opt.cloudClassPrefix + classNumber;
    return tagCloudClass;
  }
  //generateTags 
  function generateTags() {
    let allTags = {};
    const articles = document.querySelectorAll(opt.articleSelector);
    for (let article of articles) {
      const tagsWrapperList = article.querySelector(opt.articleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      for (let tag of articleTagsArray) {
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.articleLink(linkHTMLData);
        console.log(linkHTML);
        tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
        html = html + linkHTML;
        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagsWrapperList.innerHTML = html;
    }
    const tagList = document.querySelector('.tags');
    console.log(tagList);
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    //let allTagsHTML = '';
    const allTagsData = { tags: [] };
    for (let tag in allTags) {

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  }
  generateTags();
  // tagClickHandler
  const tagClickHandler = function (event) {
    const clickedElement = this;
    console.log('Tag was clicked');
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    console.log(tag);
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTagLinks);
    for (let activeTagLink of activeTagLinks) {
      activeTagLink.classList.remove('active');
    }
    const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(targetTagLinks);
    for (let targetTagLink of targetTagLinks) {
      targetTagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  //addClickListenersToTags
  function addClickListenersToTags() {
    const targetTagLinks = document.querySelectorAll('a[href^="#tag-"]');
    for (let targetTagLink of targetTagLinks) {
      targetTagLink.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();
  //calculateAuthorsParams
  function calculateAuthorsParams(allAuthors) {
    const params = { max: 0, min: 999999, };
    for (let author in allAuthors) {
      console.log(author + ' is used ' + allAuthors[author] + ' times');
      params.max = Math.max(allAuthors[author], params.max);
      params.min = Math.min(allAuthors[author], params.min);
    }
    return params;
  }

  //calculateAuthorClass
  function calculateAuthorClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
    const authorCloudClass = opt.cloudClassPrefix + classNumber;
    return authorCloudClass;
  }

  //generateAuthors
  function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll(opt.articleSelector);
    console.log(articles);
    for (let article of articles) {
      const authorWrapper = article.querySelector(opt.articleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      console.log('articleAuthors:', articleAuthor);
      const articleAuthorsArray = articleAuthor;
      console.log(articleAuthorsArray);

      const linkHTMLData = { id: articleAuthor, title: articleAuthor };
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log(linkHTML);

      authorWrapper.innerHTML = authorWrapper.innerHTML + linkHTML;
      html = html + linkHTML;
      console.log(html);
      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
    }
    console.log(allAuthors);
    const authorsList = document.querySelector(opt.authorsListSelector);
    console.log(authorsList);
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams:', authorsParams);
    //let allAuthorsHTML = '';
    const allAuthorsData = { authors: [] };
    for (let author in allAuthors) {

      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorClass(allAuthors[author], authorsParams)
      });
    }
    authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
    console.log(authorsList);
  }
  generateAuthors();
  //authorClickHandler
  const authorClickHandler = function (event) {
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
  function addClickListenersToAuthors() {
    const targetAuthorLinks = document.querySelectorAll('.post-author a');
    for (let targetAuthorLink of targetAuthorLinks) {
      targetAuthorLink.addEventListener('click', authorClickHandler);
    }
    addClickListenersToAuthors();
  }
}