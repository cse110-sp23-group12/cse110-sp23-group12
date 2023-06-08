# Use tools to hide the openai secret key

- Status: Accepted
- Deciders: Annie Phan, JD
- Date: 06/07/23

## Decision Drivers
- Need a way to not request directly in js
- Avoid leaking openai keys

## Considered Options
- Netlify
- Remote server

## Chosen Option:
Netlify, using serverless services can increase the synchronicity of the project (always maintained in github).
