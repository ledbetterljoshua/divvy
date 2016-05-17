# divvy

Divvy is an app that has three main purposes: 
---

1. Private saving of content on the web. If you wanted a place to save all the embarrassing songs on youtube that you love, you can  create a private group, and then save anything you want to it. This can be done using Pocket, or the new Spaces app by Google, but I would like for this to be a large part of the app, built in. 
2. Allow certain people to join your private groups, and allow them to contribute, and comment. This functionality is what spaces was built for. Pocket does not allow this. 
3. When creating a group, you have the option to make it public. Open groups like this should mirror something like a subreddit more than anything else. Anyone can join, contribute and talk about each link. This does not seem to be an option on Spaces yet, and is not at all an option on Pocket. This should be a major point. When you sign up, you get asked to join the most popupar groups. When you join a group, all new posts in that group will show up in timeline of sorts

---

###API
I am currently in the process of building out the API. Here are the end points so far: 

This get request will check if the URL passed to "u" is in the database. If it is, it will return data for that URL. If not, the site will be crawled, and then the data for the site will be returned in JSON format:
```javascript
/api/url/?u={{url}}
```
Example:
```JSON
/api/url?u=https://www.youtube.com/watch?v=ru0K8uYEZWw

{
__v: 0,
updated_at: "2016-05-17T21:41:03.188Z",
url: "https://www.youtube.com/watch?v=ru0K8uYEZWw",
image: "https://i.ytimg.com/vi/ru0K8uYEZWw/maxresdefault.jpg",
desc: "CANT STOP THE FEELING!” from the Original Motion Picture Trolls Official Music Video directed by Mark Romanek. Get it on iTunes: http://smarturl.it/CSTFi...",
title: "CANT STOP THE FEELING! (From DreamWorks Animations Trolls) (Official Video) - YouTube",
_id: "573b8fef5097313817ae1e0a",
created_at: "2016-05-17T21:41:03.182Z"
}
```


