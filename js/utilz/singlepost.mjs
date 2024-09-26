
export function createBlogContainer(blogPost) {
    // Create the main container div
    const { title, body, media = {}, created, tags, author } = blogPost;
    const blogContainer = document.createElement('div');
    blogContainer.classList.add('blog-container');

    // Create the img element
    const imgElement = document.createElement('img');
    imgElement.classList.add('single-post-img');
    imgElement.src = media && media.url ? media.url : 'https://media.istockphoto.com/id/1356933529/photo/futuristic-technology-wave-digital-cyberspace-abstract-wave-with-moving-particles-on.jpg?s=2048x2048&w=is&k=20&c=mQlLO3TqcbeiYTZPiCmsc0Tff-hIGsYwEFzCu272T8M='; // Set image source, fallback to empty if not provided
    imgElement.alt= media && media.alt ? media.alt : 'technology-wave-digital-cyberspace-abstract-wave-with-moving-particles'

    // Append the img to the container
    blogContainer.appendChild(imgElement);

    // Create the title wrapper div
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('title-wrapper');

    // Create the h1 element
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;  
     
    // Create the share button
    const shareButton = document.createElement('button');
    shareButton.type = 'button';
    shareButton.classList.add('share-btn');
    shareButton.addEventListener('click' , async function(){
        try{
          const url = window.location.href
          await navigator.clipboard.writeText(url)
          shareMsg.style.display= 'block'
         setTimeout(() => {
            shareMsg.style.display= 'none'
         }, 2000);
        }
        
       catch (error){
        console.error('error copying to clipboard', error)
       }
      
      
      })
   const shareMsg = document.createElement('b');
   shareMsg.classList.add('copy-msg')
   shareMsg.textContent = 'copied'
   shareButton.appendChild(shareMsg);
      

    // Create the img inside the button
    const shareIcon = document.createElement('img');
    shareIcon.src = '../assets/share-link.png';  
    shareIcon.alt = '';  

    // Append the share icon to the button
    shareButton.appendChild(shareIcon);

    // Append the title and button to the title wrapper
    titleWrapper.appendChild(titleElement);
    titleWrapper.appendChild(shareButton);

    // Append the title wrapper to the container
    blogContainer.appendChild(titleWrapper);

    // Create the author-date div
    const authorDate = document.createElement('div');
    authorDate.classList.add('author-date');

    // Create the date paragraph
    const dateElement = document.createElement('p');
    dateElement.textContent = created.slice(0,10); 

    // Create the author paragraph
    const authorElement = document.createElement('p');
    authorElement.textContent = author.name;  

    // Append the date and author to the author-date div
    authorDate.appendChild(dateElement);
    authorDate.appendChild(authorElement);

    // Append the author-date div to the container
    blogContainer.appendChild(authorDate);

    // Create the paragraph
    const paragraph = document.createElement('p');
    paragraph.innerHTML = body.replace(/\n/g, "<br>");; 

    // Append the paragraph to the container
    blogContainer.appendChild(paragraph);

    // Finally, return the constructed blog container
    return blogContainer;
}


