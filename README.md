# node_course
node course q1 2020

Udemy: Complete NodeJS Developer Course

    https://www.udemy.com/course/the-complete-nodejs-developer-course-2
By Andew Mead @ mead.io

    https://mead.io/

Weather app built from course, running on Heroku

    https://bengordon-weather-application.herokuapp.com/

---

# Git commands
Add all files to stage
>git add .
Commit files with comment about the changes
>git commit -m "setup app for heroku"
Push changes to master branch in github
>git push

Sets the Heroku remote in parallel with github
>heroku git:remote -a bengordon-weather-application

This doesn't work because the web-server app is in a sub folder of the entire class git.  The class had only setup the web-server app as a git.  I setup the entire project folder.  When it tried to push the entire project folder, it couldn't find a package.json file at the root to understand how to deploy and run the app.
>git push heroku master

push the webserver sub-tree
>git subtree push --prefix web-server/ heroku master

Deploying subtree of git project to heroku

    https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f


## Cleaning information from a git

    https://help.github.com/en/github/authenticating-to-github/removing-sensitive-data-from-a-repository
    https://gist.github.com/vinnie357/f73daf15585ec586e0307090cb9a66ae 

---

# node install mgmt

Was running node v12 LTS, but ran into the following error, had to downgrade to v10
https://dev.to/only8britt/referenceerror-primordials-is-not-defined-140a


http://amcositsupport.blogspot.com/2016/07/to-completely-uninstall-node-js-from.html
https://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo
https://github.com/nvm-sh/nvm
https://geekflare.com/nodejs11-installation-guide/





