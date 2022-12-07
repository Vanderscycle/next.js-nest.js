#!/bin/bash

# needs: kubectl argocd

# login
KEY_PATH="$HOME/.ssh/endeavourGit"
TEMP_PASS=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo)
argocd login \
  --password "$TEMP_PASS" \
  --username admin localhost:8080

# adds the relevant repo
argocd repo add git@github.com:Vanderscycle/Professional-website.git \
  --ssh-private-key-path "$KEY_PATH" \
  --insecure-ignore-host-key \
  --name atreides-infrastructure

# changing the password to one previously defined
argocd account update-password \
  --current-password "$TEMP_PASS" \
  --new-password "$ARGO_LOCAL"
