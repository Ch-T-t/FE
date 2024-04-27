# Copyright 2023 luan
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Use an official Node.js image as the base image
FROM node:20.11.1-alpine3.19

# Install necessary dependencies
RUN apk add --no-cache libc6-compat \
    && apk add --no-cache nginx \
    && mkdir -p /run/nginx

# Set environment variables
ENV PORT 3000
ENV NODE_ENV production

# Create a directory for the application
WORKDIR /app

# Copy package.json and yarn.lock into the container
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
