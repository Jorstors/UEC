#!/bin/sh

# Ensure SSH directory exists
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Write the private key from the environment variable to a file
echo "$KAMIAK_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Add Kamiak's SSH host to known hosts
ssh-keyscan -H kamiak.wsu.edu >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

# Start SSH tunnel to forward port 8000 on the container to port 8000 on Kamiak (Run in background)
ssh -i ~/.ssh/id_rsa -gnNTf -L 8000:10.110.6.35:8000 -o StrictHostKeyChecking=no $SSHUSER &

# Start the waitress server
waitress-serve --host=0.0.0.0 --port=8080 wsgi:app