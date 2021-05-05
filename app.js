$(document).ready(function() {
    // specify a url, in this case our web server
    const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather";
   
    setInterval(async function() {
        fetch(url)  
        .then(res => res.json()) .then(data => {  
        // do something with data
            for(let i = 0; i < 5; i++) {
                document.getElementsByClassName("post-content")[i].innerHTML = data.statuses[i].text;
                //console.log(data.statuses[i].text);
                //gets data from json at first element
                document.getElementsByClassName("post-name")[i].innerHTML = data.statuses[i].user.name; //tweetName taken out
                //console.log(data.statuses[i].user.created_at);
                //second element: username
                var date = data.statuses[i].user.created_at.slice(4,10);
                //date = date.slice(4, 10);
                //console.log(date);
                document.getElementsByClassName("post-tag")[i].innerHTML = ' @' + data.statuses[i].user.screen_name + ' ' + date;
                //console.log(document.getElementsByClassName("tweetHandle")[1].innerHTML);
                document.getElementsByClassName("profile-middle")[i].src = data.statuses[i].user.profile_image_url;
            }
    
        }, 5000);

    })
    .catch(err => {
        // error catching
    console.log(err) }) 


});


/* event listener  (searchbar) */

let searchString = "" // here we use a global variable

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase();
    
    removeAllChildNodes(document.getElementsByClassName("flex-child content-center")[0]);
    
    for (let i = 0; i < our_data.length; ++i) {
        if (our_data[i].text.toLowerCase().includes(searchString)) {
            create_elements(our_data[i]);
        }
    }


    // you may want to update the displayed HTML here too
}
document.getElementById("searchBar").addEventListener("input", handleSearch)



/* Say you have a <div> with id 'tweet-container' in your HTML file 
and all your tweet objects with duplicates removed are stored in the 
tweets variable. Then, in JavaScript you could do something like this: */

const tweetContainer = document.getElementsByClassName('content-middle');

/**
 * Removes all existing tweets from tweetList and then append all tweets back in
 *
 * @param {Array<Object>} tweets - A list of tweets
 * @returns None, the tweets will be renewed
 */



function refreshTweets(tweets) {
    // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
    // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
    t_status = tweets.statuses;

    while (tweetContainer.firstChild) {
        tweetContainer[0].removeChild(tweetContainer[0].firstChild);
    }

    // create an unordered list to hold the tweets
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
    const tweetList = document.createElement("div");
    // append the tweetList to the tweetContainer
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
    tweetContainer[0].appendChild(tweetList);

    // all tweet objects (no duplicates) stored in tweets variable
    
    t_status.forEach((tweet) => {
        var tweetInside = document.createElement("div");
        tweetInside.className = 'tweets';
        var tweetPicContainer = document.createElement("div");
        var tweetPic = document.createElement("img")


    });

    // filter on search text
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
    const filteredResult = tweets.filter(...);
    // sort by date
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    const sortedResult = filteredResult.sort(compareDate); 

    // execute the arrow function for each tweet
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
    sortedResult.forEach(tweetObject => {
        // create a container for individual tweet
        const tweet = document.createElement("li");

        // e.g. create a div holding tweet content
        const tweetContent = document.createElement("div");
        // create a text node "safely" with HTML characters escaped
        // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
        const tweetText = document.createTextNode(tweetObject.text);
        // append the text node to the div
        tweetContent.appendChild(tweetText);

        // you may want to put more stuff here like time, username...
        tweet.appendChild(tweetContent);

        // finally append your tweet into the tweet list
        tweetList.appendChild(tweet);
    });
}

function compare(a,b) {
    if()
}