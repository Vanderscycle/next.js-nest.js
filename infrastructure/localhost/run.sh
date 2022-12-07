#!/bin/bash
# needs: kind, kubectl, argocd
kind create cluster --config kind.yaml
kubectl cluster-info --context kind-infrastructure-professional-website
kubectl get nodes
# argocd install
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'

# giving time for argocd to start
sleep 60 
