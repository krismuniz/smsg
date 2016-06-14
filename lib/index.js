'use strict'

const _attachment = function () {
  let type = arguments[0].split('/')
  let text = typeof arguments[1] === 'string' ? arguments[1] : ''
  let buttons = arguments[2] instanceof Array ? arguments[2] : []
  let elements = arguments[1] instanceof Array ? arguments[1] : []

  let att = {}

  if (type[0] === 'image') {
    att = {
      type: 'image',
      payload: {
        url: text
      }
    }
  } else if (type[0] === 'template') {
    switch (type[1]) {
      case 'button':
        att = {
          type: 'template',
          payload: {
            template_type: 'button',
            text: text,
            buttons: buttons
          }
        }
        break
      case 'generic':
        att = {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: elements
          }
        }
        break
      default:
        att = {
          type: type[0],
          payload: arguments[1]
        }
        att.payload.template_type = type[1]
    }
  }

  return {
    attachment: att
  }
}

const web_url = function (title, url) {
  return {
    title: title,
    url: url,
    type: 'web_url'
  }
}

const postback = function (title, payload) {
  if (typeof title !== 'string') {
    throw TypeError(`[smsg#postback] 'title' must be a string.`)
  }

  if (typeof payload !== 'string') {
    throw TypeError(`[smsg#postback] 'payload' must be a string.`)
  }

  return {
    title: title,
    payload: payload,
    type: 'postback'
  }
}

const generic_template = function (elements) {
  if (typeof elements !== 'object') {
    throw TypeError(`[smsg#generic_template] 'elements' must be an array or an object (for single elements).`)
  }

  elements = elements instanceof Array ? elements : [elements]

  return _attachment('template/generic', elements)
}

const image = function (url) {
  if (typeof url !== 'string') {
    throw TypeError(`[smsg#image] 'url' must be a string.`)
  }

  return _attachment('image', url)
}

const button_template = function (text, buttons) {
  if (typeof text !== 'string') {
    throw TypeError(`[smsg#image] 'text' must be a string.`)
  }

  if (typeof buttons !== 'object') {
    throw TypeError(`[smsg#button_template] 'buttons' must be an array or an object (for single buttons).`)
  }

  buttons = buttons instanceof Array ? buttons : [buttons]

  return _attachment('template/button', text, buttons)
}

module.exports = {
  _attachment: _attachment,
  button_template: button_template,
  generic_template: generic_template,
  image: image,
  postback: postback,
  web_url: web_url
}
