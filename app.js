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
    var tweets = document.getElementsByClassName('content-middle') //tweets container from html content-middle

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
        // This checks duplicates
        if(!id.includes(tweet.id_str)){
            id.push(tweet.id_str);

            // var's used
            var tweetElement = document.createElement("div");           //div for the whole element
            var profilePictureDiv = document.createElement("div");       //div for profile pic
            var tweetBox = document.createElement('div');                  //div for the tweet box
            var name = document.createElement('span');                          //span for name 
            var screenName = document.createElement('div');                     //screen name will have both name + date
            var tweetDate = tweet.user.created_at.slice(4,10);                      //creating date var
            var tweetWords = document.createElement('p');                       //paragraph of the tweet

            //image element; FIXME*** some users dont have a pic
            
            const profilePicture = document.createElement("img");
            profilePicture.src = tweet.user.profile_image_url;
            profilePictureDiv.append(profilePicture);
            profilePictureDiv.className = "profile-middle";
            tweetElement.append(profilePictureDiv);

            //GET USERNAME append to our div
           
            name.appendChild(document.createTextNode(tweet.user.name));
            tweetBox.append(name);

            //  Make  profile date span adding to username
          
            screenName.appendChild(document.createTextNode(' @' + tweet.user.screen_name + ' ' + tweetDate + ' '));
            tweetBox.append(screenName);

            // TEXT
            
            tweetWords.appendChild(document.createTextNode(tweet.text));
            tweetWords.className = 'post-content';
            tweetBox.append(tweetWords);
            tweetElement.append(tweetBox);
            tweetElement.className = 'content-middle'; 
            tweetArr.push(tweetElement);
        }
    });

    // Sort by date
    
    
    //putting children into the array 
    for(var i = (tweetArr.length-1); i >= 0; i--){
        tweetList.appendChild(tweetArr[i]);
    }


}