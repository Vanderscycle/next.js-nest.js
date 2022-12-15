#!/bin/bash
# needs: kind, kubectl, argocd
ctlptl create registry ctlptl-registry
ctlptl apply -f ./kind.yaml
