# CS208 Full Stack Final Project - Downtown Donuts

- Name: Angie Bui
- Term: Spring 2026

## Project Description

This project is a full stack website for a small donut shop called Downtown Donuts. The website shows the menu, information about the shop, and allows users to leave comments.

---

## Setup Instructions

### 1. Install and Start the Database

Run the install script to install MariaDB and start the server. You only need to do this once per Codespace.

```bash
./setup_scripts/install_db.sh
```


### 2. Create the Database and Table

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

This creates the `cs208final` database and the `comments` table.

### 3. Install Node Dependencies

```bash
npm install
```

### 4. Start the Application

```bash
npm start
```

### 5. Open in Browser

In Codespaces, go to the **Ports** tab and forward port `3000`. Click the link to open the app. The comments table will be seeded with test data automatically on first startup if it is empty.

---

## Design Decisions

* I used a simple layout with a header, navigation, main section, and footer. This makes the site easy to read and navigate.
* I used the brand colors (dark green, saffron, and seasalt) to match the style guide. This helps keep the design consistent.
* I used a grid layout for the menu so items are easy to see and adjust on different screen sizes.

---

## Edge Cases
* If the server is not reachable, the comments page shows a message like “Comments are unavailable right now” instead of crashing.
* If a user submits only whitespace, the input is trimmed on the server and treated as empty, and an error message is shown.
* If a user submits very long input, the server checks the length and rejects it if it is over the limit (80 characters for name, 500 for message).
* If a user tries to submit multiple times quickly, the submit button is disabled after the first click to prevent duplicate comments.
* If there are too many comments, only 10 are shown at a time and pagination is used to view more.
* If the database query fails, the app shows a friendly error message instead of showing raw errors.
---

## Challenges & Learnings

* One challenge I had was implementing pagination for the comments. At first, I tried to just load all the comments and slice them in JavaScript, but that did not work well and was not efficient. I learned that pagination should be done in SQL using LIMIT and OFFSET. After switching to that, it worked correctly and only loaded 10 comments at a time.

* Another challenge was handling user input safely. At first, I did not sanitize the input, which meant users could enter things like <script> tags. I learned that this could cause XSS issues. To fix this, I added server-side validation and replaced < and > characters so the input is displayed as text instead of running as code.

* I also learned how important it is to handle errors properly. In the beginning, errors would just break the page or show nothing. I updated the routes to catch errors and show a simple message to the user instead of crashing the app.

---

## Citations
https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS
https://stackoverflow.com/questions/77871749/hero-section-styling
https://www.w3schools.com/HOWTO/howto_css_hero_image.asp
https://expressjs.com/en/guide/using-middleware.html
https://www.w3schools.com/mysql/mysql_limit.asp
https://www.w3schools.com/sql/sql_count.asp
https://owasp.org/www-community/attacks/xss/
