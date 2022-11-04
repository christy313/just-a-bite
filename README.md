## [Just a bite](https://ch-just-a-bite.herokuapp.com/)

* Created an authentication and CMS for the owner to release/update/delete products and contents.

* Created a draw game with internal API calls and adjustable ratio for the future restaurant campaign.

* Built a branded website to benefit businesses by increasing brand visibility and recognition.

* Login with username: admin/password: admin in the content management system to see the privilege under admin.

![](https://imgur.com/cmqYh5s.gif)

## File structure

```
.
├── controllers
│   ├── faq.js
│   ├── menu.js
│   ├── prize.js
│   └── user.js
├── index.js
├── migrations
│   ├── 20220410201802-create-prize.js
│   ├── 20220410201817-create-user.js
│   ├── 20220410201830-create-menu.js
│   └── 20220410201843-create-question.js
├── models
│   ├── index.js
│   ├── menu.js
│   ├── prize.js
│   ├── question.js
│   └── user.js
├── public
│   ├── images
│   │   ├── draw
│   │   ├── homepage
│   │   └── menu
│   ├── script
│   │   ├── api.js
│   │   └── question.js
│   └── style
│       └── style.css
└── views
    ├── cms
    │   ├── cms-add-faq.ejs
    │   ├── cms-add-menu.ejs
    │   ├── cms-add-prize.ejs
    │   ├── cms-edit-faq.ejs
    │   ├── cms-edit-menu.ejs
    │   ├── cms-edit-prize.ejs
    │   ├── cms-faq.ejs
    │   ├── cms-menu.ejs
    │   ├── cms-prize.ejs
    │   └── cms.ejs
    ├── faq.ejs
    ├── index.ejs
    ├── menu.ejs
    ├── prize.ejs
    ├── template
    │   ├── footer.ejs
    │   ├── head.ejs
    │   └── navbar.ejs
    └── user
        ├── login.ejs
        └── signup.ejs
```

## Technologies

* Express.js

* Sequelize

* MySQL

* EJS 

* Bootstrap

## The Difficulties I met

* Prevent duplicate usernames when register

  * The username in the database should be set to unique so that the error message would be caught in `try...catch`

* Prevent Cross-site scripting injection in any input field.

```js
// public/script/api.js

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function drawResult() {
  const result = await getDrawAPI();
  try {
    mainHTML.innerHTML = `
      <div class="prize__result bg-image" style="background-image:url(${result.url})">
        <div class="text-center prize__result-content">
          <div class="card-body">
            <h1 class="card-text">${escapeHtml(result.item)}</h1>
            <h4 class="card-text">${escapeHtml(result.content)}</h4>
            <button class="draw__btn"><a href="/draw">Draw again!</a></button>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    return console.log(`Error: ${result.error} & ${result.message}`);
  }
}
```

## The process of how I made it: [A restaurant website with Express & Sequelize](https://coding-ontheway.coderbridge.io/2022/03/26/backend-express-sequelize-en/)
