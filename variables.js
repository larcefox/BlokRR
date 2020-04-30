var pageTagStart = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>BlockRedactor</title></head><body><div style = "position: relative; margin: 0 auto; padding: 10px;">',
pageTagEnd = '</div></body></html>';

var elementParams = {
    tag: document.createElement('p'),
    position: 'absolute',
    left: mouseX,
    top: mouseY,
    color: 'blue',
    fSize: 7,
    updateStyle: function() {this.tag.style = 'top:' + this.top + 'px;' + 'left:' + this.left + 'px;' + 'position: ' + this.position + ';' + 'font-size:' + this.fSize + 'px;' + 'color:' + this.color + ';';
    this.tag.id = 'elementParams';
    console.log('top:' + this.top + 'px;' + 'left:' + this.left + 'px;' + 'position: ' + this.position + ';' + 'font-size:' + this.fSize + 'px;' + 'color:' + this.color + ';');
                                }
}