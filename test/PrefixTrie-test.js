import { expect } from 'chai';
import PrefixTrie from '../lib/PrefixTrie';
import fs from 'fs';

describe('Instantiate PrefixTrie', () => {
  let newTrie;

  beforeEach(() => {
    newTrie = new PrefixTrie();
  });

  it('should create a new trie instance', () => {
    expect(newTrie).to.exist;
  });

  it('should have a rootNode', () => {
    expect(newTrie.rootNode).to.deep.equal({
      endOfWord: false,
      children: {}
    });
  });
});

describe('Insert Method', () => {
  let newTrie;

  beforeEach(() => {
    newTrie = new PrefixTrie();
  });

  it('should have an insert method', () => {
    expect(newTrie).respondsTo('populate');
  });

  it('should add node when a word is inserted if not already present', () => {
    newTrie.insert('tie');
    expect('t' in newTrie.rootNode.children).to.equal(true);
    expect('i' in newTrie.rootNode.children['t'].children).to.equal(true);
  });

  it('should not add a child node if that letter already exists', () => {
    newTrie.insert('truck');
    newTrie.insert('try');
    newTrie.insert('true');
    newTrie.insert('tree');
    newTrie.insert('trees');
    newTrie.insert('train');

    const occurances = Object.keys(newTrie.rootNode.children).filter(key => {
      return key === 't';
    });

    expect('t' in newTrie.rootNode.children).to.equal(true);
    expect('r' in newTrie.rootNode.children['t'].children).to.equal(true);
    expect(occurances.length).to.equal(1);
  });

  it('should increment the word count if a new word is inserted', () => {
    newTrie.insert('truck');
    expect(newTrie.wordCount).to.equal(1);
  });

  it('should not increment word count if inserted word already exists', () => {
    newTrie.insert('truck');
    newTrie.insert('truck');
    expect(newTrie.wordCount).to.equal(1);
  });
});

describe('Suggest Method', () => {
  let newTrie;

  beforeEach(() => {
    newTrie = new PrefixTrie();
  });

  it('should have a suggest method', () => {
    expect(newTrie).respondsTo('suggest');
  });

  it('should return an empty array if no words starting with prefix', () => {
    newTrie.insert('truck');
    newTrie.insert('try');
    newTrie.insert('true');
    newTrie.insert('tree');
    newTrie.insert('trees');
    newTrie.insert('train');

    expect(newTrie.suggest('tx')).to.deep.equal([]);
  });

  it('should return an array of all words starting with the prefix', () => {
    newTrie.insert('to');
    newTrie.insert('tie');
    newTrie.insert('tree');
    newTrie.insert('trees');
    newTrie.insert('train');
    newTrie.insert('trucker');

    expect(newTrie.suggest('t')).to.deep.equal([
      'to',
      'tie',
      'tree',
      'trees',
      'train',
      'trucker'
    ]);

    expect(newTrie.suggest('tr')).to.deep.equal([
      'tree',
      'trees',
      'train',
      'trucker'
    ]);
  });
});

describe('Populate method', () => {
  let newTrie;

  beforeEach(() => {
    newTrie = new PrefixTrie();
  });

  it('should have a Populate method', () => {
    expect(newTrie).respondsTo('populate');
  });

  it('should insert an array of words when calling the populate method', () => {
    const path = '/usr/share/dict/words';
    const dictionary = fs
      .readFileSync(path)
      .toString()
      .trim()
      .split('\n');

    newTrie.populate(dictionary);
    expect(newTrie.suggest('wizardis')).to.deep.equal(['wizardism']);
  });

  it('should increase the word count when populating', () => {
    const path = '/usr/share/dict/words';
    const dictionary = fs
      .readFileSync(path)
      .toString()
      .trim()
      .split('\n');

    newTrie.populate(dictionary);
    expect(newTrie.wordCount).to.equal(234371);
  });
});
