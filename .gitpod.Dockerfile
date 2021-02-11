FROM gitpod/workspace-mysql

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
# RUN brew install bastet
#
# More information: https://www.gitpod.io/docs/config-docker/

RUN sudo apt-get update \
    && sudo apt-get install -y \
    # Write down your personal tools ...
    && sudo rm -rf /var/lib/apt/lists/*

# Install `pm2`
RUN npm install pm2 -g
# Install 'nodaemon'
RUN npm install nodaemon -g