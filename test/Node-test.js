import { expect } from 'chai';
import Node from '../lib/Node';

describe('NODE', () => {
  let newNode;

  beforeEach(() => {
    newNode = new Node('burrito');
  });

  it('should exist', () => {
    expect(newNode).to.exist;
  });

  it('should have a endOfWord prop that defaults to false', () => {
    expect(newNode.endOfWord).to.equal(false);
  });

  it('should have a children prop that defaults to an empty object', () => {
    expect(newNode.children).to.deep.equal({});
  });
});
