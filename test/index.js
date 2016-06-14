const { expect } = require('chai')
const smsg = require('../lib/index')

describe('smsg', function () {
  describe('smsg#_attachment', function () {
    it('returns a valid image attachment', function () {
      let x = smsg._attachment('image', 'https://www.images.com/image.png')
      expect(x).to.deep.equal({
        attachment: {
          type: 'image',
          payload: {
            url: 'https://www.images.com/image.png'
          }
        }
      })
    })

    it('returns a valid button template attachment', function () {
      let x = smsg._attachment('template/button', 'Press a button:', [
        { a: 'a' },
        { b: 'b' }
      ])

      expect(x).to.deep.equal({
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: 'Press a button:',
            buttons: [
              { a: 'a' },
              { b: 'b' }
            ]
          }
        }
      })
    })

    it('returns a valid generic template attachment', function () {
      let x = smsg._attachment('template/generic', [
        { a: 'a' },
        { b: 'b' },
        { c: 'c' }
      ])

      expect(x).to.deep.equal({
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [
              { a: 'a' },
              { b: 'b' },
              { c: 'c' }
            ]
          }
        }
      })
    })

    it('returns a valid receipt template attachment', function () {
      let x = smsg._attachment('template/receipt', { blah: 'blah', elements: [ 'one' ] })

      expect(x).to.deep.equal({
        attachment: {
          type: 'template',
          payload: {
            template_type: 'receipt',
            blah: 'blah',
            elements: [
              'one'
            ]
          }
        }
      })
    })
  })

  describe('smsg#button_template', function () {
    it('returns a valid button template attachment', function () {
      let x = smsg.button_template('Press a button:', [
        {
          type: 'postback',
          title: 'Button 1',
          payload: 'PAYLOAD_1'
        },
        {
          type: 'web_url',
          title: 'Button 2',
          payload: 'PAYLOAD_2'
        }
      ])

      expect(x).to.deep.equal({
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: 'Press a button:',
            buttons: [
              {
                type: 'postback',
                title: 'Button 1',
                payload: 'PAYLOAD_1'
              },
              {
                type: 'web_url',
                title: 'Button 2',
                payload: 'PAYLOAD_2'
              }
            ]
          }
        }
      })
    })

    it('returns a valid button template attachment given a single button object', function () {
      let x = smsg.button_template('Press a button:', {
        type: 'postback',
        title: 'Button 1',
        payload: 'PAYLOAD_1'
      })

      expect(x).to.deep.equal({
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: 'Press a button:',
            buttons: [
              {
                type: 'postback',
                title: 'Button 1',
                payload: 'PAYLOAD_1'
              }
            ]
          }
        }
      })
    })
  })

  describe('smsg#generic_template', function () {
    it('returns a valid generic template attachment', function () {
      let x = smsg.generic_template([
        {
          a: 'a',
          b: 'b',
          c: 'c'
        },
        {
          d: 'd',
          e: 'e',
          f: 'f'
        }
      ])

      expect(x).to.deep.equal({
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [
              {
                a: 'a',
                b: 'b',
                c: 'c'
              },
              {
                d: 'd',
                e: 'e',
                f: 'f'
              }
            ]
          }
        }
      })
    })

    it('returns a valid button template attachment given a single element object', function () {
      let x = smsg.generic_template({
        a: 'a',
        b: 'b',
        c: 'c'
      })

      expect(x).to.deep.equal({
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [
              {
                a: 'a',
                b: 'b',
                c: 'c'
              }
            ]
          }
        }
      })
    })
  })

  describe('smsg#image', function () {
    it('returns a valid image attachment', function () {
      let x = smsg.image('http://www.images.com/image.png')

      expect(x).to.deep.equal({
        attachment: {
          type: 'image',
          payload: {
            url: 'http://www.images.com/image.png'
          }
        }
      })
    })
  })

  describe('smsg#postback', function () {
    it('returns a valid postback button', function () {
      let x = smsg.postback('Button 1', 'PAYLOAD_1')

      expect(x).to.deep.equal({
        title: 'Button 1',
        type: 'postback',
        payload: 'PAYLOAD_1'
      })
    })
  })

  describe('smsg#text', function () {
    it('returns a valid text message', function () {
      let x = smsg.text('this is text')

      expect(x).to.deep.equal({
        text: 'this is text'
      })
    })
  })

  describe('smsg#web_url', function () {
    it('returns a valid web_url button', function () {
      let x = smsg.web_url('Button 1', 'https://www.example.com')

      expect(x).to.deep.equal({
        title: 'Button 1',
        type: 'web_url',
        url: 'https://www.example.com'
      })
    })
  })
})
