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

//function for pause that changes my pause variable. Will alert user to know whether first click to pause or click to resume
function pauseFunction(){
    pause = !pause; //first switch pause to !pause. prev false, onclick will now be true
    if (pause == true){
        alert("Pause Clicked. Click the pause button again to resume!")

    }else {
        alert("Resumed")
    }
}



/*  
    Search for tweets using user-inputted filter.
    Goes away with tweet refresh unless you pause.
    
    @param: user text input (implicit)
    @return: tweets that contain user input (implicit)
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

function URLError(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return (http.status != 404);
}

var id = [];
const tweetContainer = document.getElementsByClassName("content-middle-wrapper"); //centerfeed
var flip = [];
var tweetArr = [];



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
            var profilePictureDiv = document.createElement("div");

            //image element; FIXME*** some users dont have a pic
            const profilePicture = document.createElement("img");
            profilePicture.src = tweet.user.profile_image_url;
            profilePicture.className = "profilePicture";
            profilePictureDiv.append(profilePicture);
            profilePictureDiv.className = "profile-middle";
            tweetElement.append(profilePictureDiv);

            //USERNAME
            var tweetBox = document.createElement('div');
            var name = document.createElement('span');
            name.appendChild(document.createTextNode(tweet.user.name));
            name.className = 'username post-name';
            tweetBox.className = 'post-box'; 
            tweetBox.append(name);

            //  Make  profile date span
            var screenName = document.createElement('div');
            var tweetDate = tweet.user.created_at.slice(4,10)
            screenName.appendChild(document.createTextNode(' @' + tweet.user.screen_name + ' ' + tweetDate + ' '));
            screenName.className = 'screenName';
            tweetBox.className = 'tweetBoxContainer';
            tweetBox.append(screenName);

            // TEXT
            var tweetWords = document.createElement('p');
            tweetWords.appendChild(document.createTextNode(tweet.text));
            tweetWords.className = 'post-content';
            tweetBox.className = 'tweetBoxContainer';
            tweetBox.append(tweetWords);
            tweetElement.append(tweetBox);
            tweetElement.className = 'content-middle'; 
            tweetArr.push(tweetElement);
        }
    });

    // Sort by date




    //putting children into the one big array that will keep adding onto 
    for(var i = (tweetArr.length-1); i >= 0; i--){
        tweetList.appendChild(tweetArr[i]);
    }


}