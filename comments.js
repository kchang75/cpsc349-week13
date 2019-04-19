(function (window) {
  'use strict';

  const body = document.querySelector('body');

  // Get posts
  $.getJSON('https://jsonplaceholder.typicode.com/posts', (posts) => {
    posts.forEach((post) => {
      post.body = post.body.replace(/\n/gi, '<br>');

      $(body).append(`<article>
        <h2 data-posts="title">${post.title}</h2>
        <p data-posts="body">
            ${post.body}
        </p>

        <button data-posts="id" value="${post.id}" type="button">Show comments</button>

        <section class="comments" id="comments-${post.id}" hidden>
            <h3>Comments</h3>
        </section>
      </article>`);
    });

    const BUTTON_SELECTOR = '[data-posts="id"]';
    let buttons = document.querySelectorAll(BUTTON_SELECTOR);
    buttons.forEach(function (button) {
      'use strict';

      let sectionSelector = `#comments-${button.value}`;
      let commentSection = document.querySelector(sectionSelector);

      button.addEventListener('click', function (event) {
        if (commentSection.hidden) {
          commentSection.hidden = false;
          button.textContent = 'Hide comments';

          if (commentSection.getAttribute('loaded') === null) {
            commentSection.setAttribute('loaded', '');
            $(commentSection).html('<h3>Comments</h3>');
            $.getJSON(`https://jsonplaceholder.typicode.com/comments?postId=${button.value}`, (comments) => {
              comments.forEach((comment) => {
                comment.body = comment.body.replace(/\n/gi, '<br/>');
                $(commentSection).append(`<p data-comments="body">${comment.body}</p>
                <address data-comments="name">
                  <a data-comments="email" href="mailto:${comment.email}">${comment.name}</a>
                </address>`);
              });
            });
          }
        } else {
          commentSection.hidden = true;
          button.textContent = 'Show comments';
        }

        event.preventDefault();
      });
    });
  });
})(window);