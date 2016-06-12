# smsg
[![Travis](https://img.shields.io/travis/krismuniz/smsg.svg?style=flat-square)](https://travis-ci.org/krismuniz/smsg)
[![Code-Style:Standard](https://img.shields.io/badge/code%20style-standard-green.svg?style=flat-square)](http://standardjs.com/)
[![License:MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)

`smsg` is a simple library for constructing structured messages (with attachments) for the Messenger Platform Send API.

> `smsg` is a shortening of the term `structured message`

## Use Cases

You can use `smsg` to quickly build:

* `button template` attachments
* `generic template` attachments
* `image` attachments
* `postback` buttons
* `web_url` buttons

## Installation

Installing `smsg` is as simple as installing any other [npm](https://npmjs.com) module:

```shell
$ npm install smsg --save
```

## Usage

#### Quick Example A: Build an image attachment

```js
import smsg from 'smsg'

smsg.image('https://www.images.com/image-1.png')
```

Outputs the following `message` object:

```js
{
  attachment: {
    type: 'image',
    payload: {
      url: 'https://www.images.com/image-1.png'
    }
  }
}
```

#### Quick Example B: Build button template attachment

```js
import smsg from 'smsg'

smsg.button_template('What do you want?', [
  smsg.postback('See Products', 'SEE_PRODUCTS'),
  smsg.postback('Donate Money', 'DONATE'),
  smsg.web_url('See Website', 'https://www.example.com')
])
```

Outputs the following `message` object:

```js
{
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'What do you want?',
      buttons: [
        {
          title: 'See Products',
          type: 'postback',
          payload: 'SEE_PRODUCTS'
        },
        {
          title: 'Donate Money',
          type: 'postback',
          payload: 'DONATE'
        },
        {
          title: 'See Website',
          type: 'web_url',
          url: 'https://www.example.com'
        }
      ]
    }
  }
}
```

## Reference

#### smsg#button_template

Builds a button template attachment.

```js
smsg.button_template(text, buttons)
```

| Parameter | Type | Description | Required
|--- |--- |--- | ---
| `text` | String | Text that appears in main body | Yes
| `buttons` | Array | Set of buttons that appear as call-to-actions | Yes

#### smsg#generic_template

Builds a generic template attachment.

```js
smsg.generic_template(elements)
```

| Parameter | Type | Description | Required
|--- |--- |--- | ---
| `elements` | Array | Data for each bubble in message | Yes

#### smsg#image

Builds an image attachment.

```js
smsg.image(url)
```

| Parameter | Type | Description | Required
|--- |--- |--- | ---
| `url` | String | URL of image | Yes

#### smsg#postback

Builds a postback button.

```js
smsg.postback(title, payload)
```

| Parameter | Type | Description | Required
|--- |--- |--- | ---
| `title` | String | Button title | Yes
| `payload` | String | This data will be sent back to you via webhook | Yes

#### smsg#web_url

Builds a web_url button (link).

```js
smsg.web_url(title, url)
```

| Parameter | Type | Description | Required
|--- |--- |--- | ---
| `title` | String | Button title | Yes
| `url` | String | This URL is opened in a browser when the button is tapped | Yes

## Contributing

#### Running Tests

First, install dev dependencies. Then, run `npm test`

```bash
$ npm install
$ npm test
```

#### Bug Reports & Feature Requests

Something does not work as expected or perhaps you think this module needs a feature? Please [open an issue](https://github.com/krismuniz/smsg/issues/new) using GitHub's [issue tracker](https://github.com/krismuniz/smsg/issues). Please be as specific and straightforward as possible.

#### Developing

Pull Requests (PRs) are welcome. Make sure you follow the same basic stylistic conventions as the original code (i.e. ["JavaScript standard code style"](http://standardjs.com))

## License

[The MIT License (MIT)](http://opensource.org/licenses/MIT)

**Copyright (c) 2016 [Kristian Muñiz](https://www.krismuniz.com)**
