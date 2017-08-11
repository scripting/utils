## daveutils package

### How to install

`npm install daveutils`

### The story

When I came to Node, three years ago, I started this file, utils.js, to put all the utility routines I knew I'd need. I've been programming a long time. And there are certain things you don't want to have to rewrite. So you put them in a file and when you need a new one you just add it to that file.

Then in April 2017 I got tired of including that file in all my projects. Not that I was replicating code, I wasn't. It was just a little bit more work than it had to be. So I made an NPM package out of it, so I could just do this:

`const utils = require ("daveutils");`

And include it in my package.json file, and that's that. 

And this is that package. 

Now you know the whole story! ;-)

PS: I wrote about daveutils <a href="http://scripting.com/2017/08/11.html#a092250">on my blog</a>. 

### Questions, comments

Please post an <a href="https://github.com/scripting/utils/issues">issue</a> here.

