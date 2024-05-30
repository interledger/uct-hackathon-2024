# Donation page template

This is a basic HTML (and CSS) template for a donation page and a thank you page (after someone has made the donation). Feel free to customise and change the content and images to suit your preferences. Or not. You're here to hack on Open Payments, not learn web development (although it would be nice if you gave it a shot). Do whatever makes you happy.

## Local development

1. Clone this repo to your local computer:

   ```shell
   $ git clone https://github.com/interledger/uct-hackathon-2024.git
   ```

2. Run a web server out of the folder you cloned the files into. If you do not have web server on your local machine, this repository comes with a very basic node-based server:

   ```shell
   $ node server.js
   ```

   The default port is `2000` but you can pass in any other port number you want, for example:

   ```shell
   $ node server.js 5432
   ```

3. The main page is `index.html`, which contains the form needed to submit the visitor's wallet address and donation amount. The `success.html` page says thank you to the person who submitted their donation successfully.

4. All styles go into the `styles.css` file. If you just want to change the font or colors, swap out the theme variables with your own choices. Otherwise, feel free to add or remove stuff, as long as your payment goes through, everything else is just aesthetics. Have fun!
