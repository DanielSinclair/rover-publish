FROM node:14
RUN curl -sSL https://rover.apollo.dev/nix/latest | sh
WORKDIR /usr/src/app
COPY . .
CMD ["node", "dist/index.js"]