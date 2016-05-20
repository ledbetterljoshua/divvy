# divvy

###### Divvy is an app that has three main purposes: 
---

1. Private saving of content on the web. If you wanted a place to save all the embarrassing songs on youtube that you love, you can  create a private group, and then save anything you want to it. This can be done using Pocket, or the new Spaces app by Google, but I would like for this to be a large part of the app, built in. 
2. Allow certain people to join your private groups, and allow them to contribute, and comment. This functionality is what spaces was built for. Pocket does not allow this. 
3. When creating a group, you have the option to make it public. Open groups like this should mirror something like a subreddit more than anything else. Anyone can join, contribute and talk about each link. This does not seem to be an option on Spaces yet, and is not at all an option on Pocket. This should be a major point. When you sign up, you get asked to join the most popupar groups. When you join a group, all new posts in that group will show up in timeline of sorts

---

###API
I am currently in the process of building out the API. Here are the end points so far: 

###### URL API
This GET request will check if the URL passed to "u" query is in the database. If it is, it will return data for that URL. If not, the site will be crawled, and then the data for the site will be returned in JSON format. Thia sould be used for previewing of a new post.
```JSON
/api/url/?u=:url
```
Example url and returned data:
```JSON
/api/url?u=https://www.youtube.com/watch?v=ru0K8uYEZWw

{
__v: 0,
updated_at: "2016-05-17T21:41:03.188Z",
url: "https://www.youtube.com/watch?v=ru0K8uYEZWw",
image: "https://i.ytimg.com/vi/ru0K8uYEZWw/maxresdefault.jpg",
desc: "CANT STOP THE FEELING! from the Original Motion Picture Trolls Official Music Video directed by Mark Romanek. Get it on iTunes: http://smarturl.it/CSTFi...",
title: "CANT STOP THE FEELING! (From DreamWorks Animations Trolls) (Official Video) - YouTube",
_id: "573b8fef5097313817ae1e0a",
created_at: "2016-05-17T21:41:03.182Z"
}
```
TODO: get more info from webcrawl. 
TODO: if url is in the database for more than two days, crawl webpage again and update data

idea: when crawling a page, do what good does. Collect all the links, and check if they link to other websites or pages. All the other webpages gathered should be crawled, and then added to the url model in the database as "related pages". So, in the app, you could be watching a youtube video, and then you would get a list of all the related videos. These pages would need to be ranked. 

###### Search API
___

```JSON
/api/search/?all=searchTerm&limit=20&skip=20
```

This will return all results that match the searchTerm. You will get back the following objects: 
users, otherGroups, otherPosts, myGroups, myPosts. otherGroups and otherPosts will hold other peoples posts and groups, and they will all be public. myGroups and myPosts returns all of the current users posts and groups, and they will be private and public. 


###### Posts API
___

This GET request will return the most popular posts:
```JSON
/api/posts/trending
```
This is not user specific. Each post has an attribute called popularity, which is a number. The number grows each time the post is viewed, and each time someone comments on that post.  
`Pagination`
Use the limit query to limit how many results you get back, and the skip query to skip over results. 
```JSON
/api/posts/trending?limit=20&skip=20
```
___
This GET request will return return all posts within a specific group:
```JSON
/api/groups/:group/posts
```
`Pagination`
User the limit query to limit how many results you get back. Use the createdAtBefore query. 
```JSON
/api/groups/:group/posts?limit=20&createdAtBefore=2016-05-20T00:03:20.862Z
```
The reason to use createdAtBefore is stated here: http://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js

Initial Use: 
```javascript
/api/groups/:group/posts?limit=20&createdAtBefore=new Date()
```
To get the second page: 
```javascript
/api/groups/:group/posts?limit=20&createdAtBefore=results[results.length-1].created_at
```
___
This GET request will return all posts for the currently logged in user. If you are not logged in when making hitting this end point you will get an error. Pagination is the same as /api/groups/:group/posts
```JSON
/api/posts
```
___
This GET request will return posts for the user whose id is passed to the url. Pagination is the same as /api/groups/:group/posts
```JSON
/user/:uname/posts
```
___
This GET request will return information on a specific post, along with sending back the most 20 recent comments for the post. 
```JSON
/api/post/:id
```
___
This POST request will save a post for a specific user. Favorited posts will be private by default. 
```JSON
/post/:id/favorite
```
___
This POST request will either update a current post, or create a new one, depending on whether or not you send an ID in the request body. If it creates a new post, the /api/url endpoint will be hit automatically, and add the data to the post.
```JSON
/api/posts/
```
___
This DELETE request will delete a single post. Simply pass the ID of the post you want to delete to the end of the URL.
```JSON
/api/post/:id
```
___
###### Groups API
___
This GET request will return the moat popular groups:
```JSON
/api/groups/trending
```
This is not user specific. Each group has an attribute called popularity, which is a number. The number grows each time the group is viewed, and each time time someone adds a new post to the group.  
`Pagination`
Use the limit query to limit how many results you get back, and the skip query to skip over results. 
```JSON
/api/posts/trending?limit=20&skip=20
```
___
