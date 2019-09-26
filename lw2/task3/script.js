var myIframe = document.getElementsByTagName('iframe');
var comment = document.querySelectorAll('div.comment-id');
let link = ['https://www.youtube.com/embed/7wB2GVWodiA', 'https://www.youtube.com/embed/Fssfi8ziVdw', 'https://www.youtube.com/embed/fhXQzPDO8d0', 'https://www.youtube.com/embed/vhaqnndhGRw'];
function video(e) {
  myIframe[0].src = link[e];
  if (comment[e].className !== 'comment-id') {
    for (let i = 0; i < comment.length; i++) {
      comment[i].className = 'comment-id comment-id-none';
    }
    comment[e].className = 'comment-id';
  }

};
