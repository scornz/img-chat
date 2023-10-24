<h1 align="left">img-chat</h1>

<p>
  <a href="https://github.com/scornz/img-chat/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  </br>
  <a href="https://github.com/scornz" target="_blank">
    <img alt="Github" src="https://img.shields.io/badge/GitHub-@scornz-white.svg" />
  </a>
  <a href="https://github.com/piercemaloney" target="_blank">
    <img alt="Github" src="https://img.shields.io/badge/GitHub-@piercemaloney-white.svg" />
  </a>
  <a href="https://github.com/HKnoll42" target="_blank">
    <img alt="Github" src="https://img.shields.io/badge/GitHub-@hknoll42-white.svg" />
  </a>
  <a href="https://github.com/ava-cr" target="_blank">
    <img alt="Github" src="https://img.shields.io/badge/GitHub-@avacr-white.svg" />
  </a>
  </br>
  <a href="https://linkedin.com/in/mscornavacca" target="_blank">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-@mscornavacca-blue.svg" />
  </a>
</p>

> An AI conversational image generation tool created for Human-Computer Interaction (COS436) at Princeton University, in F'23.

## Introduction

Our study aims to bridge the gap between AI image generation and its users, making the process more accessible and intuitive. Building upon the theories of shared context and repair strategies, we've implemented a conversational UI to assist users, making AI collaboration feel as natural as human-to-human interaction.

## Implementation

### Frontend

- **Framework**: SPA using React and Typescript.
- **Package Manager**: Yarn
- **Deployment**: GitHub Pages
- **Routing**: Three main pages:
  - **/#/onboard**: Introduction and user guide.
  - **/#/chat**: Main chat interface.
  - **/#/help**: Information, tips, and misc details about the project.

#### Key Packages:

- **recoil**: Global state management.
- **chakra-ui**: Component library.
- **emotion**: CSS shorthand styling for components.
- **framer-motion**: Animation library.

### Backend

- **Framework**: Flask
- **Database**: MongoDB

### API Endpoints:

- **/chat**: GPT-3.5 requests
- **/image**: DALL-E 2 image gen requests.

### Database Model

<img src="https://i.ibb.co/QjvWz8X/Screenshot-2023-10-24-at-11-13-21-AM.png" alt="basic modeling of MongoDB deployment" height="200"/>

### Deployment

- **Frontend**: GitHub Pages
- **Backend**: AWS Elastic Beanstalk

## Usage

1. **/#/onboard**: Start here to understand the purpose and get a quick tutorial.
2. **/#/chat**: Engage in a chat-like interface to generate images.
3. **/#/help**: Reach out for tips or to learn more about the project.

## License

This project is [MIT](https://github.com/scornz/img-chat/blob/main/LICENSE) licensed.
