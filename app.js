$(document).ready(function() {
    // Specify a url, in this case our web server
    const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"
    pause = false;

    // Setting an interval for fetching
    setInterval(async function() {
        fetch(url)
        .then(res => res.json()) .then(data => {  
            // If not paused then refresh the tweets
            if(!pause){
                refreshTweets(data);
            }
        })
        .catch(err => {
            // Error catching
            console.log(err) 
        })
    }, 5000);
});

/*  
    Searching tweet content based on input
    
    @param (implicit): Takes in text input
    @return (implicit): Displays tweets that match the filter
*/
function searchTweets() {
    var input = document.getElementById('searchbar') //searchBar
    var filter = input.value.toLowerCase();
    var tweets = document.getElementsByClassName('content-middle') //tweets flexTweet

    for(var i = 0; i < tweets.length; i++){
        var a = tweets[i].getElementsByClassName('post-content')[0]; // tweetText
        var txtValue = a.textContent || a.innerText;
        if(txtValue.toLowerCase().indexOf(filter) > -1) {
            tweets[i].style.display = "";
        } else {
            tweets[i].style.display = "none";
        }
    }
}



var id = [];
const tweetContainer = document.getElementsByClassName("content-middle-wrapper"); //centerfeed
var flip = [];
var tweetArr = [];

/*  
    Searching tweet content based on input
    
    @param Tweets data from server
    @return Displays tweets fetched from server, sorted in order received
*/
function refreshTweets(tweets) {
    tweetStatus = tweets.statuses;

    // Remove previous tweets
    while (tweetContainer.firstChild){
        tweetContainer[0].removeChild(tweetContainer[0].firstChild);
    }

    // Create div to hold new data
    const tweetList = document.createElement("div");
    tweetContainer[0].appendChild(tweetList); //tweetList

    // For each tweet we get, put it in a larger div tag
    tweetStatus.forEach((tweet) => {
        // Do not display duplicates
        if(!id.includes(tweet.id_str)){
            id.push(tweet.id_str);

            // Create overall div for tweet
            var tweetElement = document.createElement("div");
            tweetElement.className = 'tweets';
            var tweetPicdiv = document.createElement("div");

            /* 
                Create image tag and assign it a URL, if it's a bad URL
                Default to Remy's profile picture if we have a bad image
            */
            const tweetPic = document.createElement("img");
            tweetPic.src = tweet.user.profile_image_url;
            // if(!URLError(tweet.user.profile_image_url)){
            //     tweetPic.src = 'images/ratatouille.jpg';
            // }
            
            // Add tweet to div and assign the class properties
            tweetPic.className = "tweetPic";
            tweetPicdiv.append(tweetPic);
            tweetPicdiv.className = "profile-middle"; //tweetPicContainer
            tweetElement.append(tweetPicdiv);

            // Add username in a span
            var tweetContent = document.createElement('div');
            var name = document.createElement('span');
            name.appendChild(document.createTextNode(tweet.user.name));
            name.className = 'username post-name'; //user-name tweetName
            tweetContent.className = 'post-box'; //tweetContentContainer
            tweetContent.append(name);

            // Concatenate date and username together in a span
            var tweetHandle = document.createElement('span');
            var createdDate = tweet.user.created_at.slice(4,10)
            tweetHandle.appendChild(document.createTextNode(' @' + tweet.user.screen_name + ' ' + createdDate + ' '));
            tweetHandle.className = 'tweetHandle';
            tweetContent.className = 'tweetContentContainer';
            tweetContent.append(tweetHandle);

            // Throw text into a p tag and then add all elements to tweetContent

            //div tag......
            //var tweetContent = document.createElement('div');
            //var name = document.createElement('span');
            name.appendChild(document.createTextNode(tweet.text));
            name.className = 'post-content'; //user-name tweetName
            tweetContent.className = 'tweetContentContainer'; //tweetContentContainer
            tweetContent.append(name);



            // var textp = document.createElement('p');
            // textp.appendChild(document.createTextNode(tweet.text));
            // textp.className = 'post-content'; // tweetText
            // tweetElement.append(textp);
            // tweetContent.append(textp);
            tweetElement.append(tweetContent);

            // Add data to global array
            tweetElement.className = 'content-middle'; //tweets flexTweet
            tweetArr.push(tweetElement);
        }
        //console.log(tweetArr.length);
    });

    // Sort given tweets based on order received, oldest tweet at the bottom
    for(var i = tweetArr.length-1; i >= 0; i--){
        tweetList.appendChild(tweetArr[i]);
        //console.log(tweetArr[i]);
    }
}