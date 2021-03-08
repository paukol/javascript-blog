{
  'use strict';

  
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
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';


  const generateTitleLinks = function(customSelector = ' '){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';
    console.log(html);

    for(let article of articles){

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */

      /* [DONE] get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

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

  /*FUNCTION generateTags*/

  const generateTags = function(){

    /* find all articles */

    const articles = document.querySelectorAll('.post');

    /* START LOOP: for every article: */

    for(let article of articles){

      /* find tags wrapper */

      const tagWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      //console.log('articleTags: ', articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */

      for(let tag of articleTagsArray){

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkHTML);

        /* add generated code to html variable */

        html = html + linkHTML + ' ';

        /* END LOOP: for each tag */
      }
    
      /* insert HTML of all the links into the tags wrapper */

      tagWrapper.innerHTML = html;
      
      /* END LOOP: for every article: */
    }
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

  const generateAuthors = function(){

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    // console.log('articles = ', articles);
    
    /* START LOOP: for every article: */
    
    for(let article of articles){
    
      /* find author wrapper */
    
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    
      /* make html variable with empty string */
    
      let html = ' ';
    
      /* get tags from dataauthor attribute */
    
      const articleAuthor = article.getAttribute('data-author');
  
      /* generate HTML of the link */
    
      const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

      /* add generated code to html variable */
    
      html = html + linkHTML;

      /* insert HTML of all the links into the tags wrapper */

      authorsWrapper.innerHTML = html;

      /* END LOOP: for every article: */
    }
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

      /* make a new constant "tag" and extract tag from the "href" constant */

      const author = href.replace('#author-', '');

      /* find all authors links with class active */
      const activeAuthors = document.querySelectorAll('a.active[href^="#author"]');

      /* START LOOP: for each active tag link */

      for (let activeAuthor of activeAuthors){

        /* remove class active */

        activeAuthor.classList.remove('active');

        /* END LOOP: for each active tag link */
      }
      /* find all tag links with "href" attribute equal to the "href" constant */
      const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

      /* START LOOP: for each found tag link */
      for (let authorLink of authorLinks){
        /* add class active */
        authorLink.classList.add('active');
        /* END LOOP: for each found tag link */
      }
      /* execute function "generateTitleLinks" with article selector as argument */
      generateTitleLinks('[data-author="' + author + '"]');   /// SPRAWDZIC!!!! bo byl 'author' zamiast 'activeAuthor'
    };

 

     /* FUNCTION addClickListenersToAuthors*/

     const addClickListenersToAuthors = function(){

      /* find all links to authors*/
      const authorLinks = document.querySelectorAll('a[href^="#author-"]');
      // console.log(authorLinks);
  
      /* START LOOP: for each link */
  
      for(let authorLink of authorLinks){
        // console.log(authorLink);
  
        /* add tagClickHandler as event listener for that link */
  
        authorLink.addEventListener('click', authorClickHandler);
  
        /* END LOOP: for each link */
      }
    };   
    addClickListenersToAuthors();  
  } 
