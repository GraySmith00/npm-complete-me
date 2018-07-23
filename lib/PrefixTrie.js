const Node = require('./Node');

class PrefixTrie {
  constructor() {
    this.wordCount = 0;
    this.rootNode = new Node();
  }

  insert(word) {
    const letters = [...word.toLowerCase()];
    let currNode = this.rootNode;

    letters.forEach(letter => {
      if (!(letter in currNode.children)) {
        currNode.children[letter] = new Node();
        currNode = currNode.children[letter];
      } else {
        currNode = currNode.children[letter];
      }
    });

    if (!currNode.endOfWord) {
      currNode.endOfWord = true;
      this.wordCount++;
    }
  }

  suggest(prefix) {
    const letters = [...prefix.toLowerCase()];
    let currNode = this.rootNode;
    const suggestions = [];

    for (let i = 0; i < letters.length; i++) {
      currNode = currNode.children[letters[i]];
      if (!currNode) {
        return [];
      }
    }

    addWords(prefix, currNode);

    function addWords(startingStr, node) {
      if (!Object.keys(node.children).length) {
        return;
      }
      Object.keys(node.children).forEach(key => {
        const newString = startingStr + key;

        if (node.children[key].endOfWord) {
          suggestions.push(newString);
        }

        addWords(newString, node.children[key]);
      });
    }

    return suggestions;
  }

  populate(words) {
    words.forEach(word => this.insert(word.toLowerCase()));
  }
}

module.exports = PrefixTrie;
