// Instagram Widget
// Written by Jane Schwab 
// https://github.com/schwabthedeck
// https://janeschwab.co/
// July 2019 
// Update instagramUsername to change what account is shown

var instagramUsername = 'minneyandmaxthecats'
function GetLatestPost() {
  var url = 'https://www.instagram.com/' + instagramUsername + '/?__a=1';
  $.ajax({
    url: url,
    type: 'GET',
    success: onQuerySucceeded,
    error: onQueryFailed
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function onQuerySucceeded(data) {
  // need to build the content for the web part
  var userInformation = data.graphql.user;
  var latestPost = userInformation.edge_owner_to_timeline_media.edges[0].node;
  var embedUrlRedirect = 'https://www.instagram.com/' + instagramUsername + '/?utm_source=ig_embed'

  // header
  var headerHTML = document.getElementsByClassName('header')[0];
  var headerInnerHTML = '' +
    '<div class="avatarContainer">' +
    '<a href="' + embedUrlRedirect + '" target="_blank">' +
    '<img src="' + userInformation.profile_pic_url + '" alt="' + instagramUsername + '">' +
    '</a>' +
    '</div>' +
    '<div class="headerTextContainer">' +
    '<a href="' + embedUrlRedirect + '" target="_blank">' +
    '<span class="username">' + instagramUsername + '</span>' +
    '</a>' +
    '<div class="followerCount">' +
    '<span>' + numberWithCommas(userInformation.edge_followed_by.count) + ' followers</span>' +
    '</div>' +
    '</div>' +
    '<div class="viewProfileButtonContainer">' +
    '<a class="ViewProfileButton" href="' + embedUrlRedirect + '">View Profile</a>' +
    '</div>' +
    '';
  headerHTML.innerHTML = headerInnerHTML;

  // imageContent
  var imageContentHTML = document.getElementsByClassName('imageContent')[0];
  var imageContentInnerHTML = '' +
    '<a href="' + embedUrlRedirect + '" target="_blank">' +
    '<img src="' + latestPost.thumbnail_src + '" alt="' + latestPost.accessibility_caption + '">' +
    '</a>' +
    '';
  imageContentHTML.innerHTML = imageContentInnerHTML;

  // hoverCard
  var hoverCardHTML = document.getElementsByClassName('hoverCard')[0];
  var hoverCardInnerHTML = '' +
    '<div class="primaryText">' +
    '<a href="' + embedUrlRedirect + '" target="_blank">View More on Instagram</a>' +
    '</div>' +
    '';
  hoverCardHTML.innerHTML = hoverCardInnerHTML;

  // likes
  var likesHTML = document.getElementsByClassName('likes')[0];
  var likesInnerHTML = '' +
    '<a href="' + embedUrlRedirect + '" target="_blank">' + numberWithCommas(latestPost.edge_liked_by.count) + ' likes</a>' +
    '';
  likesHTML.innerHTML = likesInnerHTML;

  // caption
  var captionHTML = document.getElementsByClassName('instagramCaption')[0];
  var captionInnerHTML = '' +
    '<a href="' + embedUrlRedirect + '" target="_blank">' + instagramUsername + '</a>' +
    '<br><br>' + latestPost.edge_media_to_caption.edges[0].node.text +
    '';
  captionHTML.innerHTML = captionInnerHTML;
}

function onQueryFailed(data) {
  var errorContainer = document.getElementsByClassName('error')[0];
  errorContainer.innerHTML = '<div>An error occured while retrieving ' + instagramUsername + '\'s latest post.</div><div>To view the latest posts, click <a href="https://www.instagram.com/' + instagramUsername + '" target="_blank">here</a> to view ' + instagramUsername + '\'s profile.</div>';
}

GetLatestPost();