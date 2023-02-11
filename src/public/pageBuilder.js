export default class PageBuilder{
    createPage(content){

    }

    addElement(content, parent){
        let newElement = document.createElement('p');
        newElement.textContent = content;
        parent.appendChild(newElement);
    }
}