{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-' ;
  // const optAuthorsListSelector = '.authors';

  
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!' , event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /*[DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    // console.log('clickedElement' , clickedElement);

    /* [DONE] remove class 'active' from all articles */

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

  /*FUNCTION generateTitleLinks*/

  const generateTitleLinks = function(customSelector = ' '){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';
    // console.log(html);

    for(let article of articles){

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */

      /* [DONE] get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      // console.log(linkHTML);

      /*[DONE] insert link into titleList */

      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();


  /*FUNCTION calculateTagsParms*/

  const calculateTagsParams = function(tags){

    const params = {max:0 , min:999999};

    for(let tag in tags){

      if(tags[tag] > params.max){
  
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
  
        params.min = tags[tag];
      } 
    }
    return params;
  };
  
  /*FUNCTION calculateTagClass*/

  const calculateTagClass = function(count , params){

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return optCloudClassPrefix + classNumber;
  };

  /*FUNCTION generateTags*/

  const generateTags = function(){

    /* [NEW] create a new variable allTags with an empty objecct */
    
    let allTags = {};

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for(let article of articles){

      /* find tags wrapper */

      const tagWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      // console.log('articleTags: ', articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */

      for(let tag of articleTagsArray){

        /* generate HTML of the link */

        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.tagLink(linkHTMLData);
        // console.log(linkHTML);

        /* add generated code to html variable */

        html += linkHTML + ' ';

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }/* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */

      tagWrapper.innerHTML = html;
      
      /* END LOOP: for every article: */
    }
 
    /* [NEW] find list of tags in right column */

    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */

    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */

      // const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>' + '    '; 
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    }
    /* [NEW] END LOOP: for each tag in allTags: */
    /*[NEW] add HTML from allTagsHTML to tagList */

    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }; 
  generateTags();

  const tagClickHandler = function(event){
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */

    const tagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('tagsLinks', tagsLinks);

    /* START LOOP: for each active tag link */

    for (let tagLink of tagsLinks) {

      /* remove class active */

      tagLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function(){
    /* find all links to tags */

    const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */

    for (let tagLink of tagsLinks) {

      /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  // /*FUNCTION calculateAuthorsParams*/

  // const calculateAuthorsParams = function(authors){

  //   const params = {max: 0, min: 9999};

  //   for(let author in authors){

  //     if(authors[author] > params.max){
  //       params.max = authors[author];
  //     } 
  //     else if (authors[author] < params.min){
  //       params.min = authors[author];
  //     } 
  //   }
  //   return params;  
  // };
  
  /* FUNCTION calculateAuthorClass*/

  // const calculateAuthorClass = function(count, params){

  //   const normalizedCount = count - params.min;
  //   const normalizedMax = params.max - params.min;
  //   const percentage = normalizedCount / normalizedMax;
  //   const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  //   return optAuthorsListSelector + classNumber;
  // };

  /*FUNCTION generateAuthors*/ 

  const generateAuthors = function(){

    /* [NEW] create a new variable allAutros with an empty object */

    let allAuthors = {};

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    // console.log('articles = ', articles);
    
    /* START LOOP: for every article: */
    
    for(let article of articles){
    
      /* find author wrapper */
    
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    
      /* make html variable with empty string */
    
      let html = '';
    
      /* get tags from data-author attribute */
    
      const articleAuthor = article.getAttribute('data-author');
      // console.log('articleAuthor = ', articleAuthor);

      /* generate HTML of the link */
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      // console.log('linkHTML = ', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      // console.log('html = ', html);

      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors[articleAuthor]) {
      /* [NEW] add tag to allTags object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* insert HTML of all the links into the tags wrapper */
      authorsWrapper.innerHTML = html;
  
      /* [NEW] find list of authors in right column */
      const authorList = document.querySelector('.authors'); 
      // const authorsParams = calculateAuthorsParams(allAuthors);
      // console.log('authorsParams:', authorsParams);
           
      //  let allAuthorsHTML = '';
      const allAuthorsData = {authors: []};

      /* [NEW] START LOOP: for each auhor in allAuthors: */
      for(let author in allAuthors){
        
        
        allAuthorsData.authors.push({
          author: author,
          count: allAuthors[author],
        });
      }
      /* END LOOP: for every author */

      authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

   
    }/* END LOOP: for every article */
  };

  generateAuthors();

  /*FUNCTION authorClickHandler*/
  const authorClickHandler = function(event){

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');

    /* find all authors links with class active */

    const activeAuthors = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each active tag link */

    for (let activeAuthor of activeAuthors){

      /* remove class active */

      activeAuthor.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
 
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');   /// SPRAWDZIC!!!! bo byl 'author' zamiast 'activeAuthor'
  };

  /* FUNCTION addClickListenersToAuthors*/

  const addClickListenersToAuthors = function(){

    /* find all links to authors*/
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  
    /* START LOOP: for each link */
  
    for(let authorLink of authorLinks){

      /* add tagClickHandler as event listener for that link */
  
      authorLink.addEventListener('click', authorClickHandler);
  
      /* END LOOP: for each link */
    }
  };   
  addClickListenersToAuthors();  
} 
